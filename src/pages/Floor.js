import { Entity } from './Entity';
import { Player } from './Player';

/**
 * Класс Floor (пол/стены)
 */
export class Floor extends Entity {
  constructor(pos, sprite) {
    super({
      pos: pos,
      sprite: sprite,
      hitbox: [0, 0, 16, 16],
    });
    this.standing = true;
  }

  isCollideWith(ent) {
    // the first two elements of the hitbox array are an offset, so let's do this now.
    const hpos1 = [
      Math.floor(this.pos[0] + this.hitbox[0]),
      Math.floor(this.pos[1] + this.hitbox[1]),
    ];
    const hpos2 = [
      Math.floor(ent.pos[0] + ent.hitbox[0]),
      Math.floor(ent.pos[1] + ent.hitbox[1]),
    ];

    // if the hitboxes actually overlap
    if (
      !(
        hpos1[0] > hpos2[0] + ent.hitbox[2] ||
        hpos1[0] + this.hitbox[2] < hpos2[0]
      )
    ) {
      if (
        !(
          hpos1[1] > hpos2[1] + ent.hitbox[3] ||
          hpos1[1] + this.hitbox[3] < hpos2[1]
        )
      ) {
        if (!this.standing) {
          ent.bump();
        } else {
          // if the entity is over the block, it's basically floor
          const center = hpos2[0] + ent.hitbox[2] / 2;
          if (Math.abs(hpos2[1] + ent.hitbox[3] - hpos1[1]) <= ent.vel[1]) {
            // Упрощенная проверка на блок сверху (как в оригинале)
            ent.vel[1] = Math.min(0, ent.vel[1]); // Останавливаем падение
            ent.pos[1] = hpos1[1] - ent.hitbox[3] - ent.hitbox[1];
            ent.standing = true;
            if (ent instanceof Player) {
              ent.jumping = 0;
            }
          } else if (
            Math.abs(hpos2[1] - hpos1[1] - this.hitbox[3]) <=
              Math.abs(ent.vel[1]) &&
            center + 2 >= hpos1[0] &&
            center - 2 <= hpos1[0] + this.hitbox[2]
          ) {
            // ent is under the block.
            ent.vel[1] = Math.max(0, ent.vel[1]); // Останавливаем подъем
            ent.pos[1] = hpos1[1] + this.hitbox[3];
            if (ent instanceof Player) {
              this.bonk(ent.power);
              ent.jumping = 0;
            }
          } else {
            // entity is hitting it from the side, we're a wall
            ent.collideWall(this);
          }
        }
      }
    }
  }

  bonk() {}
}
