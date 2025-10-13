import { Floor } from './Floor';

/**
 * Класс Level - с улучшенным методом putFloor
 */
export class Level {
  constructor(options) {
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;
    this.exit = options.exit;

    this.floorSprite = options.floorSprite;
    this.wallSprite = options.wallSprite;
    this.rubbleSprite = options.rubbleSprite;
    this.ublockSprite = options.ublockSprite;
    this.LPipeSprites = options.LPipeSprites;
    this.invincibility = options.invincibility;
    this.statics = [];
    this.scenery = [];
    this.blocks = [];
    this.enemies = [];
    this.items = [];
    this.pipes = [];

    for (let i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.scenery[i] = [];
      this.blocks[i] = [];
    }
  }

  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
    }
  }

  putWall(x, y, height) {
    // y is the bottom of the wall in this case.
    for (let i = y - height; i < y; i++) {
      this.statics[i][x] = new Floor([16 * x, 16 * i], this.wallSprite);
    }
  }
}
