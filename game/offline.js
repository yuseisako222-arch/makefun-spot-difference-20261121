/* Generated from src/main.mjs and its imports for direct file opening.
   To rebuild the classic script: esbuild game/src/main.mjs --bundle --outfile=game/offline.js */
(() => {
  'use strict';

  // src/scene-data.mjs
  const scene_data = (() => {
    const SCENE = { width: 560, height: 390 };

    // Circles use the same coordinates as the SVG viewBox on both sides.
    const DIFFERENCES = [
      { id: 'lantern', x: 183, y: 211, radius: 30 },
      { id: 'sign', x: 111, y: 144, radius: 52 },
      { id: 'star', x: 348, y: 67, radius: 16 },
      { id: 'snack', x: 461, y: 271, radius: 27 },
      { id: 'tail', x: 324, y: 332, radius: 27 },
      { id: 'steam', x: 86, y: 250, radius: 19 },
      { id: 'noren', x: 488, y: 211, radius: 20 },
    ];

    function hitDifference(x, y) {
      return DIFFERENCES.find(({ x: cx, y: cy, radius }) => Math.hypot(x - cx, y - cy) <= radius);
    }

    return { SCENE, DIFFERENCES, hitDifference };
  })();

  // src/backdrop.mjs
  const backdrop = (() => {
    const stars = [
      [34, 45, 1], [51, 77, 1.8], [90, 35, 1.1], [119, 61, 1], [143, 27, 1.4],
      [160, 81, 1.3], [183, 46, 1.7], [217, 23, 1], [229, 62, 1.2], [250, 35, .8],
      [323, 31, .8], [390, 33, 1.3], [379, 75, .9], [409, 52, 1.7], [438, 76, 1],
      [455, 38, 1.2], [481, 59, .9], [516, 88, 1.5], [538, 44, 1.1],
    ];

    function sparkle(x, y, size) {
      return `<path transform="translate(${x} ${y}) scale(${size})" d="M0-8Q1-1 7 0Q1 1 0 8Q-1 1-7 0Q-1-1 0-8Z"/>`;
    }

    function skyline() {
      const buildings = [
        [174, 223, 37, 37], [208, 209, 28, 48], [230, 227, 25, 28], [252, 219, 31, 37],
        [287, 224, 28, 33], [309, 217, 35, 42], [342, 204, 29, 55], [363, 216, 41, 44],
      ];
      return buildings.map(([x, y, w, h], i) => `<g transform="translate(${x} ${y})">
        <path d="M0 5h${w}v${h}H0Z" fill="${i % 2 ? '#3c364d' : '#483953'}"/>
        <path d="m-4 7 ${w / 2 + 4}-14 ${w / 2 + 4} 14Z" fill="#2f2d45" stroke="#857084" stroke-width=".7"/>
        <path d="M5 15h${w - 10}m-${w - 10} 4h${w - 10}" stroke="#c98472" stroke-width=".7" opacity=".45"/>
        <path d="M${w * .32} 24v11m${w * .27} 0V23" stroke="#e8a969" stroke-width="2.4" opacity=".72"/>
      </g>`).join('');
    }

    function torii() {
      return `<g stroke-linejoin="round">
        <path d="M239 259l9-89 10 1-6 88zm66 0-7-89 10-1 10 90z" fill="#372a42" opacity=".65"/>
        <path d="m245 259 8-90h9l-6 90zm59 0-6-90h9l8 90z" fill="#994c53" stroke="#4d2f44" stroke-width="2"/>
        <path d="m251 252 7-78m50 78-6-78" stroke="#df8570" stroke-width="1" opacity=".75"/>
        <path d="M243 251h15l-1 9h-15zm59 0h14l1 9h-14z" fill="#383248"/>
        <path d="M244 192h73v8h-73z" fill="#9e4d52" stroke="#4a2d41" stroke-width="2"/>
        <path d="M247 193h67" stroke="#dc8d71" stroke-width="1.3"/>
        <path d="M274 174h12v18h-12z" fill="#704051" stroke="#442d43" stroke-width="1.1"/>
        <path d="M279 178h2m-2 4h2m-2 4h2" stroke="#efb080" stroke-linecap="round"/>
        <path d="M238 165q40 9 84 0l-4 9q-42 6-76 0z" fill="#b56462" stroke="#4a3145" stroke-width="1.2"/>
        <path d="M233 158q43 10 94 0l-3 8q-42 8-88 0z" fill="#4a334b" stroke="#392c43" stroke-width="1.4"/>
        <path d="M235 159q43 10 90 0" stroke="#d78c7b" stroke-width="1.2" fill="none"/>
      </g>`;
    }

    function tiledStreet(ref) {
      const rows = [253, 259, 268, 281, 300, 325, 356, 391];
      const tiles = rows.slice(1).map((bottom, row) => {
        const top = rows[row];
        const spread = y => 5 + (y - 253) * .29;
        const offset = row % 2 ? .5 : 0;
        return Array.from({ length: 82 }, (_, i) => i - 41).map(col => {
          const x = col + offset;
          const a = 280 + x * spread(top);
          const b = 280 + (x + 1) * spread(top);
          const c = 280 + (x + 1) * spread(bottom);
          const d = 280 + x * spread(bottom);
          if (Math.max(b, c) < 0 || Math.min(a, d) > 560) return '';
          const wash = (row * 41 + col * col * 13 + col * 53 + 4117) % 17;
          return `<path d="M${a.toFixed(1)} ${top}H${b.toFixed(1)}L${c.toFixed(1)} ${bottom}H${d.toFixed(1)}Z" fill="${wash < 7 ? '#f6a48d' : '#18263c'}" fill-opacity="${.055 + wash * .007}" stroke="#2c2a41" stroke-opacity=".56" stroke-width=".85"/>`;
        }).join('');
      }).join('');
      return `<path d="M0 251h560v139H0z" fill="${ref('ground')}"/>
        <path d="M0 330 245 254h14L135 390H0zm560-8-245-68h-13l125 136h133z" fill="#292d48" opacity=".43"/>
        ${tiles}
        <path d="M135 390 260 254m167 136L301 254M0 335l242-81m318 71-242-71" fill="none" stroke="#ab7e83" stroke-width="1" opacity=".45"/>
        <ellipse cx="178" cy="330" rx="151" ry="52" fill="${ref('pavementGlow')}" opacity=".52"/>
        <ellipse cx="463" cy="340" rx="138" ry="43" fill="${ref('pavementGlow')}" opacity=".33"/>
        <g fill="none" stroke-linecap="round" stroke="#e2a28d" opacity=".55">
          <path d="M172 306h13m2 1h4m-42 21h27m-50 6h10m62 15h35m-60 9h12m-60 12h25m250-44h13m15 8h28m-7 20h30m-102-44h7m10-17h8m-112-13h12"/>
          <path d="M255 291h11m-19 22h8m-15 6h21m-167 59h18m346-3h25m-67 7h13" stroke-width="2" opacity=".55"/>
        </g>`;
    }

    function drawBackdrop(ref, changes) {
      return `<path d="M0 0h560v390H0z" fill="${ref('sky')}"/>
        <ellipse cx="289" cy="72" rx="189" ry="132" fill="${ref('moonGlow')}"/>
        <g fill="#f8d6a6">
          ${stars.map(([x, y, radius]) => `<circle cx="${x}" cy="${y}" r="${radius}" opacity="${radius > 1.3 ? .85 : .55}"/>`).join('')}
          ${sparkle(160, 52, .53)}${sparkle(419, 27, .57)}${sparkle(231, 88, .38)}
          ${changes.has('star') ? sparkle(348, 67, 1.32) : ''}
        </g>
        <g fill="#e69d9b" opacity=".2">
          <path d="M20 102q48-16 97-9 25 6 55 3-28 10-75 7-37-3-77-1Z"/>
          <path d="M359 99q31-11 64-11 34 1 52 7 25 6 47 5-26 8-66 3-52-5-97-4Z"/>
          <path d="M182 111q25-6 48-2l37 3q-42 2-85-1Z"/>
        </g>
        <circle cx="290" cy="64" r="38" fill="none" stroke="#efc3a0" stroke-opacity=".28"/>
        <circle cx="290" cy="64" r="30.5" fill="${ref('moon')}"/>
        <g fill="#cf917b" opacity=".28">
          <path d="M274 46q8-8 19-6l-2 7-7 2-3 9-11 2-4-4zm16 22 11-4 9 6 1 8-9 7-11-1-5-6z"/>
          <circle cx="304" cy="53" r="3"/><circle cx="275" cy="75" r="4"/><circle cx="286" cy="86" r="2"/>
        </g>
        <path d="M0 164q46-32 92-36 41-7 88 10 45 18 79 34 59-13 109-39 50-25 93-12 51 15 99 41v104H0z" fill="#70576e"/>
        <path d="M103 187q62-19 103-48 15-9 33-32l7 2 9-5 12 3 11-2q26 30 53 45 41 26 116 40l-8 41H129Z" fill="${ref('fuji')}" stroke="#aa7682" stroke-width="1" stroke-linejoin="round"/>
        <path d="M205 140q19-13 34-33l7 2 9-5 12 3 11-2q12 15 27 28l-18-7 4 11-15-7-5 7-10-11-7 1-9 14-1-11-13 3-14 12 4-10Z" fill="#e7b6b3" opacity=".88"/>
        <path d="m220 153 22-12m25 2 20 18m16-19 17 11m-65-16-13 26" fill="none" stroke="#c28d9b" stroke-width="1" opacity=".6"/>
        <path d="M0 191q37-25 82-17 39 5 76-3 45-7 91 21 29 14 62 4 64-25 112-17 47 10 75-4 34-13 62-10v90H0z" fill="#494157"/>
        <path d="M0 218q61-20 112-13 51 10 88-5m115 16q52-19 98-11t147-13" fill="none" stroke="#bd8287" opacity=".39"/>
        ${skyline()}${tiledStreet(ref)}${torii()}
        <g fill="#ef9f65">
          <circle cx="216" cy="221" r="3"/><circle cx="231" cy="228" r="2"/><circle cx="330" cy="226" r="2.7"/><circle cx="347" cy="222" r="2.2"/>
        </g>
        <g fill="#ffe2a0"><circle cx="216" cy="221" r="1.3"/><circle cx="330" cy="226" r="1.1"/></g>`;
    }

    return { drawBackdrop };
  })();

  // src/stalls.mjs
  const stalls = (() => {
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

    function drawStalls(ref, changes) {
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

    return { drawStalls };
  })();

  // src/foreground.mjs
  const foreground = (() => {
    const blossomClusters = [
      [10, 29, 1.02], [28, 36, 1], [39, 18, .83], [52, 30, 1.16], [69, 41, .96], [81, 49, .9],
      [104, 51, .89], [116, 63, 1.04], [129, 55, .69], [150, 61, .76], [166, 53, .6], [183, 52, .55],
      [65, 13, .73], [88, 19, .89], [112, 12, .92], [122, 23, .78], [147, 31, .65], [160, 28, .77],
      [18, 66, .79], [43, 57, .73], [40, 76, .63], [56, 87, .59], [75, 80, .52],
      [414, 28, .62], [436, 36, .65], [459, 29, .87], [477, 23, .84], [493, 16, .93],
      [506, 36, .95], [521, 31, .64], [542, 26, 1], [553, 16, .9], [541, 51, .83], [513, 57, .61],
    ];

    function blossom(x, y, scale, index) {
      const colors = ['#da8b96', '#f1a3a5', '#e3848e', '#f6b8ae'];
      return `<g transform="translate(${x} ${y}) scale(${scale}) rotate(${index * 37})">
        <path d="M0-2c-7-8 7-12 5-3 8-6 12 6 3 7 8 5-3 13-7 5-3 9-13 3-8-4-10 2-8-10 0-8z" fill="${colors[index % colors.length]}" stroke="#8b5067" stroke-width="1"/>
        <path d="M0 1-2-4m2 5 4-4m-4 4 5 3m-5-3-3 5m3-5-5-1" stroke="#a95f73" stroke-width=".8" stroke-linecap="round"/>
        <circle cy="1" r="1.5" fill="#ffd4a5"/>
      </g>`;
    }

    function cherryBranches() {
      const petals = [
        [26, 94, -27], [102, 79, 26], [146, 83, -20], [190, 72, 38], [213, 115, 25], [395, 94, -33],
        [446, 65, 21], [483, 84, -34], [518, 75, 28], [215, 291, 14], [234, 321, -22], [376, 329, -27],
        [389, 360, 42], [269, 365, 16], [199, 377, -58], [472, 370, 42],
      ];
      return `<g fill="none" stroke-linecap="round">
        <path d="M-7 11C32 12 52 36 84 42s51 29 95 12M35 22Q74 3 130 20q18 6 31 8M16 17q-1 38 21 48t20 22m42-36 20-14M565 3q-33 3-63 20t-85 9m113-22q10 17-6 33t-12 14m-37-27-18-16" stroke="#35293f" stroke-width="6"/>
        <path d="M-7 13Q32 12 54 31t44 17q17 6 30 12M38 20q47-11 93 1M564 4q-36 5-60 19-21 10-55 12" stroke="#795268" stroke-width="1.6"/>
        ${blossomClusters.map(([x, y, scale], i) => blossom(x, y, scale, i)).join('')}
        ${petals.map(([x, y, rotation]) => `<path transform="translate(${x} ${y}) rotate(${rotation})" d="M0 0q-3-5 1-6 2 0 2 3 3-3 4 0 1 3-7 3Z" fill="#ed9c9c" opacity=".82"/>`).join('')}
      </g>`;
    }

    function cat(tailDown) {
      const tail = tailDown ? 'M305 335c8-1 13 8 23 9 7 1 13-2 12-7' : 'M305 335c11 1 14-5 15-13 1-9 9-13 15-7';
      return `<g>
        <ellipse cx="292" cy="350" rx="44" ry="8" fill="#2f2b40" opacity=".69"/>
        <path d="${tail}" fill="none" stroke="#302a3c" stroke-width="10" stroke-linecap="round"/>
        <path d="${tail}" fill="none" stroke="#ae6e56" stroke-width="6" stroke-linecap="round"/>
        <path d="M304 323q10 6 10 16-1 9-13 9h-23q-15 0-14-11 1-10 12-14 13-5 28 0Z" fill="#b6775a" stroke="#3d303f" stroke-width="2"/>
        <path d="M287 324q4 5 2 9m6-10q5 6 3 10m5-9q4 5 3 8" fill="none" stroke="#784b4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M278 335q9 5 4 10m16-8q7-2 7 4-1 4-9 4" fill="none" stroke="#7e4b47" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M255 321l-2-13 11 6q5-1 10 1l9-6-1 14q6 11-6 15h-13q-13-2-8-17Z" fill="#cb8b66" stroke="#3d303f" stroke-width="2" stroke-linejoin="round"/>
        <path d="m257 313 5 4-4 3zm23 1-4 4 4 3z" fill="#e8a193"/>
        <path d="M266 315l2 5m4-5-2 5" stroke="#93594e" stroke-width="1.35" stroke-linecap="round"/>
        <path d="M260 326q2-3 5 0m7 0q3-3 5 0" fill="none" stroke="#49333c" stroke-width="1.3" stroke-linecap="round"/>
        <path d="M262 331q4-3 7-1 3-2 7 1-2 5-7 5t-7-5Z" fill="#f3c28e"/>
        <path d="m267 330 2 2 2-2z" fill="#673c42"/>
        <path d="m261 331-9-2m9 4-9 1m24-3 9-2m-9 4 9 1" stroke="#ffe0af" stroke-width=".8" stroke-linecap="round"/>
        <path d="M265 338q7 3 14-1" stroke="#8f4650" stroke-width="2" fill="none"/>
        <circle cx="273" cy="341" r="1.9" fill="#edb36c"/>
      </g>`;
    }

    function drawForeground(changes) {
      return `${cherryBranches()}${cat(changes.has('tail'))}`;
    }

    return { drawForeground };
  })();

  // src/scene.mjs
  const scene = (() => {
    const { DIFFERENCES, SCENE } = scene_data;
    const { drawBackdrop } = backdrop;
    const { drawStalls } = stalls;
    const { drawForeground } = foreground;

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

    const VIEW_BOX = `0 0 ${SCENE.width} ${SCENE.height}`;
    const allChanges = new Set(DIFFERENCES.map(({ id }) => id));
    const noChanges = new Set();

    // Every fixed detail goes through this shared drawing path. IDs are scoped per panel.
    function drawScene(prefix, changed = false) {
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

    return { VIEW_BOX, drawScene };
  })();

  // src/state.mjs
  const state = (() => {
    const { DIFFERENCES, hitDifference } = scene_data;

    const TOTAL = DIFFERENCES.length;
    const MAX_HINTS = 3;

    function createGame(startedAt = null) {
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

    function remaining(state) {
      return TOTAL - state.found.size;
    }

    function elapsedSeconds(state, now) {
      if (state.startedAt === null) return 0;
      return Math.floor(((state.finishedAt ?? now) - state.startedAt) / 1000);
    }

    function selectPoint(state, x, y, now) {
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

    function useHint(state) {
      if (state.phase !== 'playing' || state.hintsLeft === 0) return null;
      const unfound = DIFFERENCES.filter(({ id }) => !state.found.has(id));
      const target = unfound.find(({ id }) => !state.hinted.has(id)) ?? unfound[0];
      state.hinted.add(target.id);
      state.hintsLeft -= 1;
      return target;
    }

    return { TOTAL, MAX_HINTS, createGame, remaining, elapsedSeconds, selectPoint, useHint };
  })();

  // src/shots.mjs
  const shots = (() => {
    const { DIFFERENCES } = scene_data;
    const { createGame, selectPoint } = state;

    const previewFinds = ['sign', 'star', 'tail'];

    // Stage the previews through the ordinary scoring path with a fixed clock.
    function readShot(search) {
      const shot = new URLSearchParams(search).get('shot');
      if (shot === 'start') return { state: createGame(), now: 0 };
      if (shot !== 'play' && shot !== 'end') return null;

      const win = shot === 'end';
      const now = win ? 102_000 : 36_000;
      const state = createGame(0);
      selectPoint(state, 280, 285, 5_000);
      if (win) selectPoint(state, 395, 315, 19_000);
      for (const { id, x, y } of DIFFERENCES) {
        if (win || previewFinds.includes(id)) selectPoint(state, x, y, now);
      }
      return { state, now };
    }

    return { readShot };
  })();

  // src/render.mjs
  const render = (() => {
    const { DIFFERENCES } = scene_data;
    const { drawScene, VIEW_BOX } = scene;
    const { elapsedSeconds, remaining, TOTAL } = state;

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

    function createView(doc) {
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

    return { createView };
  })();

  // src/input.mjs
  const input = (() => {
    function bindInput(view, { start, restart, hint, select }) {
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

    return { bindInput };
  })();

  // src/sound.mjs
  const sound = (() => {
    function createSound() {
      let audio;

      function unlock() {
        if (typeof AudioContext === 'undefined') return;
        audio ??= new AudioContext();
        if (audio.state === 'suspended') audio.resume().catch(() => {});
      }

      function chime(won) {
        if (!audio || audio.state === 'closed') return;
        const notes = won ? [523.25, 659.25, 783.99, 1046.5] : [659.25, 880];
        const now = audio.currentTime;
        notes.forEach((frequency, index) => {
          const start = now + index * .083;
          const tone = audio.createOscillator();
          const envelope = audio.createGain();
          tone.type = 'sine';
          tone.frequency.value = frequency;
          envelope.gain.setValueAtTime(.0001, start);
          envelope.gain.exponentialRampToValueAtTime(.075, start + .017);
          envelope.gain.exponentialRampToValueAtTime(.0001, start + .28);
          tone.connect(envelope).connect(audio.destination);
          tone.start(start);
          tone.stop(start + .29);
        });
      }

      return { unlock, chime };
    }

    return { createSound };
  })();

  // src/main.mjs
  (() => {
    const { bindInput } = input;
    const { createView } = render;
    const { readShot } = shots;
    const { createSound } = sound;
    const { createGame, remaining, selectPoint, useHint } = state;

    function play(view) {
      const sound = createSound();
      let state = createGame();
      let clock;

      function begin(message) {
        const now = performance.now();
        state = createGame(now);
        sound.unlock();
        view.resetFeedback();
        view.update(state, now);
        view.announce(message);
        clearInterval(clock);
        clock = setInterval(() => view.updateClock(state, performance.now()), 125);
      }

      bindInput(view, {
        start: () => begin('Game started. Seven differences remain.'),
        restart: () => begin('Game restarted. Seven differences remain.'),
        hint: () => {
          const target = useHint(state);
          if (!target) return;
          view.update(state, performance.now());
          view.showHint(target);
          view.announce(`Hint shown on both pictures. ${state.hintsLeft} left.`);
        },
        select: (index, x, y) => {
          const now = performance.now();
          const { type, difference } = selectPoint(state, x, y, now);
          if (type === 'ignored') return;
          view.update(state, now);
          if (type === 'miss') {
            view.showMiss(index, x, y);
            view.announce(`Miss. Total misses ${state.misses}.`);
            return;
          }
          view.clearHint(difference.id);
          const won = state.phase === 'won';
          sound.unlock();
          sound.chime(won);
          if (won) {
            clearInterval(clock);
            view.announce('All seven differences found.');
            view.controls.again.focus({ preventScroll: true });
          } else {
            view.announce(`Difference found. ${remaining(state)} remaining.`);
          }
        },
      });
      view.update(state, performance.now());
    }

    const view = createView(document);
    const shot = readShot(location.search);
    if (shot) view.update(shot.state, shot.now);
    else play(view);
  })();
})();
