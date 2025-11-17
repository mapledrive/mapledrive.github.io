/**
 * Рендерит свойства игрока (window.player) в левом столбце.
 */
export const renderPlayerInfo = () => {
  const ctx = window.ctx;
  ctx.fillStyle = 'white';
  ctx.font = '4px Arial';

  if (!window.player) {
    ctx.fillText('Player: null', 10, 20);
    return;
  }

  const player = window.player;
  let yOffset = 10;
  const lineHeight = 5;

  // ЛЕВЫЙ СТОЛБЕЦ - свойства игрока
  const properties = Object.getOwnPropertyNames(player)
    .filter(prop => {
      return !['constructor', 'prototype'].includes(prop);
    })
    .sort();

  const totalProperties = properties.length;

  // Сначала выводим общее количество свойств
  ctx.fillText(`Свойств: ${totalProperties} Block: ${Math.round((window.player?.pos[0] + 16) / 16 || 0)}`, 5, yOffset);
  yOffset += lineHeight;

  // Затем все свойства как обычно
  properties.forEach(prop => {
    try {
      const value = player[prop];
      let displayValue;

      if (value === null) {
        displayValue = 'null';
      } else if (value === undefined) {
        displayValue = 'undefined';
      } else if (typeof value === 'function') {
        displayValue = 'function';
      } else if (Array.isArray(value)) {
        displayValue = `[${value
          .map(v => {
            if (typeof v === 'number') return v.toFixed(2);
            return String(v);
          })
          .join(', ')}]`;
      } else if (typeof value === 'object') {
        if (prop === 'sprite' && value.pos && value.size) {
          displayValue = `sprite{pos:[${value.pos}], size:[${value.size}]}`;
        } else {
          displayValue = 'object';
        }
      } else if (typeof value === 'number') {
        displayValue = value.toFixed(2);
      } else if (typeof value === 'boolean') {
        displayValue = value.toString();
      } else {
        displayValue = String(value);
      }

      const line = `${prop}: ${displayValue}`;

      if (line.length > 50) {
        ctx.fillText(line.substring(0, 50) + '...', 5, yOffset);
      } else {
        ctx.fillText(line, 5, yOffset);
      }

      yOffset += lineHeight;

      if (yOffset > 240) {
        ctx.fillText('... (more properties)', 5, yOffset);
        return;
      }
    } catch (error) {
      ctx.fillText(`${prop}: <inaccessible>`, 5, yOffset);
      yOffset += lineHeight;
    }
  });
};

/**
 * Рендерит основную информацию Q-Learning и состояние нажатых клавиш
 * в правом верхнем столбце.
 */
export const renderKeyAndQLearningInfo = () => {
  if (!window.qLearning) return;

  const ctx = window.ctx;
  const ql = window.qLearning;
  let qlYOffset = 10;
  const qlX = 50; // Правый столбец
  const lineHeight = 5;

  ctx.fillStyle = 'white';
  ctx.font = '4px Arial';

  // Заголовок Q-learning
  ctx.fillText(`=== Q-LEARNING ===`, qlX, qlYOffset);
  qlYOffset += lineHeight;

  ctx.fillText(`Action (действие): ${ql.currentAction || 'none'}`, qlX, qlYOffset);
  qlYOffset += lineHeight;

  ctx.fillText(`Steps (шаги): ${ql.steps}`, qlX, qlYOffset);
  qlYOffset += lineHeight;

  ctx.fillText(`Episodes (эпизоды): ${ql.episodes}`, qlX, qlYOffset);
  qlYOffset += lineHeight;

  ctx.fillText(`States (состояния): ${Object.keys(ql.qTable).length}`, qlX, qlYOffset);
  qlYOffset += lineHeight;

  ctx.fillText(`Alpha (learning rate): ${ql.alpha.toFixed(2)}`, qlX, qlYOffset);
  qlYOffset += lineHeight;

  ctx.fillText(`Gamma (discount factor): ${ql.gamma.toFixed(2)}`, qlX, qlYOffset);
  qlYOffset += lineHeight;

  ctx.fillText(`Epsilon (exploration rate): ${(ql.epsilon * 100).toFixed(1)}%`, qlX, qlYOffset);
  qlYOffset += lineHeight;
  qlYOffset += lineHeight;
  qlYOffset += lineHeight;

  // Информация о нажатых кнопках
  qlYOffset += lineHeight;
  ctx.fillText('--- Нажатые клавиши ---', qlX, qlYOffset);
  qlYOffset += lineHeight;

  if (window.input) {
    ctx.fillText(`Left (влево): ${window.input.pressedKeys.LEFT || false}`, qlX, qlYOffset);
    qlYOffset += lineHeight;

    ctx.fillText(`Right (вправо): ${window.input.pressedKeys.RIGHT || false}`, qlX, qlYOffset);
    qlYOffset += lineHeight;

    ctx.fillText(`Up (вверх): ${window.input.pressedKeys.UP || false}`, qlX, qlYOffset);
    qlYOffset += lineHeight;

    ctx.fillText(`Down (вниз): ${window.input.pressedKeys.DOWN || false}`, qlX, qlYOffset);
    qlYOffset += lineHeight;

    ctx.fillText(`Run (бег): ${window.input.pressedKeys.RUN || false}`, qlX, qlYOffset);
    qlYOffset += lineHeight;

    ctx.fillText(`Jump (прыжок): ${window.input.pressedKeys.JUMP || false}`, qlX, qlYOffset);
    qlYOffset += lineHeight;

    ctx.fillText(`Training ${window.qLearning.training}`, qlX, qlYOffset);
    qlYOffset += lineHeight;
  }
};

export const renderQTable = () => {
  const ctx = window.ctx;
  if (!ctx) return;

  // Строгие проверки инициализации
  if (!window.qLearning || !window.qLearning.ALL_STATES || !window.qLearning.qTable) {
    return;
  }

  const ql = window.qLearning;
  const lineHeight = 4; // Высота строки, как в вашем примере
  const startY = 15; // Начало сверху

  // Координаты для четырех столбцов
  const COL_1_X = 110;
  const COL_2_X = 145;
  const COL_3_X = 180;
  const COL_4_X = 215;

  // Используем мелкий шрифт для компактности
  ctx.fillStyle = 'white';
  ctx.font = '4px Arial';

  // Используем общее количество состояний в ALL_STATES
  const totalStates = ql.ALL_STATES.length;
  if (totalStates === 0) return;

  // Максимальное количество строк на столбец (для первых трех столбцов)
  const MAX_ROWS_PER_COLUMN = 55;
  const MAX_Y = 220; // Максимальная Y-координата для избежания выхода за пределы экрана

  // --- Заголовок Q-таблицы ---
  ctx.fillText(
    `--- Q-TABLE (${totalStates}) ---     Current state (текущее состояние): ${ql.currentState || 0}          `,
    COL_1_X,
    startY - 7
  );

  // --- Рендеринг первого столбца (первые 50 состояний) ---
  let yOffset1 = startY;
  const endCol1 = Math.min(MAX_ROWS_PER_COLUMN, totalStates);

  for (let i = 0; i < endCol1; i++) {
    const stateIndex = i;
    const xCoord = ql.ALL_STATES[stateIndex];
    const qValues = ql.qTable[stateIndex] || [0, 0];

    // Подсветка текущего состояния
    if (stateIndex === ql.currentState) {
      ctx.fillStyle = '#90EE90'; // Светло-зеленый
    }

    // Форматируем Q-values (FORWARD: индекс 0, JUMP: индекс 1)
    const forwardQ = qValues[0].toFixed(2);
    const jumpQ = qValues[1].toFixed(2);

    // Отображение: X:25: F:0.50 J:1.23
    ctx.fillText(`${xCoord}: F:${forwardQ} J:${jumpQ}`, COL_1_X, yOffset1);
    yOffset1 += lineHeight;

    ctx.fillStyle = 'white'; // Возвращаем белый цвет
  }

  // --- Рендеринг второго столбца (следующие 50 состояний) ---
  let yOffset2 = startY;
  const startCol2 = MAX_ROWS_PER_COLUMN;
  const endCol2 = Math.min(MAX_ROWS_PER_COLUMN * 2, totalStates);

  for (let i = startCol2; i < endCol2; i++) {
    const stateIndex = i;
    const xCoord = ql.ALL_STATES[stateIndex];
    const qValues = ql.qTable[stateIndex] || [0, 0];

    // Подсветка текущего состояния
    if (stateIndex === ql.currentState) {
      ctx.fillStyle = '#90EE90';
    }

    const forwardQ = qValues[0].toFixed(2);
    const jumpQ = qValues[1].toFixed(2);

    ctx.fillText(`${xCoord}: F:${forwardQ} J:${jumpQ}`, COL_2_X, yOffset2);
    yOffset2 += lineHeight;

    ctx.fillStyle = 'white';
  }

  // --- Рендеринг третьего столбца (следующие 50 состояний) ---
  let yOffset3 = startY;
  const startCol3 = MAX_ROWS_PER_COLUMN * 2;
  const endCol3 = Math.min(MAX_ROWS_PER_COLUMN * 3, totalStates);

  for (let i = startCol3; i < endCol3; i++) {
    const stateIndex = i;
    const xCoord = ql.ALL_STATES[stateIndex];
    const qValues = ql.qTable[stateIndex] || [0, 0];

    // Подсветка текущего состояния
    if (stateIndex === ql.currentState) {
      ctx.fillStyle = '#90EE90';
    }

    const forwardQ = qValues[0].toFixed(2);
    const jumpQ = qValues[1].toFixed(2);

    ctx.fillText(`${xCoord}: F:${forwardQ} J:${jumpQ}`, COL_3_X, yOffset3);
    yOffset3 += lineHeight;

    ctx.fillStyle = 'white';
  }

  // --- Рендеринг четвертого столбца (все остальные состояния) ---
  let yOffset4 = startY;
  const startCol4 = MAX_ROWS_PER_COLUMN * 3;

  for (let i = startCol4; i < totalStates; i++) {
    const stateIndex = i;
    const xCoord = ql.ALL_STATES[stateIndex];
    const qValues = ql.qTable[stateIndex] || [0, 0];

    // Четвертый столбец не ограничен по высоте - просто рисуем пока не кончится экран
    if (yOffset4 > MAX_Y) {
      // Можно добавить индикатор что есть еще записи ниже
      // ctx.fillText('...', COL_4_X, yOffset4);
      // break;
    }

    // Подсветка текущего состояния
    if (stateIndex === ql.currentState) {
      ctx.fillStyle = '#90EE90';
    }

    const forwardQ = qValues[0].toFixed(2);
    const jumpQ = qValues[1].toFixed(2);

    ctx.fillText(`${xCoord}: F:${forwardQ} J:${jumpQ}`, COL_4_X, yOffset4);
    yOffset4 += lineHeight;

    ctx.fillStyle = 'white';
  }
};
