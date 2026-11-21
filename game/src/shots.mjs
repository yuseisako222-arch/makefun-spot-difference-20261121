import { DIFFERENCES } from './scene-data.mjs';
import { createGame, selectPoint } from './state.mjs';

const previewFinds = ['sign', 'star', 'tail'];

// Stage the previews through the ordinary scoring path with a fixed clock.
export function readShot(search) {
  const shot = new URLSearchParams(search).get('shot');
  if (shot === 'start') return { state: createGame(), now: 0 };
  if (shot !== 'play' && shot !== 'end') return null;

  const win = shot === 'end';
  const now = win ? 102_000 : 36_000;
  const state = createGame(0);
  selectPoint(state, 280, 285, 5_000);
  if (win) selectPoint(state, 395, 315, 19_000);
  for (const { id, x, y } of DIFFERENCES) {
    if (win || previewFinds.includes(id)) selectPoint(state, x, y, now);
  }
  return { state, now };
}
