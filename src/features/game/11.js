import { Sprite } from './sprite';
import { Level } from './level';

export function oneone() {
  window.level = new Level({
    playerPos: [0, 192],
    loader: oneone,
    background: '#7974FF',
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 200,
    floorSprite: new Sprite('/sprites/tiles.png', [0, 0], [16, 16], 0),
  });

  window.ground = [
    [0, 5],
    [8, 15],
    [19, 32],
    [34, 42],
    [46, 57],
    [61, 70],
    [72, 79],
    [82, 95],
    [99, 112],
    [115, 200],
  ];

  window.vX = 0;
  window.vY = 0;

  if (window.player) {
    window.player.pos[0] = window.level.playerPos[0];
    window.player.pos[1] = window.level.playerPos[1];
  }

  window.ground.forEach(function (loc) {
    window.level.putFloor(loc[0], loc[1]);
  });

  window.music.overworld.play();
}

// console.log('Сгенерированные платформы:', window.ground);

//window.ground = generateRandomGround();

function generateRandomGround() {
  const totalLength = 200;
  const platformCount = 10;
  const ground = [];

  let currentX = 0;

  for (let i = 0; i < platformCount; i++) {
    // Длина платформы от 5 до 15 блоков
    const platformLength = Math.floor(Math.random() * 11) + 5; // 5-15

    // Определяем конец текущей платформы
    const platformEnd = currentX + platformLength;

    // Добавляем платформу
    ground.push([currentX, platformEnd]);

    // Определяем начало следующей платформы (пропуск 2, 3 или 4 блока)
    const gap = Math.floor(Math.random() * 3) + 2; // 2, 3 или 4
    currentX = platformEnd + gap;

    // Если вышли за пределы уровня, выходим
    if (currentX >= totalLength) {
      // Корректируем последнюю платформу чтобы она заканчивалась на totalLength
      ground[ground.length - 1][1] = totalLength;
      break;
    }
  }

  // Если последняя платформа не доходит до конца уровня, добавляем еще
  if (ground[ground.length - 1][1] < totalLength) {
    ground[ground.length - 1][1] = totalLength;
  }

  return ground;
}
