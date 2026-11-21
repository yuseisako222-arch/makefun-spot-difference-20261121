import { backdropPaint, blossomBough, nightSky, pavedLane, printTexture, shrineGate } from './backdrop.js';
import { marketCat, sidewalkProps } from './foreground.js';
import { alleyStalls, dumplingStall, noodleStall, stallPaint } from './stalls.js';

export const PANEL = { width: 560, height: 448 };

export const DIFFERENCES = [
  { id: 'hideLantern', x: 180, y: 172, radius: 25, detail: 'The large noodle-stall lantern is missing.' },
  { id: 'greenSign', x: 80, y: 161, radius: 51, detail: 'The NOODLES sign changes from brick red to jade green.' },
  { id: 'extraStar', x: 347, y: 56, radius: 17, detail: 'An extra four-pointed star appears to the right of the moon.' },
  { id: 'swapFood', x: 431, y: 295, radius: 25, detail: 'Two gyoza replace the three-color dango skewer.' },
  { id: 'tailDown', x: 354, y: 376, radius: 30, detail: 'The cat curls its tail down instead of holding it up.' },
  { id: 'hideSteam', x: 147, y: 256, radius: 19, detail: 'One steam wisp disappears above the noodle bowl.' },
  { id: 'flowerCurtain', x: 478, y: 227, radius: 20, detail: 'A blossom replaces a wave on the noren curtain.' },
];

export function drawScene(id, differences = []) {
  const changes = Object.fromEntries(differences.map(({ id: change }) => [change, true]));
  // Panels share the drawing, with separate fragment IDs for each panel's paint servers.
  return `
    <defs>${backdropPaint(id)}${stallPaint(id)}</defs>
    ${nightSky(id, changes.extraStar)}
    ${shrineGate()}
    ${pavedLane(id)}
    ${alleyStalls(id)}
    ${noodleStall(id, changes)}
    ${dumplingStall(id, changes)}
    ${sidewalkProps()}
    ${marketCat(changes.tailDown)}
    ${blossomBough()}
    ${printTexture()}
  `;
}
