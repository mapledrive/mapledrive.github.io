import React, { useEffect, useRef, useState } from 'react';
import { resources, loadAllSprites } from './mario/Resources';
import { StyledSection, SectionTitle, SectionContent } from 'style';
import input from './mario/InputHandler';

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

    // Создаем нового игрока на стартовой позиции уровня
    this.player = new Player([...this.level.playerPos]); // Копируем позицию

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
      console.log('Анимация смерти завершена, перезагружаем уровень...');
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

  collideWall(wall) {
    //the wall will always be a 16x16 block with hitbox = [0,0,16,16].
    if (this.pos[0] > wall.pos[0]) {
      //from the right
      this.pos[0] = wall.pos[0] + wall.hitbox[2] - this.hitbox[0];
      this.vel[0] = Math.max(0, this.vel[0]);
      this.acc[0] = Math.max(0, this.acc[0]);
    } else {
      this.pos[0] =
        wall.pos[0] + wall.hitbox[0] - this.hitbox[2] - this.hitbox[0];
      this.vel[0] = Math.min(0, this.vel[0]);
      this.acc[0] = Math.min(0, this.acc[0]);
    }
  }

  bump() {}
}

/**
 * Класс Floor  -  от оригинала отличает то что level проброшен в конструктор
 */
export class Floor extends Entity {
  constructor(pos, sprite, level) {
    super({
      pos: pos,
      sprite: sprite,
      hitbox: [0, 0, 16, 16],
    });
    this.level = level; // Сохраняем ссылку на уровень
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
            if (this.level.statics[this.pos[1] / 16 - 1]?.[this.pos[0] / 16]) {
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
            ent.collideWall(this);
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

  putGoomba(x, y) {
    const goomba = new Goomba([16 * x, 16 * y], this.goombaSprite(), this);
    this.enemies.push(goomba);
    console.log(
      `Goomba создан на позиции: [${16 * x}, ${16 * y}], индекс: ${
        this.enemies.length - 1
      }`
    );
  }

  putKoopa(x, y) {
    this.enemies.push(
      new Koopa([16 * x, 16 * y], this.koopaSprite(), false, this)
    );
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
        this.statics[i][x] = new Floor([16 * x, 16 * i], this.pipeLEndSprite);
        this.statics[i][x + 1] = new Floor(
          [16 * x + 16, 16 * i],
          this.pipeREndSprite
        );
      } else {
        this.statics[i][x] = new Floor([16 * x, 16 * i], this.pipeLMidSprite);
        this.statics[i][x + 1] = new Floor(
          [16 * x + 16, 16 * i],
          this.pipeRMidSprite
        );
      }
    }
  }

  putLeftPipe(x, y) {
    this.statics[y][x] = new Floor([16 * x, 16 * y], this.LPipeSprites[0]);
    this.statics[y + 1][x] = new Floor(
      [16 * x, 16 * (y + 1)],
      this.LPipeSprites[1]
    );
    this.statics[y][x + 1] = new Floor(
      [16 * (x + 1), 16 * y],
      this.LPipeSprites[2]
    );
    this.statics[y + 1][x + 1] = new Floor(
      [16 * (x + 1), 16 * (y + 1)],
      this.LPipeSprites[3]
    );
    this.statics[y][x + 2] = new Floor(
      [16 * (x + 2), 16 * y],
      this.LPipeSprites[4]
    );
    this.statics[y + 1][x + 2] = new Floor(
      [16 * (x + 2), 16 * (y + 1)],
      this.LPipeSprites[5]
    );
  }

  putCoin(x, y) {
    //this.items.push(new Coin([x * 16, y * 16], this.coinSprite()));
  }

  putCloud(x, y) {
    //this.scenery[y][x] = new Prop([x * 16, y * 16], this.cloudSprite);
  }

  putQBlock(x, y, item) {
    // this.blocks[y][x] = new Block({
    //   pos: [x * 16, y * 16],
    //   item: item,
    //   sprite: this.qblockSprite,
    //   usedSprite: this.ublockSprite,
    // });
  }

  putBrick(x, y, item) {
    // this.blocks[y][x] = new Block({
    //   pos: [x * 16, y * 16],
    //   item: item,
    //   sprite: this.brickSprite,
    //   bounceSprite: this.brickBounceSprite,
    //   usedSprite: this.ublockSprite,
    //   breakable: !item,
    // });
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
    // this.statics[12][x] = new Floor([16 * x, 192], this.wallSprite);
    // for (let i = 3; i < 12; i++) {
    //   this.scenery[i][x] = new Prop([16 * x, 16 * i], this.flagpoleSprites[1]);
    // }
    // this.scenery[2][x] = new Prop([16 * x, 32], this.flagpoleSprites[0]);
    // this.items.push(new Flag(16 * x));
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

    console.log('Игрок получает урон от Гумбы!');

    // Если игрок большой - уменьшаемся
    if (this.power > 0) {
      this.powerDown();
    } else {
      // Если маленький - умираем
      this.startDeath();
    }
  }

  powerDown() {
    console.log('Игрок уменьшается');
    // Устанавливаем неуязвимость на несколько секунд
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

    console.log('Игрок умирает');
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

    console.log(
      'Анимация смерти запущена',
      this.pos[1] < 240 ? 'с подлетом' : 'без подлета (падение в яму)'
    );
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
    goombaSprite: function () {
      return new Sprite('/enemy.png', [0, 16], [16, 16], 3, [0, 1]);
    },
    koopaSprite: function () {
      return new Sprite('/enemy.png', [96, 0], [16, 32], 2, [0, 1]);
    },
  });

  let ground = [
    [0, 1],
    [3, 212],
  ];
  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  level.putWall(5, 13, 1);
  level.putWall(15, 13, 4);
  //level.putWall(13, 13, 1);
  level.putGoomba(35, 12);
  level.putKoopa(14, 11);

  return level;
}

// Entity Sprite и Floor - точно как оригинал с минимумом изменений
// Level - как оригинал некот методы закомментили

/**
 * Класс Goomba
 */

class Goomba extends Entity {
  constructor(pos, sprite, levelRef) {
    super({
      pos: pos,
      sprite: sprite,
      hitbox: [0, 0, 16, 16],
    });

    this.dying = false;
    this.vel = [-0.5, 0];
    this.levelRef = levelRef; // Сохраняем ссылку на уровень
    this.idx = levelRef.enemies.length;
    this.flipping = false;
  }

  render(ctx, vX, vY) {
    this.sprite.render(ctx, this.pos[0], this.pos[1], vX, vY);
  }

  update(dt, vX) {
    if (this.pos[0] - vX > 336) {
      // if we're too far away, do nothing
      return;
    } else if (this.pos[0] - vX < -32) {
      delete this.levelRef.enemies[this.idx];
    }

    if (this.dying) {
      this.dying -= 1;
      if (!this.dying) {
        delete this.levelRef.enemies[this.idx];
      }
    }

    this.acc[1] = 0.2;
    this.vel[1] += this.acc[1];
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.sprite.update(dt);
  }

  collideWall() {
    this.vel[0] = -this.vel[0];
    // гумба бывает застревает в конце перед блоком и стоит
    // Добавляем небольшой отступ от стены, чтобы избежать залипания
    if (this.vel[0] > 0) {
      this.pos[0] += 1; // Сдвигаем вправо от стены
    } else {
      this.pos[0] -= 1; // Сдвигаем влево от стены
    }
  }

  checkCollisions(vX, playerRef) {
    if (this.flipping) {
      return;
    }

    const h = this.pos[1] % 16 === 0 ? 1 : 2;
    const w = this.pos[0] % 16 === 0 ? 1 : 2;

    const baseX = Math.floor(this.pos[0] / 16);
    const baseY = Math.floor(this.pos[1] / 16);

    if (baseY + h > 15) {
      delete this.levelRef.enemies[this.idx];
      return;
    }

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (this.levelRef.statics[baseY + i]?.[baseX + j]) {
          this.levelRef.statics[baseY + i][baseX + j].isCollideWith(this);
        }
        if (this.levelRef.blocks[baseY + i]?.[baseX + j]) {
          this.levelRef.blocks[baseY + i][baseX + j].isCollideWith(this);
        }
      }
    }

    this.levelRef.enemies.forEach(enemy => {
      if (enemy === this) {
        // don't check collisions with ourselves
        return;
      } else if (enemy.pos[0] - vX > 336) {
        // stop checking once we get to far away dudes
        return;
      } else {
        this.isCollideWith(enemy);
      }
    });

    this.isCollideWith(playerRef);
  }

  isCollideWith(ent) {
    if (ent instanceof Player && (this.dying || ent.invincibility)) {
      return;
    }

    // the first two elements of the hitbox array are an offset
    const hpos1 = [this.pos[0] + this.hitbox[0], this.pos[1] + this.hitbox[1]];
    const hpos2 = [ent.pos[0] + ent.hitbox[0], ent.pos[1] + ent.hitbox[1]];

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
        if (ent instanceof Player) {
          // Определяем направление столкновения
          const playerBottom = hpos2[1] + ent.hitbox[3];
          const goombaTop = hpos1[1];
          const playerTop = hpos2[1];
          const goombaBottom = hpos1[1] + this.hitbox[3];

          // Игрок прыгает на Гумбу сверху
          if (ent.vel[1] > 0 && playerBottom - goombaTop <= ent.vel[1] + 2) {
            this.stomp(ent);
          }
          // Гумба сталкивается с игроком сбоку или снизу
          else {
            // or the player gets hit
            ent.damage();
          }
        } else {
          this.collideWall();
        }
      }
    }
  }

  stomp(playerRef) {
    //sounds.stomp.play();
    playerRef.bounce = true;
    this.sprite.pos[0] = 32;
    this.sprite.speed = 0;
    this.vel[0] = 0;
    this.dying = 10;
  }

  bump() {
    //sounds.kick.play();
    this.sprite.img = '/enemyr.png';
    this.flipping = true;
    this.pos[1] -= 1;
    this.vel[0] = 0;
    this.vel[1] = -2.5;
  }
}

/**
 * Класс Koopa
 */

export class Koopa extends Entity {
  constructor(pos, sprite, para = false, levelRef) {
    super({
      pos: pos,
      sprite: sprite,
      hitbox: [2, 8, 12, 24],
    });

    this.dying = false;
    this.shell = false;
    this.para = para;
    this.turn = false;
    this.flipping = false;
    this.vel = [-0.5, 0];
    this.left = true;
    this.levelRef = levelRef;
    this.idx = levelRef.enemies.length;
    this.koopaSprite = levelRef.koopaSprite;
  }

  render(ctx, vX, vY) {
    this.sprite.render(ctx, this.pos[0], this.pos[1], vX, vY);
  }

  update(dt, vX) {
    if (this.turn) {
      this.vel[0] = -this.vel[0];
      this.turn = false;
    }

    if (this.vel[0] !== 0) {
      this.left = this.vel[0] < 0;
    }

    if (this.left) {
      this.sprite.img = '/enemy.png';
    } else {
      this.sprite.img = '/enemyr.png';
    }

    if (this.pos[0] - vX > 336) {
      return;
    } else if (this.pos[0] - vX < -32) {
      delete this.levelRef.enemies[this.idx];
      return;
    }

    if (this.dying) {
      this.dying -= 1;
      if (!this.dying) {
        delete this.levelRef.enemies[this.idx];
      }
    }

    if (this.shell) {
      if (this.vel[0] === 0) {
        this.shell -= 1;
        if (this.shell < 120) {
          this.sprite.speed = 5;
        }
        if (this.shell === 0) {
          this.sprite = this.koopaSprite();
          this.hitbox = [2, 8, 12, 24];
          if (this.left) {
            this.sprite.img = '/enemy.png';
            this.vel[0] = 0.5;
            this.left = false;
          } else {
            this.vel[0] = -0.5;
            this.left = true;
          }
          this.pos[1] -= 16;
        }
      } else {
        this.shell = 360;
        this.sprite.speed = 0;
        this.sprite.setFrame(0);
      }
    }

    this.acc[1] = 0.2;
    this.vel[1] += this.acc[1];
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.sprite.update(dt);
  }

  collideWall() {
    this.turn = true;
  }

  checkCollisions(vX, playerRef) {
    const h = this.shell ? 1 : 2;
    const adjustedH = this.pos[1] % 16 !== 0 ? h + 1 : h;
    const w = this.pos[0] % 16 === 0 ? 1 : 2;

    const baseX = Math.floor(this.pos[0] / 16);
    const baseY = Math.floor(this.pos[1] / 16);

    if (baseY + adjustedH > 15) {
      return;
    }

    if (this.flipping) {
      return;
    }

    for (let i = 0; i < adjustedH; i++) {
      for (let j = 0; j < w; j++) {
        if (this.levelRef.statics[baseY + i]?.[baseX + j]) {
          this.levelRef.statics[baseY + i][baseX + j].isCollideWith(this);
        }
        if (this.levelRef.blocks[baseY + i]?.[baseX + j]) {
          this.levelRef.blocks[baseY + i][baseX + j].isCollideWith(this);
        }
      }
    }

    this.levelRef.enemies.forEach(enemy => {
      if (enemy === this || enemy.pos[0] - vX > 336) {
        return;
      }
      this.isCollideWith(enemy);
    });

    this.isCollideWith(playerRef);
  }

  isCollideWith(ent) {
    if (ent instanceof Player && (this.dying || ent.invincibility)) {
      return;
    }

    const hpos1 = [this.pos[0] + this.hitbox[0], this.pos[1] + this.hitbox[1]];
    const hpos2 = [ent.pos[0] + ent.hitbox[0], ent.pos[1] + ent.hitbox[1]];

    const overlapX = !(
      hpos1[0] > hpos2[0] + ent.hitbox[2] ||
      hpos1[0] + this.hitbox[2] < hpos2[0]
    );
    const overlapY = !(
      hpos1[1] > hpos2[1] + ent.hitbox[3] ||
      hpos1[1] + this.hitbox[3] < hpos2[1]
    );

    if (overlapX && overlapY) {
      if (ent instanceof Player) {
        this.handlePlayerCollision(ent);
      } else if (this.shell && this.vel[0] !== 0 && ent instanceof Goomba) {
        ent.bump();
      } else {
        this.collideWall();
      }
    }
  }

  handlePlayerCollision(player) {
    const playerBottom = player.pos[1] + player.hitbox[1] + player.hitbox[3];
    const enemyTop = this.pos[1] + this.hitbox[1];
    const playerIsAbove =
      player.vel[1] > 0 && playerBottom - enemyTop <= player.vel[1] + 2;

    if (playerIsAbove) {
      // Игрок прыгает сверху
      player.bounce = true;

      if (this.shell) {
        if (this.vel[0] === 0) {
          this.kickShell(player);
        } else {
          this.vel[0] = 0;
        }
      } else {
        this.stomp(player);
      }
    } else {
      // Столкновение сбоку
      if (this.shell) {
        if (this.vel[0] === 0) {
          // Неподвижный shell - можно пнуть сбоку
          this.kickShell(player);
        } else {
          // Движущийся shell убивает при боковом столкновении
          player.damage();
        }
      } else {
        // Обычная Koopa убивает при боковом столкновении
        player.damage();
      }
    }
  }

  stomp(player) {
    player.bounce = true;

    if (this.para) {
      this.para = false;
      this.sprite.pos[0] -= 32;
    } else {
      this.shell = 360;
      this.sprite.pos[0] += 64;
      this.sprite.pos[1] += 16;
      this.sprite.size = [16, 16];
      this.hitbox = [2, 0, 12, 16];
      this.sprite.speed = 0;
      this.sprite.frames = [0, 1];
      this.vel = [0, 0];
      this.pos[1] += 16;
    }
  }

  bump() {
    if (this.flipping) return;

    this.flipping = true;
    this.sprite.pos = [160, 0];
    this.sprite.size = [16, 16];
    this.hitbox = [2, 0, 12, 16];
    this.sprite.speed = 0;
    this.vel[0] = 0;
    this.vel[1] = -2.5;
  }

  kickShell(player) {
    if (player.left) {
      this.vel[0] = -4;
    } else {
      this.vel[0] = 4;
    }
  }
}
