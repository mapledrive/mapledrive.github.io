// src/InputHandler.js

class InputHandler {
  constructor() {
    this.pressedKeys = {};

    document.addEventListener('keydown', e => this._handleKeyDown(e));
    document.addEventListener('keyup', e => this._handleKeyUp(e));
    window.addEventListener('blur', () => this._handleBlur());
  }

  _getKeyFromEvent(event) {
    const code = event.keyCode || event.which;
    switch (code) {
      case 32:
        return 'SPACE';
      case 37:
        return 'LEFT';
      case 38:
        return 'UP';
      case 39:
        return 'RIGHT';
      case 40:
        return 'DOWN';
      case 90:
        return 'RUN'; // Z
      case 88:
        return 'JUMP'; // X
      default:
        return null;
    }
  }

  _handleKeyDown(event) {
    const key = this._getKeyFromEvent(event);
    if (key) {
      this.pressedKeys[key] = true;
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

  _handleBlur() {
    this.pressedKeys = {};
  }

  isDown(key) {
    return !!this.pressedKeys[key];
  }

  reset(keys = ['RUN', 'LEFT', 'RIGHT', 'DOWN', 'JUMP']) {
    keys.forEach(k => {
      this.pressedKeys[k] = false;
    });
  }
}

const input = new InputHandler();

// Только для отладки в dev-режиме
if (process.env.NODE_ENV === 'development') {
  window.input = input;
}

export { input, InputHandler };
