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

    // Спрайты
    this.floorSprite = options.floorSprite;
    this.wallSprite = options.wallSprite;

    // Инициализация массивов
    this.statics = [];
    this.blocks = [];

    for (let i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.blocks[i] = [];
    }
  }

  /**
   * Создает платформы из интервалов [start, end]
   * ground = [[0, 10], [12, 20], [25, 30]] создаст платформы от 0-9, 12-19, 25-29
   */
  putFloorFromIntervals(ground) {
    ground.forEach(interval => {
      const [start, end] = interval;
      for (let i = start; i < end; i++) {
        // Земля на двух нижних рядах (13 и 14)
        this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
        this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
      }
    });
  }

  /**
   * Старый метод для обратной совместимости
   */
  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite);
    }
  }

  putWall(x, y, height) {
    // y - это ВЕРХНИЙ ряд стены, строим СВЕРХУ ВНИЗ
    for (let i = 0; i < height; i++) {
      const row = y + i;
      if (row < 13 && row >= 0) {
        // Не ставим стены на земле или ниже
        this.statics[row][x] = new Floor([16 * x, 16 * row], this.wallSprite);
      }
    }
  }
}
