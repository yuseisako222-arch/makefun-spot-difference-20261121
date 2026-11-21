import { PANEL } from './scene.js';

const directions = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

function fit(value, limit) {
  return Math.max(0, Math.min(limit, value));
}

export function bindInput(view, actions) {
  const cursors = new Map();
  function resetAim() {
    cursors.clear();
  }

  function begin(fromKeyboard) {
    resetAim();
    actions.begin(fromKeyboard);
  }

  for (const button of [view.start, view.again, view.restart]) {
    button.addEventListener('click', event => begin(event.detail === 0));
  }
  view.hint.addEventListener('click', actions.hint);

  for (const panel of view.panels) {
    panel.addEventListener('click', event => {
      if (!actions.isPlaying()) return;
      // The SVG matrix follows the viewBox, scrolling, and viewport scaling.
      const point = new DOMPoint(event.clientX, event.clientY)
        .matrixTransform(panel.getScreenCTM().inverse());
      if (point.x >= 0 && point.x <= PANEL.width && point.y >= 0 && point.y <= PANEL.height) {
        view.drawAim(panel, null);
        actions.select(panel, point);
      }
    });

    panel.addEventListener('keydown', event => {
      if (!actions.isPlaying() || event.ctrlKey || event.altKey || event.metaKey) return;
      const step = directions[event.key];
      if (!step && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();

      const point = cursors.get(panel) ?? { x: PANEL.width / 2, y: PANEL.height / 2 };
      if (step) {
        const speed = event.shiftKey ? 24 : 8;
        point.x = fit(point.x + speed * step[0], PANEL.width);
        point.y = fit(point.y + speed * step[1], PANEL.height);
      }
      cursors.set(panel, point);
      view.drawAim(panel, point);
      if (!step && !event.repeat) actions.select(panel, point);
    });

    panel.addEventListener('blur', () => view.drawAim(panel, null));
  }

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;

    const key = event.key.toLowerCase();
    if (key === 'h' && actions.isPlaying()) {
      event.preventDefault();
      actions.hint();
    } else if (key === 'r' && actions.canRestart()) {
      event.preventDefault();
      begin(true);
    }
  });
}
