import { Sprite } from './Sprite';
import { Entity } from './Entity';
import input from './InputHandler';
/**
 * Класс Player
 */
export class Player extends Entity {
  constructor(pos) {
    const playerSprite = new Sprite(
      '/player.png',
      [80, 32],
      [16, 16],
      0,
      [0, 1, 2],
      false
    );

    super({
      pos: pos,
      sprite: playerSprite,
      hitbox: [0, 0, 16, 16],
    });

    // Состояния (как в оригинале)
    this.power = 0;
    this.coins = 0;
    this.powering = [];
    this.bounce = false;
    this.jumping = 0;
    this.canJump = true;
    this.invincibility = 0;
    this.crouching = false;
    this.fireballs = 0;
    this.runheld = false;
    this.noInput = false;
    this.targetPos = [];
    this.dying = false;
    this.waiting = 0;
    this.piping = false;
    this.flagging = false;
    this.exiting = false;
    this.shooting = 0;
    this.starTime = 0;

    // Физика
    this.maxSpeed = 1.5;
    this.moveAcc = 0.07;
    this.left = false;
    this.standing = false;

    // Power-up данные (как в оригинале)
    this.powerSprites = [
      [80, 32],
      [80, 0],
      [80, 96],
    ];
    this.powerSizes = [
      [16, 16],
      [16, 32],
      [16, 32],
    ];
    this.shift = [0, -16, -16];
  }

  run() {
    this.maxSpeed = 2.5;
    this.runheld = true;
  }

  noRun() {
    this.maxSpeed = 1.5;
    this.moveAcc = 0.07;
    this.runheld = false;
  }

  moveRight() {
    if (this.vel[1] === 0 && this.standing) {
      if (this.crouching) {
        this.noWalk();
        return;
      }
    }
    this.acc[0] = this.moveAcc;
    this.left = false;
  }

  moveLeft() {
    if (this.vel[1] === 0 && this.standing) {
      if (this.crouching) {
        this.noWalk();
        return;
      }
    }
    this.acc[0] = -this.moveAcc;
    this.left = true;
  }

  noWalk() {
    this.maxSpeed = 0;
    if (Math.abs(this.vel[0]) <= 0.1) {
      this.vel[0] = 0;
      this.acc[0] = 0;
    }
  }

  crouch() {
    if (this.power === 0) {
      this.crouching = false;
      return;
    }
    if (this.standing) this.crouching = true;
  }

  noCrouch() {
    this.crouching = false;
  }

  jump() {
    if (this.vel[1] > 0) return;

    if (this.jumping) {
      this.jumping -= 1;
    } else if (this.standing && this.canJump) {
      this.jumping = 20;
      this.canJump = false;
      this.standing = false;
      this.vel[1] = -6;
    }
  }

  noJump() {
    this.canJump = true;
    if (this.jumping) {
      if (this.jumping <= 16) {
        this.vel[1] = 0;
        this.jumping = 0;
      } else {
        this.jumping -= 1;
      }
    }
  }

  setAnimation() {
    if (this.dying) return;

    // Star animation
    if (this.starTime) {
      let index;
      if (this.starTime > 60) {
        index = Math.floor(this.starTime / 2) % 3;
      } else {
        index = Math.floor(this.starTime / 8) % 3;
      }
      // Предполагаем, что level.invincibility = [0, 32, 64]
      // Но так как level не в scope, оставим как в оригинале — через глобальный level
      // Если у тебя level передаётся иначе — адаптируй
      const invY = window.level?.invincibility?.[index] || 0;
      this.sprite.pos[1] = invY + (this.power === 0 ? 32 : 0);
      this.starTime -= 1;
      if (this.starTime === 0) {
        if (this.power === 0) this.sprite.pos[1] = 32;
        else if (this.power === 1) this.sprite.pos[1] = 0;
        else this.sprite.pos[1] = 96;
      }
    }

    if (this.crouching) {
      this.sprite.pos[0] = 176;
      this.sprite.speed = 0;
      return;
    }

    if (this.jumping) {
      this.sprite.pos[0] = 160;
      this.sprite.speed = 0;
    } else if (this.standing) {
      if (Math.abs(this.vel[0]) > 0) {
        if (this.vel[0] * this.acc[0] >= 0) {
          this.sprite.pos[0] = 96;
          this.sprite.frames = [0, 1, 2];
          if (Math.abs(this.vel[0]) < 0.2) {
            this.sprite.speed = 5;
          } else {
            this.sprite.speed = Math.abs(this.vel[0]) * 8;
          }
        } else if (
          (this.vel[0] > 0 && this.left) ||
          (this.vel[0] < 0 && !this.left)
        ) {
          this.sprite.pos[0] = 144;
          this.sprite.speed = 0;
        }
      } else {
        this.sprite.pos[0] = 80;
        this.sprite.speed = 0;
      }

      if (this.shooting) {
        this.sprite.pos[0] += 160;
        this.shooting -= 1;
      }
    }

    if (this.flagging) {
      this.sprite.pos[0] = 192;
      this.sprite.frames = this.vel[1] === 0 ? [0] : [0, 1];
      this.sprite.speed = 10;
    }

    // Отражение спрайта
    if (this.left) {
      this.sprite.img = '/playerl.png';
    } else {
      this.sprite.img = '/player.png';
    }
  }

  update(dt, vX) {
    if (this.powering.length !== 0) {
      const next = this.powering.shift();
      if (next === 5) return;
      this.sprite.pos = this.powerSprites[next];
      this.sprite.size = this.powerSizes[next];
      this.pos[1] += this.shift[next];
      if (this.powering.length === 0 && this.touchedItem !== undefined) {
        // Удаление предмета — зависит от структуры level
        // В оригинале: delete level.items[this.touchedItem];
        // Оставим как есть — если у тебя нет level.items, это не сломает
      }
      return;
    }

    if (this.invincibility) {
      this.invincibility -= Math.round(dt * 60);
    }

    if (this.waiting > 0) {
      this.waiting -= dt;
      if (this.waiting > 0) return;
    }

    if (this.bounce) {
      this.bounce = false;
      this.standing = false;
      this.vel[1] = -3;
    }

    if (this.pos[0] <= vX) {
      this.pos[0] = vX;
      this.vel[0] = Math.max(this.vel[0], 0);
    }

    if (Math.abs(this.vel[0]) > this.maxSpeed) {
      this.vel[0] -= (0.05 * this.vel[0]) / Math.abs(this.vel[0]);
      this.acc[0] = 0;
    }

    if (this.dying) {
      if (this.pos[1] < this.targetPos[1]) {
        this.vel[1] = 1;
      }
      this.dying -= dt;
      if (this.dying <= 0) {
        this.pos = [56, 150];
        this.dying = false;
        this.vel = [0, 0];
        this.acc = [0, 0];
        input.reset();
      }
    } else {
      this.acc[1] = 0.25;
      if (this.pos[1] > 240) {
        this.die();
      }
    }

    if (this.piping) {
      this.acc = [0, 0];
      const pos = [Math.round(this.pos[0]), Math.round(this.pos[1])];
      if (pos[0] === this.targetPos[0] && pos[1] === this.targetPos[1]) {
        this.piping = false;
        if (typeof this.pipeLoc === 'function') this.pipeLoc();
      }
    }

    if (this.flagging) {
      this.acc = [0, 0];
    }

    if (this.exiting) {
      this.left = false;
      this.flagging = false;
      this.vel[0] = 1.5;
      if (this.pos[0] >= this.targetPos[0]) {
        this.vel = [0, 0];
        this.exiting = false;
        this.noInput = false;
        if (this.power !== 0) this.pos[1] -= 16;
      }
    }

    // Физика
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.setAnimation();
    this.sprite.update(dt);
  }

  checkCollisions(level) {
    if (this.piping || this.dying) return;

    let h = this.power > 0 ? 2 : 1;
    let w = 1;
    if (this.pos[1] % 16 !== 0) h += 1;
    if (this.pos[0] % 16 !== 0) w += 1;

    const baseX = Math.floor(this.pos[0] / 16);
    const baseY = Math.floor(this.pos[1] / 16);

    for (let i = 0; i < h; i++) {
      if (baseY + i < 0 || baseY + i >= 15) continue;
      for (let j = 0; j < w; j++) {
        if (baseX + j < 0) continue;

        if (level.statics[baseY + i]?.[baseX + j]) {
          level.statics[baseY + i][baseX + j].isCollideWith(this);
        }
        if (level.blocks[baseY + i]?.[baseX + j]) {
          level.blocks[baseY + i][baseX + j].isCollideWith(this);
        }
      }
    }
  }

  die() {
    this.noWalk();
    this.noRun();
    this.noJump();
    this.acc[0] = 0;
    this.sprite.pos = [176, 32];
    this.sprite.speed = 0;
    this.power = 0;
    this.waiting = 0.5;
    this.dying = 2;

    if (this.pos[1] < 240) {
      this.targetPos = [this.pos[0], this.pos[1] - 128];
      this.vel = [0, -5];
    } else {
      this.vel = [0, 0];
      this.targetPos = [this.pos[0], this.pos[1] - 16];
    }
  }
}
