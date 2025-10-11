import { resources } from './Resources';

/**
 * Класс Sprite для анимаций
 */
export class Sprite {
  constructor(img, pos, size, speed, frames, once) {
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this._index = 0;
    this.img = img;
    this.once = once;
    this.frames = frames || [0];
    this.done = false;
    this.lastUpdated = null;
  }

  update(dt, gameTime) {
    if (gameTime && gameTime === this.lastUpdated) return;
    this._index += this.speed * dt;
    if (gameTime) this.lastUpdated = gameTime;
  }

  setFrame(frame) {
    this._index = frame;
  }

  render(ctx, posx, posy, vX, vY) {
    let frame;

    if (this.speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    const x = this.pos[0] + frame * this.size[0];
    const y = this.pos[1];

    const spriteImage = resources.get(this.img);
    if (!spriteImage) {
      // Отладочная отрисовка если спрайт не загружен
      ctx.fillStyle = 'red';
      ctx.fillRect(
        Math.round(posx - vX),
        Math.round(posy - vY),
        this.size[0],
        this.size[1]
      );
      return;
    }

    ctx.drawImage(
      spriteImage,
      x,
      y,
      this.size[0],
      this.size[1],
      Math.round(posx - vX),
      Math.round(posy - vY),
      this.size[0],
      this.size[1]
    );
  }
}
