import { Sprite } from './Sprite';
import { Level } from './Level';

/**
 * Функция для создания уровня 1-1 как в оригинале
 */
export function createLevelOneOne() {
  const level = new Level({
    playerPos: [56, 192],
    loader: createLevelOneOne,
    background: '#7974FF',
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 204,
    floorSprite: new Sprite('/tiles.png', [0, 0], [16, 16], 0),
    wallSprite: new Sprite('/tiles.png', [0, 16], [16, 16], 0),
  });

  var ground = [[0, 212]];

  // Build THE GROUND
  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  // Build scenery
  // Interactable terrain
  level.putWall(14, 13, 4);
  level.putWall(25, 13, 1);
  level.putWall(100, 13, 2);
  level.putWall(183, 13, 3);
  level.putWall(184, 13, 4);
  level.putWall(185, 13, 5);

  return level;
}
