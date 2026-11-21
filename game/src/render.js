import { elapsedSeconds, HINT_LIMIT } from './game.js';
import { DIFFERENCES, drawScene, PANEL } from './scene.js';

const total = DIFFERENCES.length;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}

function foundRing(spot, fresh) {
  const { x, y } = spot;
  const radius = Math.min(spot.radius, 35) + 2;
  const sealX = x + radius * .72;
  const sealY = y - radius * .72;

  return `
    <g class="found-mark${fresh ? ' fresh' : ''}">
      <circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="#242c29" stroke-width="5" opacity=".86"/>
      <circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="#ffdd94" stroke-width="2.9"/>
      <circle cx="${sealX}" cy="${sealY}" r="7.5" fill="#ffdd94" stroke="#333d33" stroke-width="1.3"/>
      <path d="m${sealX - 3.2} ${sealY} 2.2 2.2 4.5-4.8" fill="none" stroke="#3e5342" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
}

export function createView() {
  const get = id => document.getElementById(id);
  const shell = get('lantern-lane');
  const phaseHeaders = {
    title: get('title-ticket'),
    playing: get('scoreboard'),
    won: get('win-ticket'),
  };
  const guideLead = get('guide-lead');
  const guideCopy = get('guide-copy');
  const [original, changed] = [get('original'), get('changed')];
  const panels = [original, changed];
  const [start, again, hint, restart] = ['start', 'again', 'hint', 'restart'].map(get);
  const [remaining, found, progress, timer, misses] = ['remaining', 'found', 'progress', 'timer', 'misses'].map(get);
  const [winSummary, tools, hintCount, announcement] = ['win-summary', 'tools', 'hint-count', 'announcement'].map(get);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const layers = new Map(panels.map(panel => [panel, {
    marks: panel.querySelector('.marks'),
    hint: panel.querySelector('.hint-layer'),
    miss: panel.querySelector('.miss-layer'),
    aim: panel.querySelector('.aim-layer'),
  }]));

  for (const panel of panels) {
    panel.setAttribute('viewBox', `0 0 ${PANEL.width} ${PANEL.height}`);
    panel.querySelector('.art').innerHTML = drawScene(panel.id, panel === changed ? DIFFERENCES : []);
  }

  function setPhase(phase) {
    shell.dataset.phase = phase;
    for (const [name, header] of Object.entries(phaseHeaders)) header.hidden = name !== phase;
    guideLead.textContent = phase === 'won' ? 'Market mystery solved.' : 'Look closely.';
    guideCopy.textContent = phase === 'won' ? 'All seven changes are marked on both pictures.' : 'Select a difference on either picture.';
    tools.hidden = phase !== 'playing';
    for (const panel of panels) panel.setAttribute('tabindex', phase === 'playing' ? '0' : '-1');
  }

  function drawTime(game, now) {
    timer.textContent = formatTime(elapsedSeconds(game, now));
  }

  function drawStats(game, now) {
    const count = game.found.size;
    remaining.textContent = total - count;
    found.firstChild.nodeValue = `${count} `;
    progress.innerHTML = DIFFERENCES.map((_, index) => `<span${index < count ? ' class="lit"' : ''}></span>`).join('');
    misses.textContent = game.missed;
    hintCount.textContent = HINT_LIMIT - game.hintsUsed;
    hint.disabled = game.hintsUsed >= HINT_LIMIT;
    drawTime(game, now);

    if (game.phase === 'won') {
      winSummary.textContent = `${formatTime(elapsedSeconds(game, now))} elapsed · ${game.missed} ${game.missed === 1 ? 'miss' : 'misses'}`;
    }
  }

  function drawMarks(game, freshId) {
    const rings = DIFFERENCES.filter(spot => game.found.has(spot.id))
      .map(spot => foundRing(spot, spot.id === freshId)).join('');
    for (const layer of layers.values()) layer.marks.innerHTML = rings;
  }

  function showHint({ x, y, radius }) {
    for (const layer of layers.values()) {
      layer.hint.innerHTML = `
        <g class="hint-mark">
          <circle cx="${x}" cy="${y}" r="${Math.min(radius, 35) + 5}" fill="#ffe2a5" fill-opacity=".22" stroke="#282d30" stroke-width="5"/>
          <circle cx="${x}" cy="${y}" r="${Math.min(radius, 35) + 5}" fill="none" stroke="#fff1c5" stroke-width="3" stroke-dasharray="4 5"/>
        </g>`;
    }
  }

  function clearHint() {
    for (const layer of layers.values()) layer.hint.replaceChildren();
  }

  function showMiss(panel, x, y) {
    layers.get(panel).miss.innerHTML = `
      <g class="miss-mark" transform="translate(${x} ${y})">
        <circle r="9" fill="#3b3035" opacity=".88"/>
        <path d="m-3-3 6 6m0-6-6 6" stroke="#fbd0ad" stroke-width="1.65" stroke-linecap="round"/>
      </g>`;
    if (!reduceMotion.matches) {
      panel.getAnimations().forEach(animation => animation.cancel());
      panel.animate([
        { transform: 'translateX(0)' }, { transform: 'translateX(-2px)' },
        { transform: 'translateX(2px)' }, { transform: 'translateX(0)' },
      ], { duration: 165, easing: 'ease-out' });
    }
  }

  function drawAim(panel, point) {
    layers.get(panel).aim.innerHTML = point ? `
      <g transform="translate(${point.x} ${point.y})" fill="none">
        <circle r="7" stroke="#282d30" stroke-width="3.5"/>
        <circle r="7" stroke="#fff5dd" stroke-width="1.6"/>
        <path d="M0-11v5m0 12v5m-11-11h5m12 0h5" stroke="#fff5dd" stroke-width="1.4"/>
      </g>` : '';
  }

  function resetEffects() {
    for (const [panel, layer] of layers) {
      panel.getAnimations().forEach(animation => animation.cancel());
      layer.hint.replaceChildren();
      layer.miss.replaceChildren();
      layer.aim.replaceChildren();
    }
  }

  return {
    panels, start, again, hint, restart, setPhase, drawTime, drawStats, drawMarks,
    showHint, clearHint, showMiss, drawAim, resetEffects,
    announce: message => { announcement.textContent = message; },
  };
}
