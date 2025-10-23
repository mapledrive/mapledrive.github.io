import { Floor } from '../floor';

export class Level {
  constructor(options) {
    // Основные свойства уровня
    this.playerPos = options.playerPos;
    this.scrolling = options.scrolling;
    this.loader = options.loader;
    this.background = options.background;
    this.exit = options.exit;

    // Спрайты для различных объектов
    this.floorSprite = options.floorSprite;
    this.cloudSprite = options.cloudSprite;
    this.wallSprite = options.wallSprite;
    this.brickSprite = options.brickSprite;
    this.rubbleSprite = options.rubbleSprite;
    this.brickBounceSprite = options.brickBounceSprite;
    this.ublockSprite = options.ublockSprite;
    this.superShroomSprite = options.superShroomSprite;
    this.fireFlowerSprite = options.fireFlowerSprite;
    this.starSprite = options.starSprite;
    this.coinSprite = options.coinSprite;
    this.bcoinSprite = options.bcoinSprite;
    this.goombaSprite = options.goombaSprite;
    this.koopaSprite = options.koopaSprite;

    // Спрайты труб (старые и новые)
    this.pipeLEndSprite = options.pipeLEndSprite;
    this.pipeREndSprite = options.pipeREndSprite;
    this.pipeLMidSprite = options.pipeLMidSprite;
    this.pipeRMidSprite = options.pipeRMidSprite;
    this.pipeUpMid = options.pipeUpMid;
    this.pipeSideMid = options.pipeSideMid;
    this.pipeLeft = options.pipeLeft;
    this.pipeTop = options.pipeTop;

    // Декорации и специальные объекты
    this.flagpoleSprites = options.flagPoleSprites;
    this.LPipeSprites = options.LPipeSprites;
    this.cloudSprites = options.cloudSprites;
    this.hillSprites = options.hillSprites;
    this.bushSprite = options.bushSprite;
    this.bushSprites = options.bushSprites;
    this.qblockSprite = options.qblockSprite;

    this.invincibility = options.invincibility;

    // Контейнеры для игровых объектов
    this.statics = []; // Статические объекты (пол, стены)
    this.scenery = []; // Декорации (облака, кусты)
    this.blocks = []; // Интерактивные блоки
    this.enemies = []; // Враги
    this.items = []; // Предметы (монеты, power-ups)
    this.pipes = []; // Трубы с телепортацией

    for (let i = 0; i < 15; i++) {
      this.statics[i] = [];
      this.scenery[i] = [];
      this.blocks[i] = [];
    }
  }

  putFloor(start, end) {
    for (let i = start; i < end; i++) {
      // Передаем this (текущий уровень) в конструктор Floor
      this.statics[13][i] = new Floor([16 * i, 208], this.floorSprite, this);
      this.statics[14][i] = new Floor([16 * i, 224], this.floorSprite, this);
    }
  }

  putWall(x, y, height) {
    // y - нижняя точка стены
    for (let i = y - height; i < y; i++) {
      this.statics[i][x] = new Floor([16 * x, 16 * i], this.wallSprite, this);
    }
  }

  putPipe(x, y, height) {
    for (let i = y - height; i < y; i++) {
      if (i === y - height) {
        this.statics[i][x] = new Floor(
          [16 * x, 16 * i],
          this.pipeLEndSprite,
          this
        );
        this.statics[i][x + 1] = new Floor(
          [16 * x + 16, 16 * i],
          this.pipeREndSprite,
          this
        );
      } else {
        this.statics[i][x] = new Floor(
          [16 * x, 16 * i],
          this.pipeLMidSprite,
          this
        );
        this.statics[i][x + 1] = new Floor(
          [16 * x + 16, 16 * i],
          this.pipeRMidSprite,
          this
        );
      }
    }
  }

  putLeftPipe(x, y) {
    this.statics[y][x] = new Floor(
      [16 * x, 16 * y],
      this.LPipeSprites[0],
      this
    );
    this.statics[y + 1][x] = new Floor(
      [16 * x, 16 * (y + 1)],
      this.LPipeSprites[1],
      this
    );
    this.statics[y][x + 1] = new Floor(
      [16 * (x + 1), 16 * y],
      this.LPipeSprites[2],
      this
    );
    this.statics[y + 1][x + 1] = new Floor(
      [16 * (x + 1), 16 * (y + 1)],
      this.LPipeSprites[3],
      this
    );
    this.statics[y][x + 2] = new Floor(
      [16 * (x + 2), 16 * y],
      this.LPipeSprites[4],
      this
    );
    this.statics[y + 1][x + 2] = new Floor(
      [16 * (x + 2), 16 * (y + 1)],
      this.LPipeSprites[5],
      this
    );
  }

  putCoin(x, y) {
    //this.items.push(new Coin([x * 16, y * 16], this.coinSprite()));
  }

  putCloud(x, y) {
    //this.scenery[y][x] = new Prop([x * 16, y * 16], this.cloudSprite);
  }

  putBigHill(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.hillSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.hillSprites[3]);
    // this.scenery[y - 1][x + 1] = new Prop(
    //   [px + 16, py - 16],
    //   this.hillSprites[0]
    // );
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.hillSprites[4]);
    // this.scenery[y - 1][x + 2] = new Prop(
    //   [px + 32, py - 16],
    //   this.hillSprites[3]
    // );
    // this.scenery[y - 2][x + 2] = new Prop(
    //   [px + 32, py - 32],
    //   this.hillSprites[1]
    // );
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.hillSprites[5]);
    // this.scenery[y - 1][x + 3] = new Prop(
    //   [px + 48, py - 16],
    //   this.hillSprites[2]
    // );
    // this.scenery[y][x + 4] = new Prop([px + 64, py], this.hillSprites[2]);
  }

  putBush(x, y) {
    //this.scenery[y][x] = new Prop([x * 16, y * 16], this.bushSprite);
  }

  putThreeBush(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.bushSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.bushSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.bushSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.bushSprites[1]);
    // this.scenery[y][x + 4] = new Prop([px + 64, py], this.bushSprites[2]);
  }

  putTwoBush(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.bushSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.bushSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.bushSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.bushSprites[2]);
  }

  putSmallHill(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.hillSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.hillSprites[3]);
    // this.scenery[y - 1][x + 1] = new Prop(
    //   [px + 16, py - 16],
    //   this.hillSprites[1]
    // );
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.hillSprites[2]);
  }

  putTwoCloud(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.cloudSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.cloudSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.cloudSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.cloudSprites[2]);
  }

  putThreeCloud(x, y) {
    // const px = x * 16,
    //   py = y * 16;
    // this.scenery[y][x] = new Prop([px, py], this.cloudSprites[0]);
    // this.scenery[y][x + 1] = new Prop([px + 16, py], this.cloudSprites[1]);
    // this.scenery[y][x + 2] = new Prop([px + 32, py], this.cloudSprites[1]);
    // this.scenery[y][x + 3] = new Prop([px + 48, py], this.cloudSprites[1]);
    // this.scenery[y][x + 4] = new Prop([px + 64, py], this.cloudSprites[2]);
  }

  putRealPipe(x, y, length, direction, destination) {
    // const px = x * 16,
    //   py = y * 16;
    // this.pipes.push(
    //   new Pipe({
    //     pos: [px, py],
    //     length: length,
    //     direction: direction,
    //     destination: destination,
    //   })
    // );
  }

  putFlagpole(x) {
    // const flagX = 16 * x;
    // // Создаем флаг
    // const flag = new Flag(flagX, this);
    // this.items.push(flag);
    // // Добавляем основание флагштока как статичный объект
    // this.statics[12][x] = new Floor([flagX, 192], this.wallSprite, this);
    // return flag; // Возвращаем флаг для доступа
  }
}
