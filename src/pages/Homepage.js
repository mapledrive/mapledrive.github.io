import React, { useState, useEffect, useRef } from 'react';
import { StyledSection, SectionTitle, SectionContent } from 'style';
import { Main, resources } from './js/main.js';

const Homepage = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await loadAllSprites();
        const canvas = canvasRef.current;
        const game = new Main(canvas, resources);
        gameRef.current = game;
        game.start();

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    init();

    return () => {
      if (gameRef.current) {
        gameRef.current.stop();
      }
    };
  }, []);

  return (
    <StyledSection>
      <SectionTitle>Super Mario Bros</SectionTitle>
      <SectionContent>
        Use the arrow keys [↑ → ↓ ←] to move Mario, and hold X button to jump
        higher. Use Z to shoot/run.
      </SectionContent>

      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        {error && <SectionContent>Error: {error}</SectionContent>}
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
      </div>
    </StyledSection>
  );
};

export { Homepage };

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
