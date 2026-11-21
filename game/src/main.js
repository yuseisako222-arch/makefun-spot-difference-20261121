import { newGame, selectSpot, useHint } from './game.js';
import { bindInput } from './input.js';
import { createView } from './render.js';
import { DIFFERENCES } from './scene.js';
import { stageShot } from './shots.js';
import { playSound } from './sound.js';

function mountGame() {
  const view = createView();
  const shot = stageShot(new URLSearchParams(location.search).get('shot'));
  let game = shot?.game ?? newGame();
  let clock;
  let glowingHint;

  function drawRound(now) {
    view.setPhase(game.phase);
    view.drawStats(game, now);
    view.drawMarks(game);
  }

  drawRound(shot?.now ?? performance.now());
  if (shot) return;

  const isPlaying = () => game.phase === 'playing';

  function begin(fromKeyboard) {
    clearInterval(clock);
    glowingHint = undefined;
    const now = performance.now();
    game = newGame(now);
    view.resetEffects();
    drawRound(now);
    view.announce('Round started. Seven differences remaining.');
    if (fromKeyboard) view.panels[0].focus({ preventScroll: true });
    clock = setInterval(() => view.drawTime(game, performance.now()), 200);
  }

  function hint() {
    const spot = useHint(game);
    if (!spot) return;
    glowingHint = spot.id;
    view.drawStats(game, performance.now());
    view.showHint(spot);
    view.announce(`Hint. ${spot.detail}`);
    playSound('hint');
  }

  function select(panel, { x, y }) {
    const now = performance.now();
    const result = selectSpot(game, x, y, now);
    if (result.kind === 'miss') {
      view.drawStats(game, now);
      view.showMiss(panel, x, y);
      view.announce(`Miss. ${game.missed} total.`);
      playSound('miss');
    } else if (result.kind === 'found') {
      if (result.difference.id === glowingHint) view.clearHint();
      view.drawStats(game, now);
      view.drawMarks(game, result.difference.id);
      if (isPlaying()) {
        view.announce(`Found. ${DIFFERENCES.length - game.found.size} remaining.`);
        playSound('find');
      } else {
        clearInterval(clock);
        view.resetEffects();
        view.setPhase(game.phase);
        view.announce('You found all seven differences.');
        view.again.focus({ preventScroll: true });
        playSound('win');
      }
    }
  }

  bindInput(view, { begin, hint, select, isPlaying, canRestart: () => game.phase !== 'title' });
}

mountGame();
