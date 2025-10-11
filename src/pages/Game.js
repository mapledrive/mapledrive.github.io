import { input } from './InputHandler';
import { Player } from './Player';
import { createLevelOneOne } from './Other';

/**
 * Основной игровой класс
 */
export class Game {
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
