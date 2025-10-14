// import { Player } from './Player';

// class Pipe {
//   constructor(options) {
//     this.pos = options.pos;
//     this.direction = options.direction;
//     this.destination = options.destination;
//     this.length = options.length;

//     if (this.direction === 'UP' || this.direction === 'DOWN') {
//       this.hitbox = [0, 0, 32, this.length * 16];
//       this.midsection = window.level.pipeUpMid;
//       this.endsection = window.level.pipeTop;
//     } else {
//       this.hitbox = [0, 0, 16 * this.length, 32];
//       this.midsection = window.level.pipeSideMid;
//       this.endsection = window.level.pipeLeft;
//     }
//   }

//   checkPipe() {
//     // if (this.destination === undefined || !window.input.isDown(this.direction))
//     //   return;
//     // const h = player.power === 0 ? 16 : 32;
//     // const x = Math.floor(player.pos[0]);
//     // const y = Math.floor(player.pos[1]);
//     // switch (this.direction) {
//     //   case 'RIGHT':
//     //     if (
//     //       x === this.pos[0] - 16 &&
//     //       y >= this.pos[1] &&
//     //       y + h <= this.pos[1] + 32
//     //     ) {
//     //       player.pipe(this.direction, this.destination);
//     //     }
//     //     break;
//     //   case 'LEFT':
//     //     if (
//     //       x === this.pos[0] + 16 * this.length &&
//     //       y >= this.pos[1] &&
//     //       y + h <= this.pos[1] + 32
//     //     ) {
//     //       player.pipe(this.direction, this.destination);
//     //     }
//     //     break;
//     //   case 'UP':
//     //     if (
//     //       y === this.pos[1] + 16 * this.length &&
//     //       x >= this.pos[0] &&
//     //       x + 16 <= this.pos[0] + 32
//     //     ) {
//     //       player.pipe(this.direction, this.destination);
//     //     }
//     //     break;
//     //   case 'DOWN':
//     //     if (
//     //       y + h === this.pos[1] &&
//     //       x >= this.pos[0] &&
//     //       x + 16 <= this.pos[0] + 32
//     //     ) {
//     //       player.pipe(this.direction, this.destination);
//     //     }
//     //     break;
//     // }
//   }

//   checkCollisions() {
//     // level.enemies.forEach(ent => {
//     //   this.isCollideWith(ent);
//     // });
//     // level.items.forEach(ent => {
//     //   this.isCollideWith(ent);
//     // });
//     // fireballs.forEach(ent => {
//     //   this.isCollideWith(ent);
//     // });
//     // if (!player.piping) this.isCollideWith(player);
//   }

//   isCollideWith(ent) {
//     if (ent.pos === undefined) return;

//     const hpos1 = [
//       Math.floor(this.pos[0] + this.hitbox[0]),
//       Math.floor(this.pos[1] + this.hitbox[1]),
//     ];
//     const hpos2 = [
//       Math.floor(ent.pos[0] + ent.hitbox[0]),
//       Math.floor(ent.pos[1] + ent.hitbox[1]),
//     ];

//     if (
//       !(
//         hpos1[0] > hpos2[0] + ent.hitbox[2] ||
//         hpos1[0] + this.hitbox[2] < hpos2[0]
//       )
//     ) {
//       if (
//         !(
//           hpos1[1] > hpos2[1] + ent.hitbox[3] ||
//           hpos1[1] + this.hitbox[3] < hpos2[1]
//         )
//       ) {
//         const center = hpos2[0] + ent.hitbox[2] / 2;
//         if (Math.abs(hpos2[1] + ent.hitbox[3] - hpos1[1]) <= ent.vel[1]) {
//           ent.vel[1] = 0;
//           ent.pos[1] = hpos1[1] - ent.hitbox[3] - ent.hitbox[1];
//           ent.standing = true;
//           if (ent instanceof Player) {
//             ent.jumping = 0;
//           }
//         } else if (
//           Math.abs(hpos2[1] - hpos1[1] - this.hitbox[3]) > ent.vel[1] &&
//           center + 2 >= hpos1[0] &&
//           center - 2 <= hpos1[0] + this.hitbox[2]
//         ) {
//           ent.vel[1] = 0;
//           ent.pos[1] = hpos1[1] + this.hitbox[3];
//           if (ent instanceof Player) {
//             ent.jumping = 0;
//           }
//         } else {
//           ent.collideWall(this);
//         }
//       }
//     }
//   }

//   update(dt) {
//     if (this.destination) this.checkPipe();
//   }

//   render(ctx, vX, vY) {
//     switch (this.direction) {
//       case 'DOWN':
//         this.endsection.render(ctx, this.pos[0], this.pos[1], vX, vY);
//         for (let i = 1; i < this.length; i++) {
//           this.midsection.render(
//             ctx,
//             this.pos[0],
//             this.pos[1] + i * 16,
//             vX,
//             vY
//           );
//         }
//         break;
//       case 'UP':
//         this.endsection.render(
//           ctx,
//           this.pos[0],
//           this.pos[1] + 16 * (this.length - 1),
//           vX,
//           vY
//         );
//         for (let i = 0; i < this.length - 1; i++) {
//           this.midsection.render(
//             ctx,
//             this.pos[0],
//             this.pos[1] + i * 16,
//             vX,
//             vY
//           );
//         }
//         break;
//       case 'RIGHT':
//         // this.endsection.render(ctx, this.pos[0], this.pos[1], vX, vY);
//         // for (let i = 1; i < this.length; i++) {
//         //   this.midsection.render(
//         //     ctx,
//         //     this.pos[0] + 16 * i,
//         //     this.pos[1],
//         //     vX,
//         //     vY
//         //   );
//         // }
//         break;
//       case 'LEFT':
//         this.endsection.render(
//           ctx,
//           this.pos[0] + 16 * (this.length - 1),
//           this.pos[1],
//           vX,
//           vY
//         );
//         for (let i = 0; i < this.length - 1; i++) {
//           this.midsection.render(
//             ctx,
//             this.pos[0],
//             this.pos[1] + i * 16,
//             vX,
//             vY
//           );
//         }
//         break;
//       default:
//         console.log(`Sorry, we are out of power`);
//     }
//   }
// }

// // Только для отладки в dev-режиме
// if (process.env.NODE_ENV === 'development') {
//   window.pipe = Pipe;
// }

// export { Pipe };
