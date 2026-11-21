import { DIFFERENCES } from './scene.js';

export const HINT_LIMIT = 3;

export function newGame(now = null) {
  return {
    phase: now === null ? 'title' : 'playing',
    startedAt: now,
    finishedAt: null,
    found: new Set(),
    missed: 0,
    hinted: new Set(),
    hintsUsed: 0,
  };
}

export function elapsedSeconds(game, now) {
  if (game.startedAt === null) return 0;
  return Math.floor(((game.finishedAt ?? now) - game.startedAt) / 1000);
}

export function selectSpot(game, x, y, now) {
  if (game.phase !== 'playing') return { kind: 'inactive' };

  const difference = DIFFERENCES.find(spot => Math.hypot(x - spot.x, y - spot.y) <= spot.radius);
  if (!difference) {
    game.missed += 1;
    return { kind: 'miss' };
  }
  if (game.found.has(difference.id)) return { kind: 'repeat' };

  game.found.add(difference.id);
  if (game.found.size === DIFFERENCES.length) {
    game.finishedAt = now;
    game.phase = 'won';
  }
  return { kind: 'found', difference };
}

export function useHint(game) {
  if (game.phase !== 'playing' || game.hintsUsed >= HINT_LIMIT) return null;

  const unfound = DIFFERENCES.filter(spot => !game.found.has(spot.id));
  const hint = unfound.find(spot => !game.hinted.has(spot.id)) ?? unfound[0];
  game.hinted.add(hint.id);
  game.hintsUsed += 1;
  return hint;
}
