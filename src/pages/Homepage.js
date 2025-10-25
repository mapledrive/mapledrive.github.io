import React, { useEffect, useRef, useState } from 'react';
import { StyledSection, SectionTitle, SectionContent } from 'style';
import { InputHandler } from './js/input';
import { ResourceLoader } from './js/resources';
import { Sprite } from './js/sprite.js';
import { Entity } from './js/entity.js';
import { Floor } from './js/floor.js';
import { Player } from './js/player.js';
import { Level } from './js/levels/level.js';
import { oneone } from './js/levels/11.js';
import { gameState } from './js/gameState.js';

// Глобальные переменные для обратной совместимости
window.level = null;
window.sounds = {
  powerup: { play: () => {} },
  pipe: { play: () => {} },
  smallJump: { play: () => {} },
  bigJump: { play: () => {} },
};
window.music = {
  overworld: { pause: () => {}, currentTime: 0 },
  underground: { pause: () => {} },
  death: { play: () => {} },
};
window.player = null;

window.Mario = {};

let input = new InputHandler();
window.input = input;

// Создаем экземпляр ResourceLoader и делаем глобальным
export const resources = new ResourceLoader();
window.resources = resources;

// Функция загрузки всех спрайтов
export const loadAllSprites = () => {
  return new Promise(resolve => {
    resources.load([
      '/player.png',
      '/enemy.png',
      '/tiles.png',
      '/playerl.png',
      '/items.png',
      '/enemyr.png',
    ]);

    // Ждем пока все ресурсы загрузятся
    const checkReady = () => {
      if (resources.isReady()) {
        resolve();
      } else {
        setTimeout(checkReady, 100);
      }
    };

    checkReady();
  });
};

// Экспортируем классы
window.Mario.Sprite = Sprite;
window.Mario.Entity = Entity;
window.Mario.Floor = Floor;
window.Mario.Player = Player;
window.Mario.Level = Level;
window.Mario.oneone = oneone;

// Делаем gameState доступным глобально для обратной совместимости
window.gameState = gameState;

// 1. Homepage
// 2. class Game - игровой движок

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
    // Полностью пересоздаваем уровень
    this.level = oneone();

    // Создаем нового игрока на стартовой позиции уровня
    this.player = new Player([...this.level.playerPos]); // Копируем позицию

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

    // Сбрасываем состояние игры
    this.vX = 0;
    this.vY = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.fireballs = [];
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

  renderDebugInfo() {
    const ctx = this.ctx;
    const player = this.player;

    // Сохраняем текущую трансформацию
    const originalTransform = ctx.getTransform();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Отладочная информация
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText(
      `Position: ${Math.round(player.pos[0])}, ${Math.round(player.pos[1])}`,
      10,
      20
    );
    ctx.fillText(
      `Vel: ${player.vel[0].toFixed(2)}, ${player.vel[1].toFixed(2)}`,
      10,
      35
    );
    ctx.fillText(`Standing: ${player.standing}`, 10, 50);
    ctx.fillText(`Camera: ${Math.round(this.vX)}`, 10, 65);
    ctx.fillText(
      `Viewport: ${Math.floor(this.vX / 16)} - ${
        Math.floor(this.vX / 16) + 20
      }`,
      10,
      80
    );
    ctx.fillText(`Left: ${input.pressedKeys.LEFT}`, 10, 95);
    ctx.fillText(`Right: ${input.pressedKeys.RIGHT}`, 10, 110);
    ctx.fillText(`Up: ${input.pressedKeys.UP}`, 10, 125);
    ctx.fillText(`Down: ${input.pressedKeys.DOWN}`, 10, 140);
    ctx.fillText(`Run: ${input.pressedKeys.RUN}`, 10, 155);
    ctx.fillText(`Jump: ${input.pressedKeys.JUMP}`, 10, 170);
    ctx.fillText(`Power: ${player.power}`, 10, 185);
    ctx.fillText(`Jumping: ${player.jumping}`, 10, 200);
    ctx.fillText(`Crouching: ${player.crouching}`, 10, 215);
    ctx.fillText(`Invincibility: ${player.invincibility}`, 10, 230);
    ctx.fillText(`Fireballs: ${player.fireballs}`, 10, 245);
    ctx.fillText(`Dying: ${player.dying}`, 10, 260);
    ctx.fillText(`Piping: ${player.piping}`, 10, 275);
    ctx.fillText(`Exiting: ${player.exiting}`, 10, 290);
    ctx.fillText(`GameTime: ${this.gameTime.toFixed(1)}`, 10, 305);

    // Восстанавливаем трансформацию
    ctx.setTransform(originalTransform);
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

    // Отрисовываем отладочную информацию
    this.renderDebugInfo();
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
