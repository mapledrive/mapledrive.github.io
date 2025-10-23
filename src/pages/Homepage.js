import React, { useEffect, useRef, useState } from 'react';
import { StyledSection, SectionTitle, SectionContent } from 'style';

import input, { InputHandler } from './mario/InputHandler';
import { resources, loadAllSprites, Resources } from './mario/Resources';
import { Sprite } from './js/sprite.js';
import { Entity } from './js/entity.js';
import { Floor } from './js/floor.js';
//import { Player } from './js/player.js';
//import { Level } from './js/levels/level.js';
//import { oneone } from './js/levels/11.js';
//import { gameState } from './js/gameState.js';

window.Mario = {};
window.input = input;
window.resources = resources;

// Экспортируем классы
window.Mario.Sprite = Sprite;
window.Mario.Entity = Entity;
//window.Mario.Floor = Floor;
//window.Mario.Player = Player;
//window.Mario.Level = Level;
//window.Mario.oneone = oneone;

// Делаем gameState доступным глобально для обратной совместимости
//window.gameState = gameState;

// 1. Homepage
// 2. class Game - игровой движок
// 3. class Entity Cущность - любой игровой объект, который имеет: позицию на экране pos, спрайт для отрисовки sprite,
// хитбокс для коллизий, физ св-ва - скорость vel и ускорение acc
// 4. class Floor универсальный класс для статичных блоков уровня - пол (floor это сущность)
// 5. class Level не считается сущностью  - уровень (контейнер для сущностей)
// 6. class Sprite не считается сущностью - компонент отрисовки
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
        const canvas = canvasRef.current;
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
 * Основной игровой класс Game
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

    // Создаем нового игрока на стартовой позиции уровня
    this.player = new Player([...this.level.playerPos]); // Копируем позицию

    // Сбрасываем состояние игры
    this.vX = 0;
    this.vY = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.fireballs = [];
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
    } else {
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

    // Обновляем блоки
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < this.level.blocks[i]?.length || 0; j++) {
        if (this.level.blocks[i][j]) {
          this.level.blocks[i][j].update(dt, gameTime);
        }
      }
    }

    // ОБНОВЛЯЕМ ВРАГОВ ТОЛЬКО ЕСЛИ ИГРОК НЕ УМИРАЕТ
    if (!this.player.dying) {
      this.level.enemies.forEach((enemy, index) => {
        if (enemy) {
          enemy.update(dt, this.vX);
          enemy.checkCollisions(this.vX, this.player);
        }
      });
    }

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

    // Перезагружаем уровень только после завершения анимации смерти
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

        // ДОБАВИТЬ: Отрисовка блоков
        if (this.level.blocks[i] && this.level.blocks[i][j]) {
          this.renderEntity(this.level.blocks[i][j]);
        }
      }
    }

    // Отрисовываем врагов
    this.level.enemies.forEach(enemy => {
      if (
        enemy &&
        enemy.pos[0] - this.vX > -32 &&
        enemy.pos[0] - this.vX < 336
      ) {
        this.renderEntity(enemy);
      }
    });

    // Отрисовываем игрока (во время смерти всегда показываем, без мерцания)
    if (!this.player.dying) {
      // Обычный рендеринг с мерцанием при неуязвимости
      if (this.player.invincibility % 2 === 0) {
        this.renderEntity(this.player);
      }
    } else {
      // Во время смерти всегда показываем игрока
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
 * Класс Level
 */

export class Level {
  constructor(options) {
    // Основные свойства уровня
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;
    this.exit = options.exit;

    // Спрайты для различных объектов
    this.floorSprite = options.floorSprite;
    this.cloudSprite = options.cloudSprite;
    this.wallSprite = options.wallSprite;
    this.brickSprite = options.brickSprite;
    this.rubbleSprite = options.rubbleSprite;
    this.brickBounceSprite = options.brickBounceSprite;
    this.ublockSprite = options.ublockSprite;
    this.superShroomSprite = options.superShroomSprite;
    this.fireFlowerSprite = options.fireFlowerSprite;
    this.starSprite = options.starSprite;
    this.coinSprite = options.coinSprite;
    this.bcoinSprite = options.bcoinSprite;
    this.goombaSprite = options.goombaSprite;
    this.koopaSprite = options.koopaSprite;

    // Спрайты труб (старые и новые)
    this.pipeLEndSprite = options.pipeLEndSprite;
    this.pipeREndSprite = options.pipeREndSprite;
    this.pipeLMidSprite = options.pipeLMidSprite;
    this.pipeRMidSprite = options.pipeRMidSprite;
    this.pipeUpMid = options.pipeUpMid;
    this.pipeSideMid = options.pipeSideMid;
    this.pipeLeft = options.pipeLeft;
    this.pipeTop = options.pipeTop;

    // Декорации и специальные объекты
    this.flagpoleSprites = options.flagPoleSprites;
    this.LPipeSprites = options.LPipeSprites;
    this.cloudSprites = options.cloudSprites;
    this.hillSprites = options.hillSprites;
    this.bushSprite = options.bushSprite;
    this.bushSprites = options.bushSprites;
    this.qblockSprite = options.qblockSprite;

    this.invincibility = options.invincibility;

    // Контейнеры для игровых объектов
    this.statics = []; // Статические объекты (пол, стены)
    this.scenery = []; // Декорации (облака, кусты)
    this.blocks = []; // Интерактивные блоки
    this.enemies = []; // Враги
    this.items = []; // Предметы (монеты, power-ups)
    this.pipes = []; // Трубы с телепортацией

    for (let i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.scenery[i] = [];
      this.blocks[i] = [];
    }
  }

  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      // Передаем this (текущий уровень) в конструктор Floor
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite, this);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite, this);
    }
  }

  putWall(x, y, height) {
    // y - нижняя точка стены
    for (let i = y - height; i < y; i++) {
      this.statics[i][x] = new Floor([16 * x, 16 * i], this.wallSprite, this);
    }
  }

  putPipe(x, y, height) {
    for (let i = y - height; i < y; i++) {
      if (i === y - height) {
        this.statics[i][x] = new Floor(
          [16 * x, 16 * i],
          this.pipeLEndSprite,
          this
        );
        this.statics[i][x + 1] = new Floor(
          [16 * x + 16, 16 * i],
          this.pipeREndSprite,
          this
        );
      } else {
        this.statics[i][x] = new Floor(
          [16 * x, 16 * i],
          this.pipeLMidSprite,
          this
        );
        this.statics[i][x + 1] = new Floor(
          [16 * x + 16, 16 * i],
          this.pipeRMidSprite,
          this
        );
      }
    }
  }

  putLeftPipe(x, y) {
    this.statics[y][x] = new Floor(
      [16 * x, 16 * y],
      this.LPipeSprites[0],
      this
    );
    this.statics[y + 1][x] = new Floor(
      [16 * x, 16 * (y + 1)],
      this.LPipeSprites[1],
      this
    );
    this.statics[y][x + 1] = new Floor(
      [16 * (x + 1), 16 * y],
      this.LPipeSprites[2],
      this
    );
    this.statics[y + 1][x + 1] = new Floor(
      [16 * (x + 1), 16 * (y + 1)],
      this.LPipeSprites[3],
      this
    );
    this.statics[y][x + 2] = new Floor(
      [16 * (x + 2), 16 * y],
      this.LPipeSprites[4],
      this
    );
    this.statics[y + 1][x + 2] = new Floor(
      [16 * (x + 2), 16 * (y + 1)],
      this.LPipeSprites[5],
      this
    );
  }

  putCoin(x, y) {
    //this.items.push(new Coin([x * 16, y * 16], this.coinSprite()));
  }

  putCloud(x, y) {
    //this.scenery[y][x] = new Prop([x * 16, y * 16], this.cloudSprite);
  }

  putBigHill(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.hillSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.hillSprites[3]);
    // this.scenery[y - 1][x + 1] = new Prop(
    //   [px + 16, py - 16],
    //   this.hillSprites[0]
    // );
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.hillSprites[4]);
    // this.scenery[y - 1][x + 2] = new Prop(
    //   [px + 32, py - 16],
    //   this.hillSprites[3]
    // );
    // this.scenery[y - 2][x + 2] = new Prop(
    //   [px + 32, py - 32],
    //   this.hillSprites[1]
    // );
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.hillSprites[5]);
    // this.scenery[y - 1][x + 3] = new Prop(
    //   [px + 48, py - 16],
    //   this.hillSprites[2]
    // );
    // this.scenery[y][x + 4] = new Prop([px + 64, py], this.hillSprites[2]);
  }

  putBush(x, y) {
    //this.scenery[y][x] = new Prop([x * 16, y * 16], this.bushSprite);
  }

  putThreeBush(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.bushSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.bushSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.bushSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.bushSprites[1]);
    // this.scenery[y][x + 4] = new Prop([px + 64, py], this.bushSprites[2]);
  }

  putTwoBush(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.bushSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.bushSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.bushSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.bushSprites[2]);
  }

  putSmallHill(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.hillSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.hillSprites[3]);
    // this.scenery[y - 1][x + 1] = new Prop(
    //   [px + 16, py - 16],
    //   this.hillSprites[1]
    // );
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.hillSprites[2]);
  }

  putTwoCloud(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.cloudSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.cloudSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.cloudSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.cloudSprites[2]);
  }

  putThreeCloud(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.cloudSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.cloudSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.cloudSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.cloudSprites[1]);
    // this.scenery[y][x + 4] = new Prop([px + 64, py], this.cloudSprites[2]);
  }

  putRealPipe(x, y, length, direction, destination) {
    // const px = x * 16,
    //   py = y * 16;
    // this.pipes.push(
    //   new Pipe({
    //     pos: [px, py],
    //     length: length,
    //     direction: direction,
    //     destination: destination,
    //   })
    // );
  }

  putFlagpole(x) {
    // const flagX = 16 * x;
    // // Создаем флаг
    // const flag = new Flag(flagX, this);
    // this.items.push(flag);
    // // Добавляем основание флагштока как статичный объект
    // this.statics[12][x] = new Floor([flagX, 192], this.wallSprite, this);
    // return flag; // Возвращаем флаг для доступа
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

/**
 * Функция для создания уровня 1-1
 */
function oneone() {
  let level = new Level({
    playerPos: [56, 192],
    loader: oneone,
    background: '#7073F5',
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 204,
    floorSprite: new Sprite('/tiles.png', [0, 0], [16, 16], 0),
    wallSprite: new Sprite('/tiles.png', [0, 16], [16, 16], 0),
    goombaSprite: function () {
      return new Sprite('/enemy.png', [0, 16], [16, 16], 3, [0, 1]);
    },
    koopaSprite: function () {
      return new Sprite('/enemy.png', [96, 0], [16, 32], 6, [0, 1]);
    },
    brickSprite: new Sprite('/tiles.png', [16, 0], [16, 16], 0),
    brickBounceSprite: new Sprite('/tiles.png', [32, 0], [16, 16], 0),
    rubbleSprite: function () {
      return new Sprite('/items.png', [64, 0], [8, 8], 3, [0, 1]);
    },
    ublockSprite: new Sprite('/tiles.png', [48, 0], [16, 16], 0),
    pipeLMidSprite: new Sprite('/tiles.png', [0, 144], [16, 16], 0),
    pipeRMidSprite: new Sprite('/tiles.png', [16, 144], [16, 16], 0),
    pipeLEndSprite: new Sprite('/tiles.png', [0, 128], [16, 16], 0),
    pipeREndSprite: new Sprite('/tiles.png', [16, 128], [16, 16], 0),
    pipeUpMid: new Sprite('/tiles.png', [0, 144], [32, 16], 0),
    pipeSideMid: new Sprite('/tiles.png', [48, 128], [16, 32], 0),
    pipeLeft: new Sprite('/tiles.png', [32, 128], [16, 32], 0),
    pipeTop: new Sprite('/tiles.png', [0, 128], [32, 16], 0),
    qblockSprite: new Sprite(
      '/tiles.png',
      [384, 0],
      [16, 16],
      8,
      [0, 0, 0, 0, 1, 2, 1]
    ),
    bcoinSprite: function () {
      return new Sprite('/items.png', [0, 112], [16, 16], 20, [0, 1, 2, 3]);
    },
    flagPoleSprites: [
      new Sprite('/tiles.png', [256, 128], [16, 16], 0),
      new Sprite('/tiles.png', [256, 144], [16, 16], 0),
      new Sprite('/items.png', [128, 32], [16, 16], 0),
    ],
  });

  let ground = [
    [0, 69],
    [71, 86],
    [89, 153],
    [155, 212],
  ];

  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  return level;
}
