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

export function drawForeground(changes) {
  return `${cherryBranches()}${cat(changes.has('tail'))}`;
}
