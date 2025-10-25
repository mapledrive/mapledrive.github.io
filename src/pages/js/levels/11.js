import { Sprite } from '../sprite';
import { Level } from './level';
import { gameState } from '../gameState';

export function oneone() {
  gameState.level = new Level({
    playerPos: [56, 192],
    loader: oneone,
    background: '#7974FF',
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 40,
    floorSprite: new Sprite('/tiles.png', [0, 0], [16, 16], 0),
  });

  let ground = [
    [0, 10],
    [13, 212],
  ];

  gameState.vX = 0;
  gameState.vY = 0;

  if (gameState.player) {
    gameState.player.pos[0] = gameState.level.playerPos[0];
    gameState.player.pos[1] = gameState.level.playerPos[1];
  }

  ground.forEach(function (loc) {
    gameState.level.putFloor(loc[0], loc[1]);
  });
}
