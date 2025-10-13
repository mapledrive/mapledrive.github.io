import React, { useEffect, useRef, useState } from 'react';
import { resources, loadAllSprites } from './mario/Resources';
import { Game } from './mario/Game';
import { StyledSection, SectionTitle, SectionContent } from 'style';

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
        console.log('Все спрайты загружены');

        const canvas = canvasRef.current;
        if (!canvas) {
          throw new Error('Canvas not found');
        }

        const game = new Game(canvas, resources);
        gameRef.current = game;
        game.start();

        setLoading(false);
      } catch (err) {
        console.error('Ошибка инициализации игры:', err);
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
        {loading && <SectionContent>Loading game...</SectionContent>}
        {error && <SectionContent>Error: {error}</SectionContent>}
        <canvas
          ref={canvasRef}
          width={762}
          height={720}
          style={{
            backgroundColor: '#000',
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
