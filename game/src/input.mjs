export function bindInput(view, { start, restart, hint, select }) {
  view.controls.start.addEventListener('click', start);
  view.controls.again.addEventListener('click', start);
  view.controls.restart.addEventListener('click', restart);
  view.controls.hint.addEventListener('click', hint);

  view.panels.forEach((panel, index) => {
    panel.addEventListener('click', event => {
      const transform = panel.getScreenCTM();
      if (!transform) return;
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(transform.inverse());
      select(index, point.x, point.y);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key.toLowerCase();
    if (key === 'h') hint();
    if (key === 'r') restart();
  });
}
