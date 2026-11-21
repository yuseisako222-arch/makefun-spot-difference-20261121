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

export function drawBackdrop(ref, changes) {
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
