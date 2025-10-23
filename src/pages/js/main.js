import input from './InputHandler';
import { Player } from './player';
import { oneone } from './levels/11';

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

    // // Обновляем флаги
    // this.level.items.forEach(item => {
    //   if (item instanceof Flag) {
    //     item.update(dt, this.vX, this.player);
    //     item.checkCollisions(this.player);
    //   }
    // });

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

    // Отрисовываем флаг
    // this.level.items.forEach(item => {
    //   if (item instanceof Flag) {
    //     item.render(this.ctx, this.vX, this.vY);
    //   }
    // });

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
