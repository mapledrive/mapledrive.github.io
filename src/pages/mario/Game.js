import { input } from './InputHandler';
import { Player } from './Player';
import { createLevelOneOne } from './11';

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

    // Применяем CSS стили как в оригинале
    this.canvas.style.display = 'block';
    this.canvas.style.width = '762px';
    this.canvas.style.margin = '0 auto';
    this.canvas.style.backgroundColor = 'black';

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

    // Создаем уровень и игрока
    this.level = createLevelOneOne();
    window.level = this.level;
    this.player = new Player(this.level.playerPos);

    this.rafId = null;
    this.lastTime = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

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

    // Обновляем предметы, врагов, файрболы и трубы
    this.level.items?.forEach(ent => ent.update(dt));
    this.level.enemies?.forEach(ent => ent.update(dt, this.vX));
    this.fireballs?.forEach(fireball => fireball.update(dt));
    this.level.pipes?.forEach(pipe => pipe.update(dt));
  }

  checkCollisions() {
    if (this.player.powering?.length !== 0 || this.player.dying) {
      return;
    }
    this.player.checkCollisions(this.level);
  }

  update(dt) {
    if (!this.initialized) return;

    this.gameTime += dt;
    this.handleInput(dt);
    this.updateEntities(dt, this.gameTime);
    this.checkCollisions();
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

        // Блоки (кирпичи, вопросные блоки)
        if (
          this.level.blocks &&
          this.level.blocks[i] &&
          this.level.blocks[i][j]
        ) {
          this.renderEntity(this.level.blocks[i][j]);
          this.updateables.push(this.level.blocks[i][j]);
        }
      }
    }

    // Отрисовываем предметы, врагов и другие объекты
    this.level.items?.forEach(item => this.renderEntity(item));
    this.level.enemies?.forEach(enemy => this.renderEntity(enemy));
    this.fireballs?.forEach(fireball => this.renderEntity(fireball));
    this.level.pipes?.forEach(pipe => this.renderEntity(pipe));

    // Отрисовываем игрока (с учетом мерцания при неуязвимости)
    if (this.player.invincibility % 2 === 0) {
      this.renderEntity(this.player);
    }

    // Отладочная информация (рисуем без масштабирования)
    const originalTransform = ctx.getTransform();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

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
    ctx.fillText(
      `Viewport: ${Math.floor(this.vX / 16)} - ${
        Math.floor(this.vX / 16) + 20
      }`,
      10,
      80
    );

    // Восстанавливаем трансформацию
    ctx.setTransform(originalTransform);
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
