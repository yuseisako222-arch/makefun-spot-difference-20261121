export const SCENE = { width: 560, height: 390 };

// Circles use the same coordinates as the SVG viewBox on both sides.
export const DIFFERENCES = [
  { id: 'lantern', x: 183, y: 211, radius: 30 },
  { id: 'sign', x: 111, y: 144, radius: 52 },
  { id: 'star', x: 348, y: 67, radius: 16 },
  { id: 'snack', x: 461, y: 271, radius: 27 },
  { id: 'tail', x: 324, y: 332, radius: 27 },
  { id: 'steam', x: 86, y: 250, radius: 19 },
  { id: 'noren', x: 488, y: 211, radius: 20 },
];

export function hitDifference(x, y) {
  return DIFFERENCES.find(({ x: cx, y: cy, radius }) => Math.hypot(x - cx, y - cy) <= radius);
}
