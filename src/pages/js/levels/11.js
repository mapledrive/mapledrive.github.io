import { Sprite } from '../sprite';
import { Level } from './level';

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
    goombaSprite: function () {
      return new Sprite('/enemy.png', [0, 16], [16, 16], 3, [0, 1]);
    },
    koopaSprite: function () {
      return new Sprite('/enemy.png', [96, 0], [16, 32], 6, [0, 1]);
    },
    brickSprite: new Sprite('/tiles.png', [16, 0], [16, 16], 0),
    brickBounceSprite: new Sprite('/tiles.png', [32, 0], [16, 16], 0),
    rubbleSprite: function () {
      return new Sprite('/items.png', [64, 0], [8, 8], 3, [0, 1]);
    },
    ublockSprite: new Sprite('/tiles.png', [48, 0], [16, 16], 0),
    pipeLMidSprite: new Sprite('/tiles.png', [0, 144], [16, 16], 0),
    pipeRMidSprite: new Sprite('/tiles.png', [16, 144], [16, 16], 0),
    pipeLEndSprite: new Sprite('/tiles.png', [0, 128], [16, 16], 0),
    pipeREndSprite: new Sprite('/tiles.png', [16, 128], [16, 16], 0),
    pipeUpMid: new Sprite('/tiles.png', [0, 144], [32, 16], 0),
    pipeSideMid: new Sprite('/tiles.png', [48, 128], [16, 32], 0),
    pipeLeft: new Sprite('/tiles.png', [32, 128], [16, 32], 0),
    pipeTop: new Sprite('/tiles.png', [0, 128], [32, 16], 0),
    qblockSprite: new Sprite(
      '/tiles.png',
      [384, 0],
      [16, 16],
      8,
      [0, 0, 0, 0, 1, 2, 1]
    ),
    bcoinSprite: function () {
      return new Sprite('/items.png', [0, 112], [16, 16], 20, [0, 1, 2, 3]);
    },
    flagPoleSprites: [
      new Sprite('/tiles.png', [256, 128], [16, 16], 0),
      new Sprite('/tiles.png', [256, 144], [16, 16], 0),
      new Sprite('/items.png', [128, 32], [16, 16], 0),
    ],
  });

  let ground = [
    [0, 69],
    [71, 86],
    [89, 153],
    [155, 212],
  ];

  ground.forEach(function (loc) {
    level.putFloor(loc[0], loc[1]);
  });

  return level;
}
