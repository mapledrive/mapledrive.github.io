import { Floor } from '../floor';

export class Level {
  constructor(options) {
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;
    this.floorSprite = options.floorSprite;
    this.statics = []; // Статические объекты (пол, стены)
    this.scenery = []; // Декорации (облака, кусты)
    for (let i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.scenery[i] = [];
      this.blocks[i] = [];
    }
  }
  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite, this);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite, this);
    }
  }
}
