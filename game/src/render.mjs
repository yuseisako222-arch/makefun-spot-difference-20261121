import { DIFFERENCES } from './scene-data.mjs';
import { drawScene, VIEW_BOX } from './scene.mjs';
import { elapsedSeconds, remaining, TOTAL } from './state.mjs';

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function foundMark({ x, y, radius }) {
  const badgeOffset = (radius * .707).toFixed(2);
  return `<g class="found-mark" transform="translate(${x} ${y})">
    <circle class="halo" r="${radius}"/><circle class="ring" r="${radius}"/>
    <g transform="translate(${badgeOffset} -${badgeOffset})">
      <circle class="badge" r="5.8"/><path class="tick" d="m-2.4 0 1.5 1.6L2.5-2"/>
    </g>
  </g>`;
}

export function createView(doc) {
  const root = doc.querySelector('.game');
  const byId = id => doc.getElementById(id);
  const panels = [byId('original'), byId('changed')];
  const controls = { start: byId('start'), again: byId('again'), hint: byId('hint'), restart: byId('restart') };
  const labels = Object.fromEntries([
    'remaining', 'found', 'time', 'misses', 'intro', 'result', 'result-details',
    'guidance', 'actions', 'hint-count', 'announcement',
  ].map(id => [id, byId(id)]));
  const markers = panels.map((panel, i) => {
    panel.setAttribute('viewBox', VIEW_BOX);
    panel.innerHTML = drawScene(panel.id, i === 1);
    const layer = panel.querySelector('.markers');
    layer.innerHTML = '<g class="found-layer"></g><g class="hint-layer"></g><g class="miss-layer"></g>';
    return {
      found: layer.querySelector('.found-layer'),
      hint: layer.querySelector('.hint-layer'),
      miss: layer.querySelector('.miss-layer'),
    };
  });

  function updateClock(state, now) {
    const display = formatTime(elapsedSeconds(state, now));
    if (labels.time.textContent !== display) labels.time.textContent = display;
  }

  function update(state, now) {
    const won = state.phase === 'won';
    const title = state.phase === 'title';
    root.dataset.phase = state.phase;
    labels.remaining.textContent = remaining(state);
    labels.found.innerHTML = `${state.found.size}<span>/${TOTAL}</span>`;
    labels.misses.textContent = state.misses;
    updateClock(state, now);
    labels.intro.hidden = !title;
    labels.result.hidden = !won;
    labels.guidance.hidden = won;
    labels.actions.hidden = won;
    controls.again.hidden = !won;
    controls.hint.disabled = title || state.hintsLeft === 0;
    labels['hint-count'].textContent = state.hintsLeft;
    if (won) {
      const missLabel = state.misses === 1 ? 'miss' : 'misses';
      labels['result-details'].textContent = `${labels.time.textContent} elapsed · ${state.misses} ${missLabel}`;
    }
    const rings = DIFFERENCES.filter(({ id }) => state.found.has(id)).map(foundMark).join('');
    for (const { found } of markers) found.innerHTML = rings;
  }

  function showMark(layer, markup) {
    layer.innerHTML = markup;
    const mark = layer.firstElementChild;
    mark.addEventListener('animationend', () => mark.remove(), { once: true });
  }

  function showHint({ id, x, y, radius }) {
    for (const { hint } of markers) {
      hint.dataset.target = id;
      showMark(hint, `<circle class="hint-mark" cx="${x}" cy="${y}" r="${radius + 3}"/>`);
    }
  }

  function clearHint(id) {
    for (const { hint } of markers) {
      if (!id || hint.dataset.target === id) hint.replaceChildren();
    }
  }

  function showMiss(panelIndex, x, y) {
    showMark(markers[panelIndex].miss, `<path class="miss-mark" transform="translate(${x} ${y})" d="m-5-5 10 10m0-10-10 10"/>`);
  }

  function resetFeedback() {
    clearHint();
    for (const { miss } of markers) miss.replaceChildren();
  }

  function announce(message) {
    labels.announcement.textContent = message;
  }

  return { panels, controls, update, updateClock, showHint, clearHint, showMiss, resetFeedback, announce };
}
