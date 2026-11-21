function paperLantern(x, y, scale, ref) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <circle r="28" fill="${ref('counterGlow')}" opacity=".8"/>
    <path d="M0-28v9m0 38v8m-3 0h6" fill="none" stroke="#703b3c" stroke-width="2" stroke-linecap="round"/>
    <path d="M-9-19h18v4H-9zm0 34h18v4H-9z" fill="#633540"/>
    <path d="M-9-16c-16 3-17 28 0 32H9c17-4 16-29 0-32z" fill="${ref('lantern')}" stroke="#823e40" stroke-width="1.4"/>
    <g fill="none" stroke="#bc6550" stroke-width=".8" opacity=".8">
      <path d="M-16-11q16 4 32 0m-35 7q19 4 38 0m-38 8q19 4 38 0m-35 7q16 4 32 0M-6-16q-11 16 0 32m12-32q11 16 0 32"/>
    </g>
    <path d="M0-8v17m-5-12h10m-7 7h4" fill="none" stroke="#8c4845" stroke-width="1.3" stroke-linecap="round"/>
  </g>`;
}

function roofTiles(right, ref) {
  // Both roofs use the same tile spacing. The slope mirrors at the lane.
  const ribs = Array.from({ length: 19 }, (_, i) => {
    const x = -20 + i * 12;
    return `<path d="M${x} ${104 + i * 1.4}q7 12 15 27l4 9"/>`;
  }).join('');
  return `<g${right ? ' transform="translate(560 4) scale(-1 1)"' : ''}>
    <path d="M0 102q102 2 197 25l22 36Q96 153 0 167Z" fill="${ref(right ? 'rightRoof' : 'leftRoof')}" stroke="#2d263e" stroke-width="2"/>
    <g fill="none" stroke="#b38389" stroke-width="1" opacity=".45">${ribs}</g>
    <path d="M0 117q101-1 204 23M0 133q101-4 214 22" fill="none" stroke="#28233a" stroke-width="1.5" opacity=".78"/>
    <path d="M0 102q96 0 197 24" fill="none" stroke="#ce9895" stroke-width="2" opacity=".79"/>
    <path d="M0 155q100-12 224 4l-1 9Q98 158 0 172Z" fill="#3c2a42" stroke="#2b243a" stroke-width="1.1"/>
    <path d="M0 157q101-12 222 4" fill="none" stroke="#e4a08c" stroke-width="1.4" opacity=".75"/>
    <path d="M0 168q102-13 222-1" fill="none" stroke="#a36571" opacity=".52"/>
  </g>`;
}

function sign(x, y, width, label, fill, trim) {
  return `<g transform="translate(${x} ${y})">
    <rect x="${-width / 2 - 1}" y="-15" width="${width + 2}" height="33" rx="4" fill="#302538" opacity=".8"/>
    <rect x="${-width / 2}" y="-16" width="${width}" height="31" rx="3" fill="${fill}" stroke="#e4a77f" stroke-width="1.45"/>
    <rect x="${-width / 2 + 4}" y="-12" width="${width - 8}" height="23" rx="1" fill="none" stroke="${trim}" stroke-width=".8"/>
    <path d="M${-width / 2 + 9} 0h2m${width - 22} 0h2" stroke="#f9d299" stroke-linecap="round"/>
    <text y="5" text-anchor="middle" fill="#ffe3ae" font-family="Georgia, serif" font-weight="bold" font-size="13" letter-spacing="1.7">${label}</text>
  </g>`;
}

function noren(x, y, widths, fill) {
  let offset = 0;
  const flaps = widths.map((width, i) => {
    const height = 44 + (i % 3) * 2;
    const flap = `<g transform="translate(${offset} 0)">
      <path d="M1 0h${width - 2}l-1 ${height - 3}Q${width / 2} ${height + 3} 2 ${height}Z" fill="${fill}" stroke="#2e293e" stroke-width=".7"/>
      <path d="M4 4v${height - 10}m${width - 8} ${4 - height}v${height - 11}" stroke="#f6c5a4" stroke-width=".7" opacity=".32"/>
      <path d="M4 ${height - 6}q${width / 2 - 4} 2 ${width - 8} 0" fill="none" stroke="#f6c5a4" stroke-width=".75" opacity=".6"/>
    </g>`;
    offset += width;
    return flap;
  }).join('');
  return `<g transform="translate(${x} ${y})">${flaps}
    <path d="M-4 1h${offset + 8}" stroke="#573343" stroke-linecap="round" stroke-width="4"/>
    <path d="M-4 .2h${offset + 8}" stroke="#da9776" stroke-linecap="round" stroke-width="1.2"/>
  </g>`;
}

function norenMotif(changed) {
  return `<g transform="translate(488 211)" fill="none" stroke="#f9d6a2" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3">
    ${changed ? `<path d="M0 1C-13-2-8-11-4-7-6-16 4-16 4-7 11-12 14-3 5 1c8 3 2 11-3 5-2 8-11 5-9-1Z"/><circle cy="1" r="2"/>`
      : `<path d="M-12 5q6 2 11-7 3-6 8-3 4 3 1 6-1 1-3 0 6 0 7 4M-12 9q5 2 11-3 4-3 8 0l5 3M-9 0l3-2m15-8 2 1"/>`}
  </g>`;
}

function noodleBowl(changes) {
  return `<g>
    <ellipse cx="69" cy="282" rx="38" ry="7" fill="#382737" opacity=".6"/>
    <path d="M40 269h57q-4 13-15 17H55q-10-3-15-17Z" fill="#d68d71" stroke="#462d3c" stroke-width="1.25"/>
    <path d="M43 275q25 9 50 0m-48 4q23 9 46 0" fill="none" stroke="#f6b982" stroke-width="1.25"/>
    <ellipse cx="69" cy="269" rx="29" ry="7" fill="#f4c48c" stroke="#7f4847" stroke-width="1.25"/>
    <ellipse cx="69" cy="269" rx="23.5" ry="4.8" fill="#b3644b"/>
    <path d="M51 269q5-5 9-1t8 0q5-4 13-.5m-26 2q5 3 11 1t10 0" fill="none" stroke="#ffdb93" stroke-width="1.2" stroke-linecap="round"/>
    <ellipse cx="78" cy="269" rx="5" ry="2.7" fill="#fff2c1"/><ellipse cx="79" cy="269" rx="2.4" ry="1.5" fill="#e9a94c"/>
    <path d="m85 267 4 2m-27-3 2-1m21 6 4-1" stroke="#759064" stroke-width="1.5" stroke-linecap="round"/>
    <path d="m47 267-9-20m15 20-4-21" stroke="#c78358" stroke-width="1.7" stroke-linecap="round"/>
    <g fill="none" stroke="#ffdfbe" stroke-width="2.1" stroke-linecap="round" opacity=".88">
      <path d="M62 259c-7-6 5-8 0-16-1-2-3-3-4-5"/>
      <path d="M72 256c-5-6 6-8 2-15l-2-3" opacity=".57"/>
      ${changes.has('steam') ? '' : '<path d="M86 259c-5-5 6-8 4-13-1-2-4-4-4-7"/>'}
    </g>
  </g>`;
}

function snack(gyoza) {
  return `<g transform="translate(461 271)">
    <ellipse cy="9" rx="23" ry="7" fill="#34293a" opacity=".57"/>
    <ellipse cy="5" rx="23" ry="7" fill="#647e77" stroke="#302e42" stroke-width="1.1"/>
    <ellipse cy="4.5" rx="19" ry="4.5" fill="#3f5c62" stroke="#b1a78c" stroke-width=".6"/>
    ${gyoza ? `<g fill="#f6cc91" stroke="#985d50" stroke-width="1.1" stroke-linejoin="round">
      <path d="M-17 4q1-4 5-11 2-3 4-1 3-2 5 2L1 4q-9 6-18 0Z"/>
      <path d="M0 4q2-4 6-12 2-2 4 0 3-1 5 3l3 8Q10 9 0 4Z"/>
      <path d="m-13 1 3-6m1 5 2-5m2 6 1-4M4 1l3-6m1 5 2-5m2 6 1-4" fill="none"/>
    </g>` : `<g transform="rotate(-9)">
      <path d="M-20 3h39" stroke="#d4935c" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="-9" cy=".5" r="5.7" fill="#eb9d9e" stroke="#9f5860"/>
      <circle cx="2" cy=".5" r="5.7" fill="#ffdfac" stroke="#ae785a"/>
      <circle cx="13" cy=".5" r="5.7" fill="#9faf70" stroke="#627d59"/>
      <path d="M-12-1q2-3 4-2M-1-1q2-3 4-2m7 2q2-3 4-2" fill="none" stroke="#fff3cc" stroke-width="1" opacity=".75"/>
    </g>`}
  </g>`;
}

function jars(x, y) {
  return `<g transform="translate(${x} ${y})" stroke="#443041" stroke-width="1.1">
    <path d="M1-16h12l2 5v11H0v-11Z" fill="#b45f53"/><path d="M2-18h10v4H2z" fill="#eca16c"/>
    <path d="M18-13h9l2 4v9H16v-9Z" fill="#749087"/><path d="M18-15h9v3h-9z" fill="#b6ab85"/>
    <path d="M3-10h8v6H3zm16 2h6v4h-6z" fill="#f3c794" stroke="none"/>
  </g>`;
}

export function drawStalls(ref, changes) {
  return `<g stroke-linejoin="round">
    <path d="M0 157h214l-15 132L0 345Z" fill="${ref('leftWall')}" stroke="#2a2438" stroke-width="2"/>
    <path d="M560 166 362 164l10 119 188 55Z" fill="${ref('rightWall')}" stroke="#28273d" stroke-width="2"/>
    <path d="M0 175l177-3v89L0 291Z" fill="#593544"/>
    <path d="M0 196h173v61L0 274Z" fill="#9c5c55" opacity=".61"/>
    <path d="M392 177 560 181v106l-168-30Z" fill="#3f4656"/>
    <path d="M395 200 560 204v62l-165-16Z" fill="#786061" opacity=".66"/>
    <ellipse cx="79" cy="244" rx="99" ry="58" fill="${ref('counterGlow')}" opacity=".52"/>
    <ellipse cx="499" cy="247" rx="109" ry="62" fill="${ref('counterGlow')}" opacity=".44"/>
    <g fill="none" stroke="#e1a17c" opacity=".5" stroke-width="1.2">
      <path d="M2 230l173-8M2 247l173-11M2 263l173-15m220-25 165 11m-165 2 165 12m-165 1 165 14"/>
      <path d="M14 166v95m15-91 1 87m121-87v78m18-75v74m235-74v78m15-78v79m111-75v89m16-87v89"/>
    </g>
    <path d="M0 275l200-24-1 38L0 345Z" fill="${ref('wood')}" stroke="#3f2b3d" stroke-width="1.5"/>
    <path d="m370 250 190 25v63l-188-55Z" fill="${ref('wood')}" stroke="#3b2e40" stroke-width="1.5"/>
    <g fill="none" stroke="#e0a283" opacity=".53">
      <path d="m0 303 198-40M0 319l198-48M0 333l198-54m173-19 189 40m-189-31 189 47m-189-40 189 53"/>
      <path d="m18 304 22-4m-16 18 30-7m62-12 30-8m288 6 26 7m35 1 38 7m-32 3 19 6" stroke-linecap="round"/>
    </g>
    <path d="m176 162 11 1-2 131-11 4zm24 0 10 2-6 127-10 4z" fill="${ref('wood')}" stroke="#492d40" stroke-width="1.2"/>
    <path d="m366 165 9 1 6 126-10-4zm20 3 10 1 1 127-10-4z" fill="${ref('wood')}" stroke="#382e43" stroke-width="1.2"/>
    <path d="m181 173-2 118m24-121-5 115m173-114 5 114m15-111 2 113" stroke="#efaa80" fill="none" opacity=".6"/>
    ${roofTiles(false, ref)}${roofTiles(true, ref)}
    ${sign(111, 144, 99, 'NOODLES', changes.has('sign') ? '#376f62' : '#a14842', changes.has('sign') ? '#8ab094' : '#d28369')}
    ${sign(458, 148, 109, 'DUMPLINGS', '#445c62', '#80938a')}
    ${noren(6, 181, [39, 42, 43, 41], ref('clothLeft'))}
    ${noren(408, 184, [34, 28, 35, 29, 26], ref('clothRight'))}
    <g stroke="#f8cd9c" stroke-width="1.1" fill="none" opacity=".84">
      <path d="M21 207q6-7 13 0m-13 4q6-7 13 0m-13 4q6-7 13 0m29-10h11m-12 4h13m-14 4h15m29 1h15m-14 0 4-10 4 10m-6-5h4m32-3q6 8 14 0m-13 7q6 7 12 0"/>
      <path d="M416 208q7-5 16 0m-15 5q7-5 14 0m18-10v16m-6-11h12m-12 6h12m58-13q9 3 1 9 11-1 10 7m17-13q6-4 12 0-6 10-12 0z"/>
    </g>
    ${norenMotif(changes.has('noren'))}
    <path d="M183 171v15m351-12v14m-509-17v11" stroke="#5e383f" stroke-width="1.4"/>
    ${changes.has('lantern') ? '' : paperLantern(183, 211, 1.02, ref)}
    ${paperLantern(27, 196, .54, ref)}${paperLantern(535, 200, .69, ref)}
    <path d="m0 276 159-23 17 5L0 298Zm560-1-161-23-16 6 177 38Z" fill="#b7755b" stroke="#552e3b" stroke-width="1.3"/>
    <path d="m0 290 176-32v5L0 299zm560 0-177-32v5l177 35Z" fill="#e7a67a" stroke="#744747" stroke-width="1.15"/>
    <path d="m0 293 174-33m386 33-175-33" stroke="#f1b888" opacity=".65"/>
    ${jars(120, 266)}${jars(498, 276)}
    ${noodleBowl(changes)}${snack(changes.has('snack'))}
    <path d="m4 309 48-10v16L4 326z" fill="#773e4a" stroke="#c17a69"/>
    <path d="m10 314 34-7m-33 12 25-6" stroke="#d49579" stroke-width="1.2" opacity=".69"/>
    <path d="m514 303 43 11v13l-43-12z" fill="#53465a" stroke="#ac7677"/>
    <path d="m520 308 31 8m-31-3 20 5" stroke="#d49579" stroke-width="1.2" opacity=".69"/>
  </g>`;
}
