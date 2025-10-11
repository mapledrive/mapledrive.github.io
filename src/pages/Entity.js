/**
 * Базовый класс Entity !!!
 */
export class Entity {
  constructor(options) {
    this.vel = [0, 0];
    this.acc = [0, 0];
    this.standing = true;
    this.pos = options.pos;
    this.sprite = options.sprite;
    this.hitbox = options.hitbox;
    this.left = false;
  }

  render(ctx, vX, vY) {
    if (this.sprite) {
      this.sprite.render(ctx, this.pos[0], this.pos[1], vX, vY);
    }
  }

  collideWall(wall) {
    if (this.pos[0] > wall.pos[0]) {
      this.pos[0] = wall.pos[0] + wall.hitbox[2] - this.hitbox[0];
      this.vel[0] = Math.max(0, this.vel[0]);
      this.acc[0] = Math.max(0, this.acc[0]);
    } else {
      this.pos[0] =
        wall.pos[0] + wall.hitbox[0] - this.hitbox[2] - this.hitbox[0];
      this.vel[0] = Math.min(0, this.vel[0]);
      this.acc[0] = Math.min(0, this.acc[0]);
    }
  }

  bump() {
    // Пустой метод
  }
}
