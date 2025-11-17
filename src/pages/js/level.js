import { Floor } from './floor';

export class Level {
  constructor(options) {
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;
    this.floorSprite = options.floorSprite;

    this.statics = []; // Статические объекты (пол, стены)
    this.scenery = []; // Декорации (облака, кусты)
    this.blocks = []; // Интерактивные блоки
    this.enemies = []; // Враги
    this.items = []; // Предметы (монеты, power-ups)
    this.pipes = []; // Трубы с телепортацией

    for (var i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.scenery[i] = [];
      this.blocks[i] = [];
    }
  }

  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      // Передаем this (текущий уровень) в конструктор Floor
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
    }
  }
}
