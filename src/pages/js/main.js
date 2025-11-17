import './resources.js';
import { Sprite } from './sprite.js';
import { Entity } from './entity.js';
import { Floor } from './floor.js';
import { Player } from './player.js';
import { Level } from './level.js';
import { oneone } from './11.js';
import { QLearning } from './marioAI.js';
import { renderPlayerInfo, renderKeyAndQLearningInfo, renderQTable } from './debug.js';
import './input.jsx';

// Инициализируем глобальные переменные в window
window.vX = 0;
window.vY = 0;
window.vWidth = 256;
window.vHeight = 240;
window.level = null;
window.canvas = null;
window.ctx = null;
window.updateables = [];
window.fireballs = [];
window.player = null;
window.gameTime = 0;

// Экспортируем классы
window.Mario = {};
window.Mario.Sprite = Sprite;
window.Mario.Entity = Entity;
window.Mario.Floor = Floor;
window.Mario.Player = Player;
window.Mario.Level = Level;
let input = window.input;

let resources = window.resources;

export const initializeGameGlobals = () => {
  if (!window.sounds) {
    window.sounds = {
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
    // Замьютить все звуки по умолчанию
    Object.values(window.sounds).forEach(sound => {
      sound.muted = true;
    });
  }

  if (!window.music) {
    window.music = {
      overworld: new Audio('sounds/aboveground_bgm.ogg'),
      underground: new Audio('sounds/underground_bgm.ogg'),
      clear: new Audio('sounds/stage_clear.wav'),
      death: new Audio('sounds/mariodie.wav'),
    };
    // Замьютить всю музыку по умолчанию
    Object.values(window.music).forEach(track => {
      track.muted = true;
    });
  }
};

/**
 * Основной игровой класс Main
 */
export class Main {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.width = 762;
    this.canvas.height = 720;

    this.vX = 0;
    this.vY = 0;
    this.vWidth = 256;
    this.vHeight = 240;
    this.gameTime = 0;
    this.updateables = [];
    this.fireballs = [];

    this.ctx.scale(3, 3);

    this.initLevel();

    this.rafId = null;
    this.lastTime = null;
    this.initialized = false;
  }

  initLevel() {
    // Обновляем глобальные переменные
    window.canvas = this.canvas;
    window.ctx = this.ctx;
    window.updateables = this.updateables;
    window.fireballs = this.fireballs;
    window.vX = this.vX;
    window.vY = this.vY;
    window.gameTime = this.gameTime;

    this.player = new Player([56, 192]);

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

    window.player = this.player;

    oneone();

    this.level = window.level;

    this.vX = 0;
    this.vY = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.fireballs = [];

    window.vX = this.vX;
    window.vY = this.vY;
    window.gameTime = this.gameTime;
    window.updateables = this.updateables;
    window.fireballs = this.fireballs;

    if (!window.qLearning) {
      window.qLearning = new QLearning();
    } else {
      window.qLearning.reset();
    }
  }

  init() {
    if (this.initialized) return;

    window.level = this.level;
    window.player = this.player;

    if (resources.isReady()) {
      this.initialized = true;
    } else {
      resources.onReady(() => {
        this.initialized = true;
      });
    }
  }

  handleInput(dt) {
    if (this.player.dying || this.player.piping || this.player.noInput) return;

    // Всегда обрабатываем ручное управление независимо от режима training
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

    window.vX = this.vX;
    window.gameTime = this.gameTime;

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < this.level.blocks[i]?.length || 0; j++) {
        if (this.level.blocks[i][j]) {
          this.level.blocks[i][j].update(dt, gameTime);
        }
      }
    }

    if (!this.player.dying) {
      this.level.enemies.forEach((enemy, index) => {
        if (enemy) {
          enemy.update(dt, this.vX);
          enemy.checkCollisions(this.vX, this.player);
        }
      });
    }

    this.updateables.forEach(ent => {
      ent.update(dt, gameTime);
    });

    if (this.player.exiting) {
      if (this.player.pos[0] > this.vX + 96) {
        this.vX = this.player.pos[0] - 96;
        window.vX = this.vX;
      }
    } else if (this.level.scrolling && this.player.pos[0] > this.vX + 80) {
      this.vX = this.player.pos[0] - 80;
      window.vX = this.vX;
    }

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
    if (this.player.pos[1] > 240 && !this.player.dying) {
      this.player.die();
    }

    if (this.player.dying && this.player.dying <= 0) {
      this.resetLevel();
    }
  }

  resetLevel() {
    console.log('Перезагрузка уровня...');
    this.initLevel();

    window.level = this.level;
    window.player = this.player;

    input.reset();
    window.qLearning.reset();
  }

  update(dt) {
    if (!this.initialized) return;

    this.gameTime += dt;

    // Q-learning управление - ВСЕГДА вызываем
    if (window.qLearning) {
      window.qLearning.step();
    }

    // Ручное управление - ВСЕГДА вызываем
    this.handleInput(dt);

    this.updateEntities(dt, this.gameTime);
    this.checkCollisions();

    // Обновление Q-learning после физики
    if (window.qLearning) {
      window.qLearning.update();
    }

    this.checkPlayerDeath();
  }

  renderEntity(entity) {
    entity.render(this.ctx, this.vX, this.vY);
  }

  render() {
    if (!this.initialized) {
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Загрузка...', 100, 100);
      return;
    }

    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = this.level.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateables = [];
    window.updateables = this.updateables;

    for (let i = 0; i < 15; i++) {
      const startJ = Math.floor(this.vX / 16) - 1;
      const endJ = Math.floor(this.vX / 16) + 20;

      for (let j = startJ; j < endJ; j++) {
        if (this.level.statics[i] && this.level.statics[i][j]) {
          this.renderEntity(this.level.statics[i][j]);
        }

        if (this.level.blocks[i] && this.level.blocks[i][j]) {
          this.renderEntity(this.level.blocks[i][j]);
        }
      }
    }

    this.level.enemies.forEach(enemy => {
      if (enemy && enemy.pos[0] - this.vX > -32 && enemy.pos[0] - this.vX < 336) {
        this.renderEntity(enemy);
      }
    });

    if (!this.player.dying) {
      if (this.player.invincibility % 2 === 0) {
        this.renderEntity(this.player);
      }
    } else {
      this.renderEntity(this.player);
    }

    renderPlayerInfo();
    renderKeyAndQLearningInfo();
    renderQTable();
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

export const loadAllSprites = () => {
  return new Promise(resolve => {
    resources.load([
      '/sprites/player.png',
      '/sprites/enemy.png',
      '/sprites/tiles.png',
      '/sprites/playerl.png',
      '/sprites/items.png',
      '/sprites/enemyr.png',
    ]);

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
