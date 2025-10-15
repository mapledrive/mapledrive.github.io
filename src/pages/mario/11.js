import { Sprite } from './Sprite';
import { Level } from './Level';
/**
 * Функция для создания уровня 1-1
 */
export function oneone() {
  let level = new Level({
    playerPos: [56, 192],
    loader: oneone,
    background: '#7073F5',
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 204,
    floorSprite: new Sprite('/tiles.png', [0, 0], [16, 16], 0),
    wallSprite: new Sprite('/tiles.png', [0, 16], [16, 16], 0),
  });

  window.level = level;

  let ground = [
    [0, 8],
    [10, 212],
  ];
  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  level.putWall(14, 13, 2);
  level.putWall(15, 13, 3);
  level.putWall(16, 13, 4);
  level.putWall(17, 13, 5);

  return level;
}
