import React, { useEffect, useRef, useState } from 'react';
import { resources, loadAllSprites } from './Resources';
import { MarioGame } from './Other';

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

        const game = new MarioGame(canvas, resources);
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
    <div style={{ margin: '0 auto', textAlign: 'center' }}>
      {loading && (
        <div style={{ color: 'white', margin: '20px' }}>Загрузка игры...</div>
      )}
      {error && (
        <div style={{ color: 'red', margin: '20px' }}>Ошибка: {error}</div>
      )}
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
          border: '2px solid #333',
        }}
      />
    </div>
  );
};

export { Homepage };
