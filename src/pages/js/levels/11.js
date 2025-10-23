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

  window.gameState.level = level;

  level.putFloor(0, 20);

  return level;
}
