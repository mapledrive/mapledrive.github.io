import { Sprite } from './Sprite';
import { Level } from './Level';

/**
 * Утилита для отрисовки фрагментов спрайтов
 */
export class SpriteRenderer {
  static drawFrame(
    ctx,
    sprite,
    frameX,
    frameY,
    frameWidth,
    frameHeight,
    destX,
    destY,
    destWidth = frameWidth,
    destHeight = frameHeight
  ) {
    if (!sprite) return;
    ctx.drawImage(
      sprite,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      destX,
      destY,
      destWidth,
      destHeight
    );
  }
}

/**
 * Функция для создания уровня 1-1 как в оригинале
 */
export function createLevelOneOne() {
  const floorSprite = new Sprite('/tiles.png', [0, 0], [16, 16], 0, [0], false);
  const wallSprite = new Sprite('/tiles.png', [0, 16], [16, 16], 0, [0], false);

  const level = new Level({
    playerPos: [56, 192],
    loader: createLevelOneOne,
    background: '#7974FF',
    scrolling: true,
    floorSprite: floorSprite,
    wallSprite: wallSprite,
  });

  // Создаем землю с дырками как в оригинале
  // ground = [[0, 10], [12, 212]] означает:
  // - платформа от блока 0 до 9 (10 блоков)
  // - платформа от блока 12 до 211 (200 блоков)
  const ground = [
    [0, 10],
    [12, 50],
  ]; // Укороченная версия для теста

  // Build THE GROUND
  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  // Build scenery
  level.putWall(14, 9, 4);
  level.putWall(25, 12, 1);
  level.putWall(100, 11, 2);
  level.putWall(183, 10, 3);
  level.putWall(184, 9, 4);
  level.putWall(185, 8, 5);

  return level;
}
