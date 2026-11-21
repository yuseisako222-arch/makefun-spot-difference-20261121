import { DIFFERENCES, SCENE } from './scene-data.mjs';
import { drawBackdrop } from './backdrop.mjs';
import { drawStalls } from './stalls.mjs';
import { drawForeground } from './foreground.mjs';

function definitions(prefix) {
  const palette = {
    sky: ['#20243f', '#4a3b59', '#ba767d'],
    fuji: ['#79627e', '#4a405b'],
    moon: ['#fff2c5', '#f8c891'],
    ground: ['#6f5265', '#4b4156', '#39364d'],
    leftWall: ['#893f43', '#683146', '#352739'],
    rightWall: ['#435364', '#324050', '#272c3f'],
    leftRoof: ['#6f4659', '#30283f'],
    rightRoof: ['#506476', '#292b43'],
    clothLeft: ['#b95651', '#793744'],
    clothRight: ['#577e7a', '#355a62'],
    wood: ['#c07a59', '#814749', '#54303e'],
    lantern: ['#ffee99', '#f6a554', '#b84b42'],
  };
  const linear = Object.entries(palette).map(([name, colors]) => `<linearGradient id="${prefix}-${name}" x2="0" y2="1">
    ${colors.map((color, i) => `<stop offset="${i / (colors.length - 1)}" stop-color="${color}"/>`).join('')}
  </linearGradient>`).join('');
  return `<defs>${linear}
    <radialGradient id="${prefix}-moonGlow"><stop stop-color="#eda2a0" stop-opacity=".38"/><stop offset="1" stop-color="#eda2a0" stop-opacity="0"/></radialGradient>
    <radialGradient id="${prefix}-pavementGlow"><stop stop-color="#f4aa75" stop-opacity=".67"/><stop offset="1" stop-color="#dc8080" stop-opacity="0"/></radialGradient>
    <radialGradient id="${prefix}-counterGlow"><stop stop-color="#ffc778" stop-opacity=".8"/><stop offset="1" stop-color="#ef976c" stop-opacity="0"/></radialGradient>
    <radialGradient id="${prefix}-vignette" cx=".51" cy=".49" r=".68"><stop offset=".53" stop-color="#211a37" stop-opacity="0"/><stop offset="1" stop-color="#211a37" stop-opacity=".46"/></radialGradient>
    <pattern id="${prefix}-grain" width="17" height="19" patternUnits="userSpaceOnUse">
      <path d="M1 3h1m5 5h1m5 6h1m-9 4h1m10-17h1" stroke="#ffddd0" stroke-opacity=".16" stroke-width=".65"/>
      <path d="M4 6h1m7 5h1m-1 6h1m1-14h1m-14 9h1" stroke="#1c1633" stroke-opacity=".2" stroke-width=".7"/>
    </pattern>
  </defs>`;
}

export const VIEW_BOX = `0 0 ${SCENE.width} ${SCENE.height}`;
const allChanges = new Set(DIFFERENCES.map(({ id }) => id));
const noChanges = new Set();

// Every fixed detail goes through this shared drawing path. IDs are scoped per panel.
export function drawScene(prefix, changed = false) {
  const changes = changed ? allChanges : noChanges;
  const ref = name => `url(#${prefix}-${name})`;
  return `${definitions(prefix)}
    ${drawBackdrop(ref, changes)}
    ${drawStalls(ref, changes)}
    ${drawForeground(changes)}
    <rect width="${SCENE.width}" height="${SCENE.height}" fill="${ref('grain')}" pointer-events="none"/>
    <rect width="${SCENE.width}" height="${SCENE.height}" fill="${ref('vignette')}" pointer-events="none"/>
    <g class="markers" aria-hidden="true"></g>`;
}
