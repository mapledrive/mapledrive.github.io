(function () {
  var pressedKeys = {};

  function setKey(event, status) {
    var code = event.keyCode;
    var key;

    switch (code) {
      case 37:
        key = 'LEFT';
        break;
      case 38:
        key = 'UP';
        break;
      case 39:
        key = 'RIGHT';
        break;
      case 40:
        key = 'DOWN';
        break;
      case 88:
        key = 'JUMP';
        break;
      case 90:
        key = 'RUN';
        break;
      default:
        return;
    }

    pressedKeys[key] = status;
  }

  document.addEventListener('keydown', function (e) {
    setKey(e, true);
  });

  document.addEventListener('keyup', function (e) {
    setKey(e, false);
  });

  window.input = {
    isDown: function (key) {
      return pressedKeys[key.toUpperCase()];
    },
    reset: function () {
      pressedKeys['LEFT'] = false;
      pressedKeys['RIGHT'] = false;
      pressedKeys['UP'] = false;
      pressedKeys['DOWN'] = false;
      pressedKeys['JUMP'] = false;
      pressedKeys['RUN'] = false;
    },
    pressedKeys: pressedKeys,
    setKey: (key, status) => (pressedKeys[key.toUpperCase()] = status),
  };
})();
