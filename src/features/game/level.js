import { Floor } from './floor';

export class Level {
  constructor(options) {
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;
    this.floorSprite = options.floorSprite;
    this.dangerSprite = options.dangerSprite; //выделение опасных зон

    this.statics = []; // Статические объекты (пол, стены)
    this.scenery = []; // Декорации (облака, кусты)
    this.blocks = []; // Интерактивные блоки
    this.enemies = []; // Враги
    this.items = []; // Предметы (монеты, power-ups)
    this.pipes = []; // Трубы с телепортацией

    // 💡 Добавляем новые свойства для хранения данных об опасностях
    this.allDangerousX = options.allDangerousX || new Set(); //выделение опасных зон
    this.holeX = options.holeX || new Set(); //выделение опасных зон

    for (var i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.scenery[i] = [];
      this.blocks[i] = [];
    }
  }

  isDangerousBlock(i) {
    // Если блок является частью ямы (hole) ИЛИ он является зоной,
    // откуда прыжок неизбежно приведет к падению.
    return this.allDangerousX.has(i) || this.holeX.has(i); //выделение опасных зон
  }

  putFloor(start, end) {
    //выделение опасных зон
    for (let i = start; i < end; i++) {
      // 💡 Условие для определения опасности
      const isDangerous = this.isDangerousBlock(i);

      if (!isDangerous) {
        // Обычный, безопасный пол
        this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
        this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
      } else {
        // Опасный пол (зона, откуда нельзя прыгать, или сама яма)
        this.statics[13][i] = new Floor([16 * i, 208], this.dangerSprite);
        this.statics[14][i] = new Floor([16 * i, 224], this.dangerSprite);
      }
    }
  }
}
