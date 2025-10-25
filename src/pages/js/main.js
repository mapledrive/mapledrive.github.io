import { InputHandler } from './input';
import { ResourceLoader } from './resources';
import { Sprite } from './sprite.js';
import { Entity } from './entity.js';
import { Floor } from './floor.js';
import { Player } from './player.js';
import { Level } from './levels/level.js';
import { oneone } from './levels/11.js';
import { gameState } from './gameState.js';
import { renderDebugInfo } from './debug.js';

window.Mario = {};
let input = new InputHandler();
window.input = input;
export const resources = new ResourceLoader();
window.resources = resources;

// Глобальные переменные для обратной совместимости

window.level = null;
window.player = null;

// Экспортируем классы
window.Mario.Sprite = Sprite;
window.Mario.Entity = Entity;
window.Mario.Floor = Floor;
window.Mario.Player = Player;
window.Mario.Level = Level;
window.Mario.oneone = oneone;

// Делаем gameState доступным глобально для обратной совместимости
window.gameState = gameState;

gameState.music = {
  overworld: new Audio('sounds/aboveground_bgm.ogg'),
  underground: new Audio('sounds/underground_bgm.ogg'),
  clear: new Audio('sounds/stage_clear.wav'),
  death: new Audio('sounds/mariodie.wav'),
};
gameState.sounds = {
  smallJump: new Audio('sounds/jump-small.wav'),
  bigJump: new Audio('sounds/jump-super.wav'),
  breakBlock: new Audio('sounds/breakblock.wav'),
  bump: new Audio('sounds/bump.wav'),
  coin: new Audio('sounds/coin.wav'),
  fireball: new Audio('sounds/fireball.wav'),
  flagpole: new Audio('sounds/flagpole.wav'),
  kick: new Audio('sounds/kick.wav'),
  pipe: new Audio('sounds/pipe.wav'),
  itemAppear: new Audio('sounds/itemAppear.wav'),
  powerup: new Audio('sounds/powerup.wav'),
  stomp: new Audio('sounds/stomp.wav'),
};

/**
 * Основной игровой класс Main
 */
export class Main {
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
    // Инициализируем gameState
    gameState.canvas = this.canvas;
    gameState.ctx = this.ctx;
    gameState.updateables = this.updateables;
    gameState.fireballs = this.fireballs;
    gameState.vX = this.vX;
    gameState.vY = this.vY;
    gameState.gameTime = this.gameTime;

    // Создаем нового игрока на стартовой позиции уровня
    this.player = new Player([56, 192]); // Используем стандартную позицию

    // ИНИЦИАЛИЗИРУЕМ ОТСУТСТВУЮЩИЕ СВОЙСТВА ИГРОКА
    this.player.maxSpeed = 1.5;
    this.player.moveAcc = 0.07;
    this.player.standing = true;
    this.player.dying = false;
    this.player.waiting = 0;
    this.player.piping = false;
    this.player.flagging = false;
    this.player.exiting = false;
    this.player.starTime = 0;
    this.player.shooting = 0;

    // Устанавливаем игрока в gameState
    gameState.player = this.player;

    // Создаем уровень через oneone() - она теперь работает с gameState
    oneone();

    // Получаем уровень из gameState
    this.level = gameState.level;

    // Сбрасываем состояние игры
    this.vX = 0;
    this.vY = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.fireballs = [];

    // Обновляем gameState
    gameState.vX = this.vX;
    gameState.vY = this.vY;
    gameState.gameTime = this.gameTime;
    gameState.updateables = this.updateables;
    gameState.fireballs = this.fireballs;
  }

  init() {
    if (this.initialized) return;

    // Инициализируем глобальные переменные
    window.level = this.level;
    window.player = this.player;

    window.music = {
      death: new Audio('sounds/mariodie.wav'),
      overworld: { pause: () => {}, currentTime: 0 },
      underground: { pause: () => {} },
    };

    // Используем новую систему проверки готовности ресурсов
    if (resources.isReady()) {
      this.initialized = true;
    } else {
      // Ждем пока все ресурсы загрузятся
      resources.onReady(() => {
        this.initialized = true;
      });
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

    // Обновляем gameState
    gameState.vX = this.vX;
    gameState.gameTime = this.gameTime;

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
        gameState.vX = this.vX;
      }
    } else if (this.level.scrolling && this.player.pos[0] > this.vX + 80) {
      this.vX = this.player.pos[0] - 80;
      gameState.vX = this.vX;
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
    // Проверяем падение в яму (используем оригинальную логику из player.js)
    if (this.player.pos[1] > 240 && !this.player.dying) {
      this.player.die();
    }

    // Перезагружаем уровень после завершения анимации смерти
    if (this.player.dying && this.player.dying <= 0) {
      this.resetLevel();
    }
  }

  resetLevel() {
    console.log('Перезагрузка уровня...');
    this.initLevel();

    // Обновляем глобальные ссылки
    window.level = this.level;
    window.player = this.player;

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
    gameState.updateables = this.updateables;

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

    // Отрисовываем отладочную информацию
    renderDebugInfo(gameState, input);
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
