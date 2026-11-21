import { DIFFERENCES, hitDifference } from './scene-data.mjs';

export const TOTAL = DIFFERENCES.length;
export const MAX_HINTS = 3;

export function createGame(startedAt = null) {
  return {
    phase: startedAt === null ? 'title' : 'playing',
    startedAt,
    finishedAt: null,
    found: new Set(),
    misses: 0,
    hintsLeft: MAX_HINTS,
    hinted: new Set(),
  };
}

export function remaining(state) {
  return TOTAL - state.found.size;
}

export function elapsedSeconds(state, now) {
  if (state.startedAt === null) return 0;
  return Math.floor(((state.finishedAt ?? now) - state.startedAt) / 1000);
}

export function selectPoint(state, x, y, now) {
  if (state.phase !== 'playing') return { type: 'ignored' };
  const difference = hitDifference(x, y);
  if (!difference) {
    state.misses += 1;
    return { type: 'miss' };
  }
  if (state.found.has(difference.id)) return { type: 'ignored' };
  state.found.add(difference.id);
  if (remaining(state) === 0) {
    state.phase = 'won';
    state.finishedAt = now;
  }
  return { type: 'found', difference };
}

export function useHint(state) {
  if (state.phase !== 'playing' || state.hintsLeft === 0) return null;
  const unfound = DIFFERENCES.filter(({ id }) => !state.found.has(id));
  const target = unfound.find(({ id }) => !state.hinted.has(id)) ?? unfound[0];
  state.hinted.add(target.id);
  state.hintsLeft -= 1;
  return target;
}
