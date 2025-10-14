import { Sprite } from './Sprite';
import { Level } from './Level';

/**
 * Функция для создания уровня 1-1
 */
export function createLevelOneOne() {
  const level = new Level({
    playerPos: [56, 192],
    loader: createLevelOneOne,
    background: '#7073F5',
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 204,
    floorSprite: new Sprite('/tiles.png', [0, 0], [16, 16], 0),
    wallSprite: new Sprite('/tiles.png', [0, 16], [16, 16], 0),
    pipeLMidSprite: new Sprite('/tiles.png', [0, 144], [16, 16], 0),
    pipeRMidSprite: new Sprite('/tiles.png', [16, 144], [16, 16], 0),
    pipeLEndSprite: new Sprite('/tiles.png', [0, 128], [16, 16], 0),
    pipeREndSprite: new Sprite('/tiles.png', [16, 128], [16, 16], 0),
    pipeUpMid: new Sprite('/tiles.png', [0, 144], [32, 16], 0),
    pipeSideMid: new Sprite('/tiles.png', [48, 128], [16, 32], 0),
    pipeLeft: new Sprite('/tiles.png', [32, 128], [16, 32], 0),
    pipeTop: new Sprite('/tiles.png', [0, 128], [32, 16], 0),
  });

  var ground = [[0, 212]];

  // Build THE GROUND
  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  // Build scenery
  // Interactable terrain
  level.putPipe(1, 13, 2);
  level.putPipe(10, 13, 3);
  level.putPipe(46, 13, 4);
  level.putWall(100, 13, 2);
  level.putWall(183, 13, 3);
  level.putWall(184, 13, 4);
  level.putWall(185, 13, 5);
  level.putWall(20, 13, 1);
  level.putWall(21, 13, 2);
  level.putWall(22, 13, 3);
  level.putWall(23, 13, 4);
  level.putWall(24, 13, 5);
  level.putWall(25, 13, 6);
  level.putWall(26, 13, 7);
  level.putWall(27, 13, 8);
  level.putWall(28, 13, 9);
  level.putWall(29, 13, 10);
  level.putWall(30, 13, 11);
  level.putWall(31, 13, 12);

  return level;
}
