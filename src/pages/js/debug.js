/**
 * Debug information renderer
 */

export function renderDebugInfo(gameState, input) {
  const ctx = gameState.ctx;

  // Сохраняем текущую трансформацию
  const originalTransform = ctx.getTransform();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Отладочная информация
  ctx.fillStyle = '#fff';
  ctx.font = '12px Arial';

  const player = gameState.player;
  const lines = [
    `Position: ${Math.round(player.pos[0])}, ${Math.round(player.pos[1])}`,
    `Vel: ${player.vel[0].toFixed(2)}, ${player.vel[1].toFixed(2)}`,
    `Standing: ${player.standing}`,
    `Camera: ${Math.round(gameState.vX)}`,
    `Viewport: ${Math.floor(gameState.vX / 16)} - ${
      Math.floor(gameState.vX / 16) + 20
    }`,
    `Left: ${input.pressedKeys.LEFT}`,
    `Right: ${input.pressedKeys.RIGHT}`,
    `Up: ${input.pressedKeys.UP}`,
    `Down: ${input.pressedKeys.DOWN}`,
    `Run: ${input.pressedKeys.RUN}`,
    `Jump: ${input.pressedKeys.JUMP}`,
    `Power: ${player.power}`,
    `Jumping: ${player.jumping}`,
    `Crouching: ${player.crouching}`,
    `Invincibility: ${player.invincibility}`,
    `Fireballs: ${player.fireballs}`,
    `Dying: ${player.dying}`,
    `Piping: ${player.piping}`,
    `Exiting: ${player.exiting}`,
    `GameTime: ${gameState.gameTime.toFixed(1)}`,
  ];

  // Рендерим каждую строку
  lines.forEach((text, index) => {
    ctx.fillText(text, 10, 20 + index * 15);
  });

  // Восстанавливаем трансформацию
  ctx.setTransform(originalTransform);
}
