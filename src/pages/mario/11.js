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
  level.putWall(14, 13, 2);
  level.putWall(16, 13, 1);
  level.putWall(100, 13, 2);
  level.putWall(183, 13, 3);
  level.putWall(184, 13, 4);
  level.putWall(185, 13, 5);
  level.putPipe(28, 13, 2);
  level.putPipe(38, 13, 3);
  level.putPipe(46, 13, 4);

  return level;
}
