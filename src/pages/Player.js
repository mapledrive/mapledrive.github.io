import { Sprite } from './Sprite';
import { Entity } from './Entity';
import { input } from './InputHandler';
/**
 * Класс Player
 */
export class Player extends Entity {
  constructor(pos) {
    const playerSprite = new Sprite(
      '/player.png',
      [0, 0],
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

    // Player state variables
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

    // Physics
    this.maxSpeed = 1.5;
    this.moveAcc = 0.07;

    // Power-up sprites configuration
    this.powerSprites = [
      [0, 0],
      [0, 32],
      [0, 96],
    ];
    this.powerSizes = [
      [16, 16],
      [16, 32],
      [16, 32],
    ];
    this.shift = [0, -16, -16];

    // Начальная анимация
    this.sprite.pos = [80, 32];
  }

  run() {
    this.maxSpeed = 2.5;
    this.runheld = true;
  }

  noRun() {
    this.maxSpeed = 1.5;
    this.runheld = false;
  }

  moveRight() {
    this.acc[0] = this.moveAcc;
    this.left = false;
  }

  moveLeft() {
    this.acc[0] = -this.moveAcc;
    this.left = true;
  }

  noWalk() {
    if (Math.abs(this.vel[0]) <= 0.1) {
      this.vel[0] = 0;
      this.acc[0] = 0;
    }
  }

  crouch() {
    if (this.power === 0) return;
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
    if (this.jumping > 16) {
      this.jumping = 16;
    }
  }

  setAnimation() {
    if (this.dying) return;

    // Простая анимация для начала
    if (this.jumping) {
      this.sprite.pos[0] = 160; // Прыжок
      this.sprite.speed = 0;
    } else if (this.standing) {
      if (Math.abs(this.vel[0]) > 0.1) {
        this.sprite.pos[0] = 96; // Бег
        this.sprite.speed = Math.abs(this.vel[0]) * 8;
      } else {
        this.sprite.pos[0] = 80; // Стояние
        this.sprite.speed = 0;
      }
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
      // Пропускаем обновление во время power-up анимации
      return;
    }

    if (this.waiting > 0) {
      this.waiting -= dt;
      return;
    }

    if (this.dying) {
      this.dying -= dt;
      if (this.dying <= 0) {
        // Респавн
        this.pos = [56, 150];
        this.dying = false;
        this.vel = [0, 0];
        this.acc = [0, 0];
        input.reset();
      }
      return;
    }

    if (this.bounce) {
      this.bounce = false;
      this.standing = false;
      this.vel[1] = -3;
    }

    // Ограничение движения за левую границу
    if (this.pos[0] <= vX) {
      this.pos[0] = vX;
      this.vel[0] = Math.max(this.vel[0], 0);
    }

    // Ограничение максимальной скорости
    if (Math.abs(this.vel[0]) > this.maxSpeed) {
      this.vel[0] -= (0.05 * this.vel[0]) / Math.abs(this.vel[0]);
      this.acc[0] = 0;
    }

    // Гравитация (как в оригинале)
    this.acc[1] = 0.25;

    // Смерть при падении
    if (this.pos[1] > 240) {
      this.die();
    }

    // Физика (как в оригинале)
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.setAnimation();
    this.sprite.update(dt);
  }

  checkCollisions(level) {
    if (this.piping || this.dying) return;

    let h = this.power > 0 ? 2 : 1; // Высота в блоках
    let w = 1; // Ширина в блоках

    // Учитываем частичные блоки
    if (this.pos[1] % 16 !== 0) {
      h += 1;
    }
    if (this.pos[0] % 16 !== 0) {
      w += 1;
    }

    const baseX = Math.floor(this.pos[0] / 16);
    const baseY = Math.floor(this.pos[1] / 16);

    // Проверяем все блоки в области игрока
    for (let i = 0; i < h; i++) {
      if (baseY + i < 0 || baseY + i >= 15) continue;
      for (let j = 0; j < w; j++) {
        if (baseX + j < 0) continue;

        // Проверяем статические блоки (пол/стены)
        if (level.statics[baseY + i][baseX + j]) {
          level.statics[baseY + i][baseX + j].isCollideWith(this);
        }

        // Проверяем интерактивные блоки (можно добавить позже)
        if (level.blocks[baseY + i][baseX + j]) {
          level.blocks[baseY + i][baseX + j].isCollideWith(this);
        }
      }
    }
  }

  die() {
    this.vel = [0, -5];
    this.acc = [0, 0];
    this.dying = 2;
    this.waiting = 0.5;
  }
}
