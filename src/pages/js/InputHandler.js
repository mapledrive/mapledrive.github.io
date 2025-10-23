// src/InputHandler.js
// Подчеркивание в _setupGamepadListeners(), _handleKeyDown() говорит:
// Эти методы вызываются только внутри класса InputHandler, не трогай их снаружи

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

    this.controllers = {};
    this.gamepadConnected = false;

    // Keyboard event listeners
    document.addEventListener('keydown', e => this._handleKeyDown(e));
    document.addEventListener('keyup', e => this._handleKeyUp(e));

    // Gamepad event listeners
    this._setupGamepadListeners();

    // Start gamepad polling
    this._startGamepadPolling();
  }

  _setupGamepadListeners() {
    if ('GamepadEvent' in window) {
      window.addEventListener('gamepadconnected', e => {
        this.gamepadConnected = true;
        this.controllers[e.gamepad.index] = e.gamepad;
      });

      window.addEventListener('gamepaddisconnected', e => {
        delete this.controllers[e.gamepad.index];
        this.gamepadConnected = Object.keys(this.controllers).length > 0;
      });
    }
  }

  _startGamepadPolling() {
    const pollGamepads = () => {
      this._updateGamepadState();
      requestAnimationFrame(pollGamepads);
    };
    pollGamepads();
  }

  _updateGamepadState() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    // Reset gamepad inputs before updating
    const gamepadKeys = ['LEFT', 'RIGHT', 'UP', 'DOWN', 'RUN', 'JUMP'];
    gamepadKeys.forEach(key => {
      if (this.pressedKeys[key] === 'GAMEPAD') {
        this.pressedKeys[key] = false;
      }
    });

    // Update from all connected gamepads
    for (let i = 0; i < gamepads.length; i++) {
      const gamepad = gamepads[i];
      if (gamepad && gamepad.connected) {
        this._processGamepadInput(gamepad);
      }
    }
  }

  _processGamepadInput(gamepad) {
    // D-Pad mapping (standard gamepad layout)
    const BUTTON_MAPPING = {
      LEFT: 14, // D-Pad Left
      RIGHT: 15, // D-Pad Right
      UP: 12, // D-Pad Up
      DOWN: 13, // D-Pad Down
      RUN: 0, // A button
      JUMP: 1, // B button
    };

    // Process each button
    Object.keys(BUTTON_MAPPING).forEach(key => {
      const buttonIndex = BUTTON_MAPPING[key];
      if (buttonIndex < gamepad.buttons.length) {
        const button = gamepad.buttons[buttonIndex];
        const pressed =
          typeof button === 'object' ? button.pressed : button > 0.5;

        if (pressed) {
          this.pressedKeys[key] = 'GAMEPAD';
        }
      }
    });

    // Process analog sticks as fallback for D-Pad
    this._processAnalogSticks(gamepad);
  }

  _processAnalogSticks(gamepad) {
    // Left analog stick (axes 0 and 1)
    if (gamepad.axes.length >= 2) {
      const leftStickX = gamepad.axes[0];
      const leftStickY = gamepad.axes[1];

      // Dead zone to prevent drift
      const deadZone = 0.3;

      if (leftStickX < -deadZone && !this.pressedKeys.LEFT) {
        this.pressedKeys.LEFT = 'GAMEPAD';
      }
      if (leftStickX > deadZone && !this.pressedKeys.RIGHT) {
        this.pressedKeys.RIGHT = 'GAMEPAD';
      }
      if (leftStickY < -deadZone && !this.pressedKeys.UP) {
        this.pressedKeys.UP = 'GAMEPAD';
      }
      if (leftStickY > deadZone && !this.pressedKeys.DOWN) {
        this.pressedKeys.DOWN = 'GAMEPAD';
      }
    }
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
    if (key && this.pressedKeys[key] !== 'GAMEPAD') {
      this.pressedKeys[key] = 'KEYBOARD';
      event.preventDefault();
    }
  }

  _handleKeyUp(event) {
    const key = this._getKeyFromEvent(event);
    if (key && this.pressedKeys[key] === 'KEYBOARD') {
      this.pressedKeys[key] = false;
      event.preventDefault();
    }
  }

  isDown(key) {
    return !!this.pressedKeys[key];
  }

  getInputSource(key) {
    return this.pressedKeys[key];
  }

  isKeyboardDown(key) {
    return this.pressedKeys[key] === 'KEYBOARD';
  }

  isGamepadDown(key) {
    return this.pressedKeys[key] === 'GAMEPAD';
  }

  reset(keys = ['LEFT', 'RIGHT', 'UP', 'DOWN', 'RUN', 'JUMP']) {
    keys.forEach(k => {
      this.pressedKeys[k] = false;
    });
  }

  // Method to check if any gamepad is connected
  isGamepadConnected() {
    return this.gamepadConnected;
  }

  // Method to get active input sources for debugging
  getActiveInputs() {
    const active = {};
    Object.keys(this.pressedKeys).forEach(key => {
      if (this.pressedKeys[key]) {
        active[key] = this.pressedKeys[key];
      }
    });
    return active;
  }
}

const input = new InputHandler();

export default input;

// old but robust simple version of input for keyboard
// class InputHandler {
//   constructor() {
//     this.pressedKeys = {
//       LEFT: false,
//       RIGHT: false,
//       UP: false,
//       DOWN: false,
//       RUN: false,
//       JUMP: false,
//     };
//     document.addEventListener('keydown', e => this._handleKeyDown(e));
//     document.addEventListener('keyup', e => this._handleKeyUp(e));
//   }

//   _getKeyFromEvent(event) {
//     switch (event.code) {
//       case 'ArrowLeft':
//         return 'LEFT';
//       case 'ArrowRight':
//         return 'RIGHT';
//       case 'ArrowUp':
//         return 'UP';
//       case 'ArrowDown':
//         return 'DOWN';
//       case 'KeyZ':
//         return 'RUN';
//       case 'KeyX':
//         return 'JUMP';
//       default:
//         return null;
//     }
//   }

//   _handleKeyDown(event) {
//     const key = this._getKeyFromEvent(event);
//     if (key) {
//       this.pressedKeys[key] = true;
//       event.preventDefault();
//     }
//   }

//   _handleKeyUp(event) {
//     const key = this._getKeyFromEvent(event);
//     if (key) {
//       this.pressedKeys[key] = false;
//       event.preventDefault();
//     }
//   }

//   isDown(key) {
//     return !!this.pressedKeys[key];
//   }

//   reset(keys = ['LEFT', 'RIGHT', 'UP', 'DOWN', 'RUN', 'JUMP']) {
//     keys.forEach(k => {
//       this.pressedKeys[k] = false;
//     });
//   }
// }

// const input = new InputHandler();

// export default input;
