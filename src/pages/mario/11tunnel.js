import { Sprite } from './Sprite';
import { Level } from './Level';

export function createTunnel() {
  let level = new Level({
    playerPos: [40, 16],
    loader: createTunnel,
    background: '#000000',
    scrolling: false,
    floorSprite: new Sprite('/tiles.png', [0, 32], [16, 16], 0),
    wallSprite: new Sprite('/tiles.png', [32, 32], [16, 16], 0),
    brickSprite: new Sprite('/tiles.png', [16, 0], [16, 16], 0),
    pipeLMidSprite: new Sprite('/tiles.png', [0, 144], [16, 16], 0),
    pipeRMidSprite: new Sprite('/tiles.png', [16, 144], [16, 16], 0),
    pipeLEndSprite: new Sprite('/tiles.png', [0, 128], [16, 16], 0),
    pipeREndSprite: new Sprite('/tiles.png', [16, 128], [16, 16], 0),
    pipeUpMid: new Sprite('/tiles.png', [0, 144], [32, 16], 0),
    pipeSideMid: new Sprite('/tiles.png', [48, 128], [16, 32], 0),
    pipeLeft: new Sprite('/tiles.png', [32, 128], [16, 32], 0),
    pipeTop: new Sprite('/tiles.png', [0, 128], [32, 16], 0),
  });

  window.level = level;

  level.putFloor(0, 16);
  level.putWall(0, 13, 11);
  // level.putWall(15, 13, 11);
  let walls = [4, 5, 6, 7, 8, 9, 10];
  walls.forEach(function (loc) {
    level.putWall(loc, 13, 3);
    level.putWall(loc, 3, 1);
  });
  level.putPipe(15, 13, 13);
  level.putRealPipe(13, 11, 3, 'RIGHT', function () {
    // Mario.oneone.call();
    // window.player.pos = [2616, 177];
    // window.player.pipe('UP', function () {});
  });

  return level;
}
