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
