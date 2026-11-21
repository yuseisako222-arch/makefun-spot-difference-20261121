import { newGame, selectSpot } from './game.js';
import { DIFFERENCES } from './scene.js';

const PLAY_FINDS = ['hideLantern', 'extraStar', 'swapFood'];

export function stageShot(name) {
  if (name === 'start') return { game: newGame(), now: 0 };
  if (name !== 'play' && name !== 'end') return null;

  const game = newGame(0);
  const finished = name === 'end';
  const now = finished ? 102000 : 36000;

  // Recreate the frame through the same selections used during play.
  selectSpot(game, 270, 420, 5000);
  if (finished) selectSpot(game, 224, 301, 28000);
  for (const spot of DIFFERENCES) {
    if (finished || PLAY_FINDS.includes(spot.id)) selectSpot(game, spot.x, spot.y, now);
  }
  return { game, now };
}
