import { Entity } from './entity.js';
import { gameState } from './gameState.js';

export class Floor extends Entity {
  constructor(pos, sprite) {
    super({
      pos: pos,
      sprite: sprite,
      hitbox: [0, 0, 16, 16],
    });
  }

  isCollideWith(ent) {
    //the first two elements of the hitbox array are an offset, so let's do this now.
    var hpos1 = [
      Math.floor(this.pos[0] + this.hitbox[0]),
      Math.floor(this.pos[1] + this.hitbox[1]),
    ];
    var hpos2 = [
      Math.floor(ent.pos[0] + ent.hitbox[0]),
      Math.floor(ent.pos[1] + ent.hitbox[1]),
    ];

    //if the hitboxes actually overlap
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
          //if the entity is over the block, it's basically floor
          var center = hpos2[0] + ent.hitbox[2] / 2;
          if (Math.abs(hpos2[1] + ent.hitbox[3] - hpos1[1]) <= ent.vel[1]) {
            if (
              gameState.level.statics[this.pos[1] / 16 - 1][this.pos[0] / 16]
            ) {
              return;
            }
            ent.vel[1] = 0;
            ent.pos[1] = hpos1[1] - ent.hitbox[3] - ent.hitbox[1];
            ent.standing = true;
            if (ent instanceof window.Mario.Player) {
              ent.jumping = 0;
            }
          } else if (
            Math.abs(hpos2[1] - hpos1[1] - this.hitbox[3]) > ent.vel[1] &&
            center + 2 >= hpos1[0] &&
            center - 2 <= hpos1[0] + this.hitbox[2]
          ) {
            //ent is under the block.
            ent.vel[1] = 0;
            ent.pos[1] = hpos1[1] + this.hitbox[3];
            if (ent instanceof window.Mario.Player) {
              this.bonk(ent.power);
              ent.jumping = 0;
            }
          } else {
            //entity is hitting it from the side, we're a wall
            ent.collideWall(this);
          }
        }
      }
    }
  }

  bonk() {}
}
