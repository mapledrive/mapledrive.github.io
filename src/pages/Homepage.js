import React, { useEffect, useRef, useState } from 'react';
import { resources, loadAllSprites } from './mario/Resources';
import { StyledSection, SectionTitle, SectionContent } from 'style';
import input from './mario/InputHandler';

// 1. Homepage
// 2. class Game
// 3. class Entity
// 4. class Floor
// 5. class Level
// 6. class Sprite
// 7. class Player
// 8. function oneone()

const Homepage = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await loadAllSprites();
        console.log('Все спрайты загружены');

        const canvas = canvasRef.current;
        if (!canvas) {
          throw new Error('Canvas not found');
        }

        const game = new Game(canvas, resources);
        gameRef.current = game;
        game.start();

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    init();

    return () => {
      if (gameRef.current) {
        gameRef.current.stop();
      }
    };
  }, []);

  return (
    <StyledSection>
      <SectionTitle>Super Mario Bros</SectionTitle>
      <SectionContent>
        Use the arrow keys [↑ → ↓ ←] to move Mario, and hold X button to jump
        higher. Use Z to shoot/run.
      </SectionContent>

      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        {loading && <SectionContent>Loading game...</SectionContent>}
        {error && <SectionContent>Error: {error}</SectionContent>}
        <canvas
          ref={canvasRef}
          width={762}
          height={720}
          style={{
            backgroundColor: '#000',
            display: 'block',
            margin: '0 auto',
            width: '762px',
            height: '720px',
          }}
        />
      </div>
    </StyledSection>
  );
};

export { Homepage };

/**
 * Основной игровой класс
 */
export class Game {
  constructor(canvas, resources) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resources = resources;

    // Устанавливаем размеры канваса как в оригинале
    this.canvas.width = 762;
    this.canvas.height = 720;

    // Игровые переменные
    this.vX = 0;
    this.vY = 0;
    this.vWidth = 256;
    this.vHeight = 240;
    this.gameTime = 0;
    this.updateables = [];
    this.fireballs = [];

    // Устанавливаем масштаб как в оригинале
    this.ctx.scale(3, 3);

    // Инициализируем уровень и игрока
    this.initLevel();

    this.rafId = null;
    this.lastTime = null;
    this.initialized = false;
  }

  initLevel() {
    // Полностью пересоздаем уровень
    this.level = oneone();
    window.level = this.level;

    // Создаем нового игрока на стартовой позиции уровня
    this.player = new Player([...this.level.playerPos]); // Копируем позицию
    window.player = this.player;

    // Сбрасываем состояние игры
    this.vX = 0;
    this.vY = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.fireballs = [];

    console.log('Уровень перезагружен, игрок на позиции:', this.player.pos);
  }

  init() {
    if (this.initialized) return;
    window.music = {
      death: new Audio('sounds/mariodie.wav'),
    };

    // Проверяем загружены ли все спрайты
    const requiredSprites = [
      '/player.png',
      '/enemy.png',
      '/tiles.png',
      '/playerl.png',
      '/items.png',
      '/enemyr.png',
    ];
    const allLoaded = requiredSprites.every(sprite =>
      this.resources.get(sprite)
    );

    if (allLoaded) {
      this.initialized = true;
      console.log('Игра инициализирована');
    } else {
      console.log('Ожидание загрузки спрайтов...');
      setTimeout(() => this.init(), 100);
    }
  }

  handleInput(dt) {
    if (this.player.dying || this.player.piping || this.player.noInput) return;

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

    // Добавляем обработку кнопки DOWN как в оригинале
    if (input.isDown('DOWN')) {
      this.player.crouch();
    } else {
      this.player.noCrouch();
    }

    if (input.isDown('LEFT')) {
      this.player.moveLeft();
    } else if (input.isDown('RIGHT')) {
      this.player.moveRight();
    } else {
      this.player.noWalk();
    }
  }

  updateEntities(dt, gameTime) {
    this.player.update(dt, this.vX);

    // Обновляем все обновляемые объекты
    this.updateables.forEach(ent => {
      ent.update(dt, gameTime);
    });

    // Движение камеры - точная копия оригинала
    if (this.player.exiting) {
      if (this.player.pos[0] > this.vX + 96) {
        this.vX = this.player.pos[0] - 96;
      }
    } else if (this.level.scrolling && this.player.pos[0] > this.vX + 80) {
      this.vX = this.player.pos[0] - 80;
    }

    // Обновляем остальные объекты уровня, если игрок не в особом состоянии
    if (this.player.powering?.length !== 0 || this.player.dying) {
      return;
    }
  }

  checkCollisions() {
    if (this.player.powering?.length !== 0 || this.player.dying) {
      return;
    }
    this.player.checkCollisions(this.level);
  }

  checkPlayerDeath() {
    // Проверяем падение в яму
    if (this.player.pos[1] > 240 && !this.player.dying) {
      this.player.startDeath();
    }

    // Перезагружаем уровень после завершения анимации смерти
    if (this.player.dying && this.player.deathTimer <= 0) {
      this.resetLevel();
    }
  }

  resetLevel() {
    console.log('Перезагрузка уровня...');
    this.initLevel();
    input.reset();
  }

  update(dt) {
    if (!this.initialized) return;

    this.gameTime += dt;
    this.handleInput(dt);
    this.updateEntities(dt, this.gameTime);
    this.checkCollisions();
    this.checkPlayerDeath();
  }

  renderEntity(entity) {
    entity.render(this.ctx, this.vX, this.vY);
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

    // Очищаем канвас
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Фон уровня
    ctx.fillStyle = this.level.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Сбрасываем updateables как в оригинале
    this.updateables = [];

    // Отрисовываем только видимую область
    for (let i = 0; i < 15; i++) {
      // Рассчитываем видимый диапазон по X как в оригинале
      const startJ = Math.floor(this.vX / 16) - 1;
      const endJ = Math.floor(this.vX / 16) + 20;

      for (let j = startJ; j < endJ; j++) {
        // Статические объекты (пол, земля)
        if (this.level.statics[i] && this.level.statics[i][j]) {
          this.renderEntity(this.level.statics[i][j]);
        }
      }
    }

    // Отрисовываем игрока (с учетом мерцания при неуязвимости)
    if (!this.player.dying && this.player.invincibility % 2 === 0) {
      this.renderEntity(this.player);
    }
  }

  start() {
    this.init();

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

/**
 * Базовый класс Entity !!!
 */
export class Entity {
  constructor(options) {
    this.vel = [0, 0];
    this.acc = [0, 0];
    this.standing = true;
    this.pos = options.pos;
    this.sprite = options.sprite;
    this.hitbox = options.hitbox;
    this.left = false;
  }

  render(ctx, vX, vY) {
    this.sprite.render(ctx, this.pos[0], this.pos[1], vX, vY);
  }
}

/**
 * Класс Floor
 * от оригинала отличает только то что level экземпляр сделан глобальным
 * window.level
 */
export class Floor extends Entity {
  constructor(pos, sprite) {
    super({
      pos: pos,
      sprite: sprite,
      hitbox: [0, 0, 16, 16],
    });
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
            if (window.level.statics[this.pos[1] / 16 - 1][this.pos[0] / 16]) {
              return;
            }
            ent.vel[1] = 0;
            ent.pos[1] = hpos1[1] - ent.hitbox[3] - ent.hitbox[1];
            ent.standing = true;
            if (ent instanceof Player) {
              ent.jumping = 0;
            }
          } else if (
            Math.abs(hpos2[1] - hpos1[1] - this.hitbox[3]) > ent.vel[1] &&
            center + 2 >= hpos1[0] &&
            center - 2 <= hpos1[0] + this.hitbox[2]
          ) {
            // ent is under the block.
            ent.vel[1] = 0;
            ent.pos[1] = hpos1[1] + this.hitbox[3];
            if (ent instanceof Player) {
              this.bonk(ent.power);
              ent.jumping = 0;
            }
          } else {
            // entity is hitting it from the side, we're a wall
            //ent.collideWall(this);
          }
        }
      }
    }
  }

  bonk() {}
}

/**
 * Класс Level
 */

export class Level {
  constructor(options) {
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;
    this.exit = options.exit;
    this.floorSprite = options.floorSprite;
    this.invincibility = options.invincibility;
    this.statics = [];

    for (let i = 0; i < 15; i++) {
      this.statics[i] = [];
    }
  }

  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
    }
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
    this.frames = frames;
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

    ctx.drawImage(
      resources.get(this.img),
      x + 1 / 3,
      y + 1 / 3,
      this.size[0] - 2 / 3,
      this.size[1] - 2 / 3,
      Math.round(posx - vX),
      Math.round(posy - vY),
      this.size[0],
      this.size[1]
    );
  }
}

export class Player extends Entity {
  constructor(pos) {
    // Убедимся, что позиция устанавливается правильно
    const initialPos = Array.isArray(pos) ? [...pos] : [56, 192];

    super({
      pos: initialPos,
      sprite: new Sprite('/player.png', [80, 32], [16, 16], 0),
      hitbox: [0, 0, 16, 16],
    });

    console.log('Создан новый игрок на позиции:', this.pos);

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

    console.log('Состояние игрока сброшено, позиция:', this.pos);
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
      // Анимация смерти
      this.sprite.pos = [176, 32];
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

  startDeath() {
    if (this.dying) return;

    console.log('Игрок умирает');
    window.music.death.play();

    this.dying = true;
    this.deathTimer = 2.0; // 2 секунды на анимацию смерти
    this.noInput = true;

    // Останавливаем движение
    this.vel = [0, -4]; // Подбрасываем вверх для анимации
    this.acc = [0, 0.5];

    // Отключаем все управления
    this.noWalk();
    this.noRun();
    this.noJump();
  }

  update(dt, vX) {
    // Обработка смерти
    if (this.dying) {
      this.deathTimer -= dt;

      // Анимация смерти - падение вниз
      this.vel[1] += this.acc[1];
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];

      this.setAnimation();
      this.sprite.update(dt);
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
      }
    }
  }
}

/**
 * Функция для создания уровня 1-1
 */
export function oneone() {
  let level = new Level({
    playerPos: [56, 192],
    loader: oneone,
    background: '#7073F5',
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 204,
    floorSprite: new Sprite('/tiles.png', [0, 0], [16, 16], 0),
    wallSprite: new Sprite('/tiles.png', [0, 16], [16, 16], 0),
  });

  window.level = level;

  let ground = [
    [0, 8],
    [10, 212],
  ];
  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  return level;
}
