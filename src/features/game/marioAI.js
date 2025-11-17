export class QLearning {
  constructor() {
    this.alpha = 0.1; //   Learning Rate
    this.gamma = 0.9; //   Discount Factor
    this.epsilon = 0.3; // Exploration rate

    this.initializeQTable();

    this.actions = ['FORWARD', 'JUMP'];
    this.ACTION_INDICES = { FORWARD: 0, JUMP: 1 };

    this.currentState = null;
    this.currentAction = null;

    this.totalReward = 0;
    this.episodes = 0;

    this.training = true;
    this.steps = 0;

    // Флаг для предотвращения повторного вызова completeEpisode
    this.episodeCompleted = false;

    // Отслеживаем прыжки, которые могут привести к падению
    this.pendingJumpPenalty = null;
  }

  /**
   * Инициализация Q-table на основе window.ground
   * (Предполагается, что window.ground — это глобальный массив платформ).
   */
  initializeQTable() {
    const ground = window.ground;

    // Находим минимальную и максимальную X-координату среди всех платформ
    const minX = Math.min(...ground.flat());
    const maxX = Math.max(...ground.flat());

    // Создаем состояния для КАЖДОГО X-блока от minX до maxX
    this.ALL_STATES = [];
    for (let x = minX; x <= maxX; x++) {
      this.ALL_STATES.push(x);
    }

    this.TOTAL_STATES = this.ALL_STATES.length;
    this.MAX_X = maxX;
    // Индекс состояния для самой правой точки уровня
    this.GOAL_STATE = this.ALL_STATES.indexOf(this.MAX_X);

    // Определяем препятствия (промежутки между платформами)
    this.OBSTACLES = [];
    for (let i = 0; i < ground.length - 1; i++) {
      const currentPlatformEnd = ground[i][1];
      const nextPlatformStart = ground[i + 1][0];
      if (nextPlatformStart - currentPlatformEnd > 1) {
        // Запоминаем X-координаты ямы
        this.OBSTACLES.push([currentPlatformEnd, nextPlatformStart - 1]);
      }
    }

    // Определяем опасные зоны для прыжков
    this.DANGEROUS_JUMP_ZONES = this.calculateDangerousZones();

    // Инициализируем Q-table, используя нумерацию от 0 до TOTAL_STATES-1
    this.qTable = Array(this.TOTAL_STATES)
      .fill()
      .map(() => [0.0, 0.0]); // [FORWARD, JUMP] - начальные значения
  }

  // Вычисляем опасные зоны, где прыжок приводит к падению
  calculateDangerousZones() {
    const dangerousZones = [];

    // Для каждой ямы определяем, с каких позиций прыжок приведет к падению
    this.OBSTACLES.forEach(([holeStart, holeEnd]) => {
      // Предполагаем, что прыжок покрывает примерно 3-4 блока вперед
      const jumpDistance = 4;

      // Определяем опасные стартовые позиции для прыжка
      const dangerZoneStart = Math.max(0, holeStart - jumpDistance);
      const dangerZoneEnd = Math.max(0, holeEnd - jumpDistance - 1);

      if (dangerZoneStart <= dangerZoneEnd) {
        dangerousZones.push({
          hole: [holeStart, holeEnd],
          dangerZone: [dangerZoneStart, dangerZoneEnd],
          penaltyState: this.getStateIndex(holeStart), // Первый блок ямы
        });
      }
    });

    return dangerousZones;
  }

  // Проверяем, приведет ли прыжок из текущей позиции к падению
  willJumpCauseFall(stateIndex, action) {
    if (action !== 'JUMP' || stateIndex === -1) return false;

    const currentX = this.ALL_STATES[stateIndex];

    // Проверяем все опасные зоны
    for (const zone of this.DANGEROUS_JUMP_ZONES) {
      const [dangerStart, dangerEnd] = zone.dangerZone;
      if (currentX >= dangerStart && currentX <= dangerEnd) {
        return {
          willFall: true,
          penaltyState: zone.penaltyState,
          hole: zone.hole,
        };
      }
    }

    return { willFall: false };
  }

  // Получить индекс состояния по X-координате
  getStateIndex(x) {
    // Используем Map или прямое обращение, если ALL_STATES — это X-координаты по порядку
    return this.ALL_STATES.indexOf(x);
  }

  // Получить текущее состояние (индекс)
  getState() {
    // Используем window.player, который должен быть глобально доступен
    const playerX = Math.floor(window.player.pos[0] / 16);
    const stateIndex = this.getStateIndex(playerX);

    // Если X-координата не найдена в ALL_STATES (например, в яме),
    // возвращаем -1, чтобы сигнализировать о падении/неизвестном состоянии.
    return stateIndex !== -1 ? stateIndex : -1;
  }

  // Проверить, находится ли состояние в препятствии
  isInObstacle(stateIndex) {
    if (stateIndex === -1) return false;
    const x = this.ALL_STATES[stateIndex];

    // Проверяем, находится ли X-координата в диапазоне ямы
    return this.OBSTACLES.some(([start, end]) => x >= start && x <= end);
  }

  // Принимает решение, что делать в данном состоянии
  chooseAction(stateIndex) {
    if (stateIndex === -1 || stateIndex >= this.TOTAL_STATES) {
      return Math.random() < 0.5 ? 'FORWARD' : 'JUMP';
    }

    // Epsilon-Greedy: выбираем случайное действие (explore) или лучшее (exploit)
    if (Math.random() < this.epsilon && this.training) {
      return this.actions[Math.floor(Math.random() * this.actions.length)];
    } else {
      const [forwardValue, jumpValue] = this.qTable[stateIndex];
      return jumpValue > forwardValue ? 'JUMP' : 'FORWARD';
    }
  }

  // Проверяем, приведет ли ходьба из текущей позиции к падению в яму
  willWalkCauseFall(stateIndex, action) {
    if (action !== 'FORWARD' || stateIndex === -1) return false;

    const currentX = this.ALL_STATES[stateIndex];

    // Проверяем все ямы - если следующий блок это начало ямы
    for (const [holeStart, holeEnd] of this.OBSTACLES) {
      if (currentX === holeStart - 1) {
        return {
          willFall: true,
          penaltyState: this.getStateIndex(holeStart),
          hole: [holeStart, holeEnd],
        };
      }
    }

    return { willFall: false };
  }

  // Выполнить действие (эмулирует нажатие window.input)
  executeAction(action) {
    window.input.setKey('RIGHT', true);

    const player = window.player;

    if (action === 'JUMP' && player.standing && player.canJump && player.jumping === 0) {
      window.input.setKey('JUMP', true);

      // Проверяем, не опасный ли это прыжок
      const jumpCheck = this.willJumpCauseFall(this.currentState, action);
      if (jumpCheck.willFall) {
        this.pendingJumpPenalty = {
          state: this.currentState,
          action: action,
          penaltyState: jumpCheck.penaltyState,
          hole: jumpCheck.hole,
        };
        console.log(
          `ОПАСНЫЙ ПРЫЖОК! С блока ${this.ALL_STATES[this.currentState]} в яму [${jumpCheck.hole[0]}-${jumpCheck.hole[1]}]`
        );
      }
    } else if (action === 'FORWARD') {
      //шаг в яму
      const walkCheck = this.willWalkCauseFall(this.currentState, action);
      if (walkCheck.willFall) {
        this.pendingJumpPenalty = {
          state: this.currentState,
          action: action,
          penaltyState: walkCheck.penaltyState,
          hole: walkCheck.hole,
        };
        console.log(
          `ОПАСНАЯ ХОДЬБА! С блока ${this.ALL_STATES[this.currentState]} в яму [${walkCheck.hole[0]}-${walkCheck.hole[1]}]`
        );
      }
    } else if (!player.standing || player.jumping > 0) {
      window.input.setKey('JUMP', true); // Удержание прыжка, если уже летит
    } else {
      window.input.setKey('JUMP', false);
    }
  }

  /**
   * Получить награду для перехода из previousStateIndex в nextStateIndex
   */
  getReward(nextStateIndex, previousStateIndex) {
    if (previousStateIndex === -1) return 0;

    // Штраф за опасные действия (прыжки или шаг в яму)
    if (this.pendingJumpPenalty && this.pendingJumpPenalty.state === previousStateIndex) {
      const actionType = this.pendingJumpPenalty.action === 'JUMP' ? 'прыжок' : 'ходьбу';
      console.log(`ШТРАФ за опасную ${actionType} из позиции ${this.ALL_STATES[previousStateIndex]}`);
      this.pendingJumpPenalty = null;
      return -5;
    }

    // Маленькая награда за любое движение
    return 0.1;
  }

  // Обновить Q-таблицу
  updateQValue(stateIndex, action, reward, nextStateIndex) {
    if (stateIndex === -1 || stateIndex >= this.TOTAL_STATES) return;

    const actionIndex = this.ACTION_INDICES[action];
    const currentQ = this.qTable[stateIndex][actionIndex];

    let maxNextQ = 0;
    if (nextStateIndex !== -1 && nextStateIndex < this.TOTAL_STATES) {
      maxNextQ = Math.max(...this.qTable[nextStateIndex]);
    }

    const newQ = currentQ + this.alpha * (reward + this.gamma * maxNextQ - currentQ);

    this.qTable[stateIndex][actionIndex] = newQ;
  }

  // Основной шаг обучения (выбор действия)
  step() {
    if (this.episodeCompleted) return;

    const stateIndex = this.getState();

    // Принимаем решение ТОЛЬКО когда состояние изменилось
    if (stateIndex >= 0 && stateIndex !== this.currentState) {
      const action = this.chooseAction(stateIndex);
      this.currentState = stateIndex;
      this.currentAction = action;
      this.steps++; // Увеличиваем steps только при смене состояния
    }

    this.executeAction(this.currentAction);
  }

  // Обновление после шага (расчет награды и обновление Q-значения)
  update() {
    if (this.currentState === null || this.currentAction === null) return;
    if (this.episodeCompleted) return;

    const nextStateIndex = this.getState();

    // Обновляем Q-таблицу ТОЛЬКО когда состояние изменилось
    if (nextStateIndex !== this.currentState) {
      const reward = this.getReward(nextStateIndex, this.currentState);
      this.updateQValue(this.currentState, this.currentAction, reward, nextStateIndex);
      this.totalReward += reward;
    }

    this.checkPlayerDeath();
  }

  checkPlayerDeath() {
    if (!window.player || this.episodeCompleted) return;

    // Смерть от падения ниже экрана
    if (window.player.pos[1] > 240) {
      this.completeEpisode();
      return;
    }
  }

  // Завершение эпизода (вызывается только один раз)
  completeEpisode() {
    if (this.episodeCompleted) return;
    this.episodeCompleted = true; // Устанавливаем флаг ДО любой логики
    this.episodes++;

    if (this.epsilon > 0) {
      // плавно уменьшаем exploration rate если не ставили кнопкой в 0
      this.epsilon = Math.max(0.1, this.epsilon * 0.999);
    }
    window.input.reset();
    this.pendingJumpPenalty = null;
  }

  reset() {
    this.currentState = 0;
    this.currentAction = null;
    this.steps = 0;
    this.totalReward = 0;
    this.pendingJumpPenalty = null; // Сбрасываем ожидающий штраф
    this.episodeCompleted = false;
  }
}
