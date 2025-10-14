// src/InputHandler.js

class InputHandler {
  constructor() {
    this.pressedKeys = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: false,
      RUN: false,
      JUMP: false,
    };
    document.addEventListener('keydown', e => this._handleKeyDown(e));
    document.addEventListener('keyup', e => this._handleKeyUp(e));
  }

  _getKeyFromEvent(event) {
    switch (event.code) {
      case 'ArrowLeft':
        return 'LEFT';
      case 'ArrowRight':
        return 'RIGHT';
      case 'ArrowUp':
        return 'UP';
      case 'ArrowDown':
        return 'DOWN';
      case 'KeyZ':
        return 'RUN';
      case 'KeyX':
        return 'JUMP';
      default:
        return null;
    }
  }

  _handleKeyDown(event) {
    const key = this._getKeyFromEvent(event);
    if (key) {
      this.pressedKeys[key] = true;
      console.log(this.pressedKeys);
      event.preventDefault();
    }
  }

  _handleKeyUp(event) {
    const key = this._getKeyFromEvent(event);
    if (key) {
      this.pressedKeys[key] = false;
      event.preventDefault();
    }
  }

  isDown(key) {
    return !!this.pressedKeys[key];
  }

  reset(keys = ['LEFT', 'RIGHT', 'UP', 'DOWN', 'RUN', 'JUMP']) {
    keys.forEach(k => {
      this.pressedKeys[k] = false;
    });
  }
}

const input = new InputHandler();

export default input;
