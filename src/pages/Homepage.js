import React, { useState, useEffect, useRef } from 'react';
import { StyledSection, SectionTitle, SectionContent } from 'style';
import { Main, initializeGameGlobals } from 'features/game/main.js';

const Homepage = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [error, setError] = useState(null);
  const [explorationEnabled, setExplorationEnabled] = useState(true); // начальное значение true (0.3)
  const [isTraining, setIsTraining] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false); // по умолчанию звук выключен

  useEffect(() => {
    const init = async () => {
      try {
        initializeGameGlobals();
        await loadAllSprites();
        const canvas = canvasRef.current;
        const game = new Main(canvas);
        gameRef.current = game;
        game.start();
      } catch (err) {
        setError(err.message);
      }
    };

    init();

    return () => {
      if (gameRef.current) gameRef.current.stop();
    };
  }, []);

  const handleToggleExploration = () => {
    if (window.qLearning) {
      if (explorationEnabled) {
        // Выключаем exploration (ставим 0)
        window.qLearning.epsilon = 0;
      } else {
        // Включаем exploration (возвращаем 0.3)
        window.qLearning.epsilon = 0.3;
      }
      setExplorationEnabled(!explorationEnabled);
    }
  };

  const handleToggleTraining = () => {
    if (window.qLearning) {
      window.qLearning.training = !window.qLearning.training;
      setIsTraining(window.qLearning.training);
    }
  };

  const handleToggleSound = () => {
    if (window.sounds && window.music) {
      const newSoundState = !isSoundEnabled;

      // Переключаем звуки
      Object.values(window.sounds).forEach(sound => {
        sound.muted = !newSoundState;
      });

      // Переключаем музыку
      Object.values(window.music).forEach(track => {
        track.muted = !newSoundState;
      });

      setIsSoundEnabled(newSoundState);
    }
  };

  return (
    <StyledSection>
      <SectionTitle>Reinforcement Learning: Q-Learning</SectionTitle>
      <SectionContent>
        Use the arrow keys [↑ → ↓ ←] to move Mario, and hold X button to jump higher. Use Z to shoot/run.
        {error && <SectionContent>Error: {error}</SectionContent>}
      </SectionContent>

      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <canvas
          ref={canvasRef}
          width={762}
          height={720}
          style={{
            backgroundColor: '#7974FF',
            display: 'block',
            margin: '0 auto',
            width: '762px',
            height: '720px',
          }}
        />
        <button onClick={handleToggleExploration}>{explorationEnabled ? 'Disable Exploration' : 'Enable Exploration'}</button>
        <button onClick={handleToggleTraining}>{isTraining ? 'Случайные действия' : 'Лучшие действия'}</button>
        <button onClick={handleToggleSound}>{isSoundEnabled ? 'Выключить звук' : 'Включить звук'}</button>
      </div>
    </StyledSection>
  );
};

export { Homepage };

let resources = window.resources;

// Функция загрузки всех спрайтов
export const loadAllSprites = () => {
  return new Promise(resolve => {
    resources.load([
      '/sprites/player.png',
      '/sprites/enemy.png',
      '/sprites/tiles.png',
      '/sprites/playerl.png',
      '/sprites/items.png',
      '/sprites/enemyr.png',
    ]);

    // Ждем пока все ресурсы загрузятся
    const checkReady = () => {
      if (resources.isReady()) {
        resolve();
      } else {
        setTimeout(checkReady, 100);
      }
    };

    checkReady();
  });
};
