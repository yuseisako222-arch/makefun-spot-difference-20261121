import { bindInput } from './input.mjs';
import { createView } from './render.mjs';
import { readShot } from './shots.mjs';
import { createSound } from './sound.mjs';
import { createGame, remaining, selectPoint, useHint } from './state.mjs';

function play(view) {
  const sound = createSound();
  let state = createGame();
  let clock;

  function begin(message) {
    const now = performance.now();
    state = createGame(now);
    sound.unlock();
    view.resetFeedback();
    view.update(state, now);
    view.announce(message);
    clearInterval(clock);
    clock = setInterval(() => view.updateClock(state, performance.now()), 125);
  }

  bindInput(view, {
    start: () => begin('Game started. Seven differences remain.'),
    restart: () => begin('Game restarted. Seven differences remain.'),
    hint: () => {
      const target = useHint(state);
      if (!target) return;
      view.update(state, performance.now());
      view.showHint(target);
      view.announce(`Hint shown on both pictures. ${state.hintsLeft} left.`);
    },
    select: (index, x, y) => {
      const now = performance.now();
      const { type, difference } = selectPoint(state, x, y, now);
      if (type === 'ignored') return;
      view.update(state, now);
      if (type === 'miss') {
        view.showMiss(index, x, y);
        view.announce(`Miss. Total misses ${state.misses}.`);
        return;
      }
      view.clearHint(difference.id);
      const won = state.phase === 'won';
      sound.unlock();
      sound.chime(won);
      if (won) {
        clearInterval(clock);
        view.announce('All seven differences found.');
        view.controls.again.focus({ preventScroll: true });
      } else {
        view.announce(`Difference found. ${remaining(state)} remaining.`);
      }
    },
  });
  view.update(state, performance.now());
}

const view = createView(document);
const shot = readShot(location.search);
if (shot) view.update(shot.state, shot.now);
else play(view);
