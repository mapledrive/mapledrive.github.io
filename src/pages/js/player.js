import { Entity } from './entity';
import { Sprite } from './sprite';

export class Player extends Entity {
  constructor(pos) {
    // Убедимся, что позиция устанавливается правильно
    const initialPos = Array.isArray(pos) ? [...pos] : [56, 192];

    super({
      pos: initialPos,
      sprite: new Sprite('/player.png', [80, 32], [16, 16], 0),
      hitbox: [0, 0, 16, 16],
    });

    // Состояния (как в оригинале)
    this.powering = [];
    this.jumping = 0;
    this.canJump = true;
    this.invincibility = 0;

    this.runheld = false;
    this.noInput = false;
    this.dying = false;
    this.deathTimer = 0;
    this.waiting = 0;

    // Физика
    this.maxSpeed = 1.5;
    this.moveAcc = 0.07;
    this.left = false;
    this.standing = false;

    this.shift = [0, -16, -16];

    // Сбрасываем все состояния при создании
    this.resetState();
  }

  resetState() {
    // Сбрасываем все физические состояния
    this.vel = [0, 0];
    this.acc = [0, 0];
    this.standing = false;
    this.jumping = 0;
    this.canJump = true;
    this.runheld = false;
    this.noInput = false;
    this.dying = false;
    this.deathTimer = 0;
    this.waiting = 0;
    this.left = false;
    this.crouching = false;

    // Сбрасываем анимацию
    this.sprite.pos = [80, 32];
    this.sprite.speed = 0;
    this.sprite.frames = [0];
    this.sprite.img = '/player.png';
  }

  run() {
    if (this.dying) return;
    this.maxSpeed = 2.5;
    this.runheld = true;
  }

  noRun() {
    if (this.dying) return;
    this.maxSpeed = 1.5;
    this.moveAcc = 0.07;
    this.runheld = false;
  }

  moveRight() {
    if (this.dying) return;
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
    if (this.dying) return;
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
    if (this.dying) return;
    this.maxSpeed = 0;
    if (Math.abs(this.vel[0]) <= 0.1) {
      this.vel[0] = 0;
      this.acc[0] = 0;
    }
  }

  crouch() {
    if (this.dying) return;
    this.crouching = true;
  }

  noCrouch() {
    if (this.dying) return;
    this.crouching = false;
  }

  jump() {
    if (this.dying) return;
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
    if (this.dying) return;
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
    if (this.dying) {
      // Анимация смерти - специальный спрайт
      this.sprite.pos = [176, 32]; // Позиция спрайта смерти
      this.sprite.speed = 0;
      this.sprite.frames = [0]; // Статичный кадр
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

  damage() {
    if (this.invincibility > 0 || this.dying) return;

    // Если игрок большой - уменьшаемся
    if (this.power > 0) {
      this.powerDown();
    } else {
      // Если маленький - умираем
      this.startDeath();
    }
  }

  powerDown() {
    this.invincibility = 120; // ~2 секунды при 60 FPS

    // Уменьшаем размер игрока
    this.power = 0;
    this.sprite.size = [16, 16];
    this.hitbox = [0, 0, 16, 16];

    // Мигание при неуязвимости
    this.invincibility = 120;
  }

  startDeath() {
    if (this.dying) return;

    if (window.music?.death) {
      window.music.death.play();
    }

    this.dying = true;
    this.deathTimer = 2.0;
    this.noInput = true;

    // Останавливаем движение по X
    this.vel[0] = 0;
    this.acc[0] = 0;

    // РАЗЛИЧИЕ МЕЖДУ СМЕРТЬЮ ОТ ВРАГА И ПАДЕНИЕМ В ЯМУ
    if (this.pos[1] < 240) {
      // Смерть от врага - подлетает вверх
      this.vel[1] = -6;
      this.acc[1] = 0.3;
    } else {
      // Падение в яму - просто продолжает падать
      this.vel[1] = 0;
      this.acc[1] = 0.25; // Обычная гравитация
    }

    // Устанавливаем анимацию смерти
    this.setAnimation();

    // Отключаем все управления
    this.noWalk();
    this.noRun();
    this.noJump();
  }

  update(dt, vX) {
    // Обработка смерти
    if (this.dying) {
      this.deathTimer -= dt;

      // Продолжаем физику во время смерти
      this.vel[1] += this.acc[1];
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];

      // Всегда показываем спрайт смерти (без мерцания)
      this.sprite.update(dt);

      // Не выходим раньше времени - даем анимации проиграться
      return;
    }

    if (this.powering.length !== 0) {
      const next = this.powering.shift();
      if (next === 5) return;
      this.sprite.pos = this.powerSprites[next];
      this.sprite.size = this.powerSizes[next];
      this.pos[1] += this.shift[next];
      if (this.powering.length === 0 && this.touchedItem !== undefined) {
        // Удаление предмета
      }
      return;
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

    // Обычная физика
    this.acc[1] = 0.25;
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
}
