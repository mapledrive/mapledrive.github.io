import { input } from './InputHandler';
import { Entity } from './Entity';
import { resources } from './Resources';

/**
 * Утилита для отрисовки фрагментов спрайтов
 */
export class SpriteRenderer {
  static drawFrame(
    ctx,
    sprite,
    frameX,
    frameY,
    frameWidth,
    frameHeight,
    destX,
    destY,
    destWidth = frameWidth,
    destHeight = frameHeight
  ) {
    if (!sprite) return;
    ctx.drawImage(
      sprite,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      destX,
      destY,
      destWidth,
      destHeight
    );
  }
}

/**
 * Класс Sprite для анимаций
 */
export class Sprite {
  constructor(img, pos, size, speed, frames, once) {
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this._index = 0;
    this.img = img;
    this.once = once;
    this.frames = frames || [0];
    this.done = false;
    this.lastUpdated = null;
  }

  update(dt, gameTime) {
    if (gameTime && gameTime === this.lastUpdated) return;
    this._index += this.speed * dt;
    if (gameTime) this.lastUpdated = gameTime;
  }

  setFrame(frame) {
    this._index = frame;
  }

  render(ctx, posx, posy, vX, vY) {
    let frame;

    if (this.speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    const x = this.pos[0] + frame * this.size[0];
    const y = this.pos[1];

    const spriteImage = resources.get(this.img);
    if (!spriteImage) {
      // Отладочная отрисовка если спрайт не загружен
      ctx.fillStyle = 'red';
      ctx.fillRect(
        Math.round(posx - vX),
        Math.round(posy - vY),
        this.size[0],
        this.size[1]
      );
      return;
    }

    ctx.drawImage(
      spriteImage,
      x,
      y,
      this.size[0],
      this.size[1],
      Math.round(posx - vX),
      Math.round(posy - vY),
      this.size[0],
      this.size[1]
    );
  }
}

/**
 * Класс Floor (пол/стены)
 */
/**
 * Класс Floor (пол/стены) - ИСПРАВЛЕННАЯ ВЕРСИЯ
 */
export class Floor extends Entity {
  constructor(pos, sprite) {
    super({
      pos: pos,
      sprite: sprite,
      hitbox: [0, 0, 16, 16],
    });
    this.standing = true;
  }

  isCollideWith(ent) {
    // the first two elements of the hitbox array are an offset, so let's do this now.
    const hpos1 = [
      Math.floor(this.pos[0] + this.hitbox[0]),
      Math.floor(this.pos[1] + this.hitbox[1]),
    ];
    const hpos2 = [
      Math.floor(ent.pos[0] + ent.hitbox[0]),
      Math.floor(ent.pos[1] + ent.hitbox[1]),
    ];

    // if the hitboxes actually overlap
    if (
      !(
        hpos1[0] > hpos2[0] + ent.hitbox[2] ||
        hpos1[0] + this.hitbox[2] < hpos2[0]
      )
    ) {
      if (
        !(
          hpos1[1] > hpos2[1] + ent.hitbox[3] ||
          hpos1[1] + this.hitbox[3] < hpos2[1]
        )
      ) {
        if (!this.standing) {
          ent.bump();
        } else {
          // if the entity is over the block, it's basically floor
          const center = hpos2[0] + ent.hitbox[2] / 2;
          if (Math.abs(hpos2[1] + ent.hitbox[3] - hpos1[1]) <= ent.vel[1]) {
            // Упрощенная проверка на блок сверху (как в оригинале)
            ent.vel[1] = Math.min(0, ent.vel[1]); // Останавливаем падение
            ent.pos[1] = hpos1[1] - ent.hitbox[3] - ent.hitbox[1];
            ent.standing = true;
            if (ent instanceof Player) {
              ent.jumping = 0;
            }
          } else if (
            Math.abs(hpos2[1] - hpos1[1] - this.hitbox[3]) <=
              Math.abs(ent.vel[1]) &&
            center + 2 >= hpos1[0] &&
            center - 2 <= hpos1[0] + this.hitbox[2]
          ) {
            // ent is under the block.
            ent.vel[1] = Math.max(0, ent.vel[1]); // Останавливаем подъем
            ent.pos[1] = hpos1[1] + this.hitbox[3];
            if (ent instanceof Player) {
              this.bonk(ent.power);
              ent.jumping = 0;
            }
          } else {
            // entity is hitting it from the side, we're a wall
            ent.collideWall(this);
          }
        }
      }
    }
  }

  bonk() {}
}

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

/**
 * Класс Level
 */
/**
 * Класс Level - с улучшенным методом putFloor
 */
export class Level {
  constructor(options) {
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;

    // Спрайты
    this.floorSprite = options.floorSprite;
    this.wallSprite = options.wallSprite;

    // Инициализация массивов
    this.statics = [];
    this.blocks = [];

    for (let i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.blocks[i] = [];
    }
  }

  /**
   * Создает платформы из интервалов [start, end]
   * ground = [[0, 10], [12, 20], [25, 30]] создаст платформы от 0-9, 12-19, 25-29
   */
  putFloorFromIntervals(ground) {
    ground.forEach(interval => {
      const [start, end] = interval;
      for (let i = start; i < end; i++) {
        // Земля на двух нижних рядах (13 и 14)
        this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
        this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
      }
    });
  }

  /**
   * Старый метод для обратной совместимости
   */
  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
    }
  }

  putWall(x, y, height) {
    // y - это ВЕРХНИЙ ряд стены, строим СВЕРХУ ВНИЗ
    for (let i = 0; i < height; i++) {
      const row = y + i;
      if (row < 13 && row >= 0) {
        // Не ставим стены на земле или ниже
        this.statics[row][x] = new Floor([16 * x, 16 * row], this.wallSprite);
      }
    }
  }
}

/**
 * Функция для создания уровня 1-1 как в оригинале
 */
export function createLevelOneOne() {
  const floorSprite = new Sprite('/tiles.png', [0, 0], [16, 16], 0, [0], false);
  const wallSprite = new Sprite('/tiles.png', [0, 16], [16, 16], 0, [0], false);

  const level = new Level({
    playerPos: [56, 192],
    loader: createLevelOneOne,
    background: '#7974FF',
    scrolling: true,
    floorSprite: floorSprite,
    wallSprite: wallSprite,
  });

  // Создаем землю с дырками как в оригинале
  // ground = [[0, 10], [12, 212]] означает:
  // - платформа от блока 0 до 9 (10 блоков)
  // - платформа от блока 12 до 211 (200 блоков)
  const ground = [
    [0, 10],
    [12, 50],
  ]; // Укороченная версия для теста

  // Build THE GROUND
  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  // Build scenery
  level.putWall(14, 9, 4);
  level.putWall(25, 12, 1);
  level.putWall(100, 11, 2);
  level.putWall(183, 10, 3);
  level.putWall(184, 9, 4);
  level.putWall(185, 8, 5);

  return level;
}

/**
 * Основной игровой класс
 */
export class MarioGame {
  constructor(canvas, resources) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resources = resources;

    // Игровые переменные
    this.vX = 0;
    this.vY = 0;
    this.gameTime = 0;
    this.updateables = [];

    // УБРАТЬ ЭТУ СТРОКУ: this.ctx.scale(3, 3);

    // Создаем уровень и игрока
    this.level = createLevelOneOne();
    this.player = new Player(this.level.playerPos);

    this.rafId = null;
    this.lastTime = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Проверяем загружены ли все спрайты
    const requiredSprites = ['/player.png', '/playerl.png', '/tiles.png'];
    const allLoaded = requiredSprites.every(sprite =>
      this.resources.get(sprite)
    );

    if (allLoaded) {
      this.initialized = true;
      console.log('✅ Игра инициализирована');
    } else {
      console.log('⏳ Ожидание загрузки спрайтов...');
      setTimeout(() => this.init(), 100);
    }
  }

  handleInput(dt) {
    if (this.player.dying) return;

    if (input.isDown('RUN')) {
      this.player.run();
    } else {
      this.player.noRun();
    }

    if (input.isDown('JUMP')) {
      this.player.jump();
    } else {
      this.player.noJump();
    }

    if (input.isDown('LEFT')) {
      this.player.moveLeft();
    } else if (input.isDown('RIGHT')) {
      this.player.moveRight();
    } else {
      this.player.noWalk();
    }
  }

  update(dt) {
    if (!this.initialized) return;

    this.gameTime += dt;
    this.handleInput(dt);
    this.player.update(dt, this.vX);

    // Движение камеры
    if (this.level.scrolling && this.player.pos[0] > this.vX + 80) {
      this.vX = this.player.pos[0] - 80;
    }

    // Проверка коллизий
    this.player.checkCollisions(this.level);
  }

  render() {
    if (!this.initialized) {
      // Показываем загрузку
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Загрузка...', 100, 100);
      return;
    }

    const ctx = this.ctx;

    // Сохраняем текущее состояние контекста
    ctx.save();

    // Сбрасываем трансформации и устанавливаем масштаб
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Устанавливаем масштаб для игрового контента (3x)
    ctx.scale(3, 3);

    // Очистка игровой области
    ctx.fillStyle = this.level.background;
    ctx.fillRect(0, 0, 256, 240);

    // Отрисовка ВСЕХ статических объектов (для отладки)
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 100; j++) {
        // Рисуем много блоков
        if (this.level.statics[i][j]) {
          this.level.statics[i][j].render(ctx, this.vX, this.vY);
        }
      }
    }

    // Отрисовка игрока
    this.player.render(ctx, this.vX, this.vY);

    // Восстанавливаем контекст для отладочной информации (без масштабирования)
    ctx.restore();

    // Отладочная информация
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText(
      `Pos: ${Math.round(this.player.pos[0])}, ${Math.round(
        this.player.pos[1]
      )}`,
      10,
      20
    );
    ctx.fillText(
      `Vel: ${this.player.vel[0].toFixed(2)}, ${this.player.vel[1].toFixed(2)}`,
      10,
      35
    );
    ctx.fillText(`Standing: ${this.player.standing}`, 10, 50);
    ctx.fillText(`Camera: ${Math.round(this.vX)}`, 10, 65);
  }

  start() {
    this.init(); // Начинаем инициализацию

    const loop = timestamp => {
      const dt = timestamp - (this.lastTime || timestamp);
      this.lastTime = timestamp;

      this.update(dt / 1000);
      this.render();

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
