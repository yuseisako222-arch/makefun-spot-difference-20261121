export function stallPaint(id) {
  return `
    <radialGradient id="${id}-halo">
      <stop stop-color="#f5ab57" stop-opacity=".50"/><stop offset="1" stop-color="#fa9b62" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-lantern">
      <stop stop-color="#c65c43"/><stop offset=".42" stop-color="#ffd982"/><stop offset=".67" stop-color="#ffbd6c"/><stop offset="1" stop-color="#bc5046"/>
    </linearGradient>
    <linearGradient id="${id}-noodles" x2="0" y2="1">
      <stop stop-color="#df9e62"/><stop offset=".60" stop-color="#f9c681"/><stop offset="1" stop-color="#8d594b"/>
    </linearGradient>
    <linearGradient id="${id}-counter" x2="0" y2="1">
      <stop stop-color="#b97251"/><stop offset="1" stop-color="#6f4543"/>
    </linearGradient>
    <linearGradient id="${id}-curtain" x2="1" y2=".7">
      <stop stop-color="#464864"/><stop offset=".5" stop-color="#74738a"/><stop offset=".75" stop-color="#62617c"/><stop offset="1" stop-color="#434359"/>
    </linearGradient>
  `;
}

function lantern(id, x, y, scale) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <circle r="38" fill="url(#${id}-halo)"/>
      <path d="M0-36v17m0 29v15m-3-3h6" stroke="#54343c" stroke-width="1.6"/>
      <path d="M-11-13c-11 8-10 23 1 29h20c11-6 12-21 1-29Z" fill="url(#${id}-lantern)" stroke="#633539" stroke-width="1.3"/>
      <path d="M-16-7q16-4 32 0m-34 6q18-4 36 0m-35 7q17-4 34 0m-31 6q14-3 28 0M-5-12C-9-3-9 6-5 15m10-27c4 9 4 18 0 27" fill="none" stroke="#a95b50" stroke-opacity=".52" stroke-width=".85"/>
      <path d="M-10-16h20v3h-20zM-9 16H9v3H-9Z" fill="#58353b"/>
      <path d="M0-5 2.2-.3 7 2 2.2 4.2 0 9-2 4.2-7 2l5-2.3Z" fill="#fff2a7" opacity=".85"/>
    </g>`;
}

export function alleyStalls(id) {
  return `
    <g stroke="#313238" stroke-width="2" stroke-linejoin="round">
      <path d="M158 183 221 201 236 260 152 315Z" fill="#624c47"/>
      <path d="M160 184 207 188 228 205 223 211 163 198Z" fill="#433c42"/>
      <path d="M178 223 221 221 231 251 184 280Z" fill="#b4755c"/>
      <path d="M191 226 216 226 221 247 196 259Z" fill="#f2b277"/>
      <path d="m185 260 47-16 12 7-42 28-18 2Z" fill="#916352"/>
      <path d="M366 194 340 216 331 263 398 311 416 232Z" fill="#5d4d4a"/>
      <path d="m402 178 16 27-71 16-10-6 30-24Z" fill="#57414b"/>
      <path d="M347 231 384 228 389 267 342 252Z" fill="#d98c5c"/>
      <path d="m347 233 32-2 7 28-42-11Z" fill="#f6bb78"/>
      <path d="m330 252 55 14 10 17-20-3-47-22Z" fill="#9b6750"/>
    </g>
    <path d="m194 232 26-1m-23 10 24-5m131-1 30 4m-30 3 32 7M206 223v31m151-23v22m12-24v28" stroke="#85584d" stroke-width="1.5"/>
    ${lantern(id, 219, 220, .47)}
    ${lantern(id, 247, 232, .35)}
    ${lantern(id, 317, 231, .35)}
    ${lantern(id, 350, 223, .53)}
    <path d="M204 273v21m21-30v17m130-15v19m20-9v21" stroke="#3d3941" stroke-width="2"/>
  `;
}

function leftRoof() {
  const tiles = Array.from({ length: 19 }, (_, index) => {
    const x = index * 12;
    const y = x < 110 ? 112 - x * .22 : 88 + (x - 110) * .37;
    return `<path d="M${x} ${y.toFixed(1)}q-3 11 -11 22m16-22q-5 12-9 17"/>`;
  }).join('');
  return `
    <path d="M-12 143 112 108 211 139 203 156 200 308 172 339 105 363-12 385Z" fill="#684841" stroke="#392d35" stroke-width="3"/>
    <path d="M-14 211 115 181 204 193 199 296 174 324-14 351Z" fill="#915943"/>
    <path d="M-6 204 35 198 33 328-6 339Zm163-22 18 5-2 129-15 6Zm30 4 13 5-6 108-11 11Z" fill="#553e3c"/>
    <path d="M-12 116 110 86 216 122 228 145 208 150 112 117-12 151Z" fill="#31484b" stroke="#262e38" stroke-width="4" stroke-linejoin="round"/>
    <path d="M-9 117 110 86 216 122 224 136 112 102-9 133Z" fill="#45666a"/>
    <g fill="none" stroke="#243844" stroke-opacity=".70" stroke-width="1.4">${tiles}</g>
    <path d="m-9 138 121-32 110 36m-231-19 119-30 108 35" fill="none" stroke="#89a49a" stroke-opacity=".61" stroke-width="1.5"/>
    <path d="M-8 148 112 115 207 146l11 0-5 9-101-30-120 34Z" fill="#a06a51" stroke="#53383a" stroke-width="2"/>
    <path d="m-7 158 119-33 101 29" fill="none" stroke="#db9260" opacity=".72"/>
  `;
}

function steamingBowl(extraWisp) {
  return `
    <g fill="none" stroke="#fff2cf" stroke-linecap="round">
      <path d="M133 273q-9-8-2-15t-2-13" stroke-width="2" opacity=".77"/>
      ${extraWisp ? '<path d="M145 269q9-7 1-14t3-13" stroke-width="2.6" opacity=".94"/>' : ''}
    </g>
    <path d="m141 277 17-15m-13 16 19-15" fill="none" stroke="#54333a" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M121 279q19-8 35-2-3 19-15 21-15 0-20-19Z" fill="#4d6e67" stroke="#3a3a3d" stroke-width="1.8"/>
    <ellipse cx="139" cy="279" rx="17" ry="4.7" fill="#ffe6a6" stroke="#a45b43" stroke-width="1.2"/>
    <path d="M129 279q4-2 8 0t10 0m-9-2 3 2m5-2 1 1" fill="none" stroke="#8d6b42" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M126 287q15 5 26-2" fill="none" stroke="#a1ad87" stroke-width="1.3"/>
  `;
}

function noodleCounter(id, extraWisp) {
  return `
    <path d="M26 207 165 197 170 294 20 319Z" fill="#372e37" stroke="#3f3037" stroke-width="4"/>
    <path d="M34 211 158 203 160 285 28 308Z" fill="url(#${id}-noodles)"/>
    <path d="m33 230 124-10m-127 33 129-12m-128 35 128-16m-116-50-2 78m41-81-1 79m42-80v65" fill="none" stroke="#c08056" stroke-width="1.5" opacity=".65"/>
    <path d="M32 211 151 203l11 8-129 10Z" fill="#edbb75"/>
    <g transform="translate(46 215) rotate(-5)">
      <path d="M0 0h43v32H0Z" fill="#ecd9a3" stroke="#996448" stroke-width="2"/>
      <text x="21.5" y="11" fill="#603e39" font-size="7" font-family="system-ui" font-weight="800" text-anchor="middle">MENU</text>
      <path d="M5 16h21m4 0h7M5 22h15m10 0h7M5 27h19m6 0h7" stroke="#906951" stroke-linecap="round"/>
    </g>
    <path d="M56 282q-6-14 7-20 12 2 11 17m21-3-3-17 11-13 12 10-2 18" fill="#a5624a" stroke="#7c5147" stroke-width="2"/>
    <path d="M58 273q7-5 13 0m26-5 13-2m-11-9 9-1" fill="none" stroke="#e5a370" stroke-width="1.5"/>
    <path d="M-8 320 155 289l30 9 2 13-182 43-13-6Z" fill="url(#${id}-counter)" stroke="#432f37" stroke-width="3"/>
    <path d="m-8 320 163-31 29 9-189 39Z" fill="#c78a5b" stroke="#694640" stroke-width="1.5"/>
    <path d="m0 329 169-35m-149 26 28-6m27 0 52-12m15-2 16-4" fill="none" stroke="#ecaf75" stroke-width="1.3"/>
    <path d="M-7 348 185 307l-17 27-173 45Z" fill="#805242" stroke="#4d3638" stroke-width="2"/>
    <path d="m10 350-2 23m19-28-2 24m21-29-2 23m21-27-2 22m21-27-2 22m22-27-2 22m21-27-2 21m21-26-2 21m21-25-3 19" fill="none" stroke="#583b38" stroke-width="2"/>
    <path d="m6 361 166-42m-158 44 41-9m50-14 30-8" fill="none" stroke="#b07455" opacity=".72"/>
    <g transform="translate(65 310)">
      <ellipse rx="23" ry="5" fill="#644944" opacity=".55"/>
      <path d="M-20-15h40c-4 10-10 14-20 14s-17-4-20-14Z" fill="#b85f50" stroke="#593939" stroke-width="1.5"/>
      <ellipse cy="-15" rx="20" ry="4.6" fill="#ffe0a0" stroke="#8c5246" stroke-width="1.3"/>
      <path d="M-11-15q7-4 13 0t10-1m-25 7q13 5 26-1" fill="none" stroke="#d6ab71" stroke-width="1.3"/>
    </g>
    ${steamingBowl(extraWisp)}
  `;
}

export function noodleStall(id, { hideLantern, greenSign, hideSteam }) {
  return `
    ${leftRoof()}
    <g transform="translate(80 161) rotate(-8)">
      <path d="M-50-17H50V17H-50Z" fill="#382f37" stroke="#9c7250" stroke-width="2"/>
      <path d="M-46-13H46V13H-46Z" fill="${greenSign ? '#477b64' : '#984a3f'}" stroke="#e5a772"/>
      <path d="m-41 0 3-3 3 3-3 3Zm76 0 3-3 3 3-3 3Z" fill="#e3ac6e"/>
      <text y="4.5" fill="#ffedb9" font-size="12.5" letter-spacing="1.5" font-family="Georgia, serif" font-weight="700" text-anchor="middle">NOODLES</text>
    </g>
    ${noodleCounter(id, !hideSteam)}
    ${lantern(id, 17, 197, .83)}
    ${hideLantern ? '' : lantern(id, 180, 172, 1.08)}
    <path d="M19 168v-9m-6 5h12m154-30v8m-6-3h12" stroke="#d99960" stroke-width="1.2"/>
  `;
}

function rightRoof() {
  const slats = Array.from({ length: 16 }, (_, index) => {
    const x = 366 + index * 13;
    const y = x < 468 ? 133 - (x - 366) * .45 : 87 + (x - 468) * .23;
    return `<path d="M${x} ${y.toFixed(1)}q5 9 13 19m-9-20q6 10 12 15"/>`;
  }).join('');
  return `
    <path d="M360 145 467 112 569 127 575 387 437 352 373 309Z" fill="#75503e" stroke="#462e34" stroke-width="3"/>
    <path d="M372 150 467 124 548 137 545 344 434 321 379 299Z" fill="#a16a49"/>
    <path d="m379 171 11-5 2 133-11-6Zm160-31 17 4 1 213-16-5Z" fill="#694133"/>
    <path d="M570 108 469 87 359 126 347 147 368 152 467 119 569 146Z" fill="#754346" stroke="#3c2f3c" stroke-width="4" stroke-linejoin="round"/>
    <path d="M570 107 469 87 359 126 352 137 470 101 570 124Z" fill="#a8594d"/>
    <g fill="none" stroke="#533339" stroke-opacity=".76" stroke-width="1.4">${slats}</g>
    <path d="m356 139 113-34 101 23m-211 2 110-37 101 21" fill="none" stroke="#eba170" stroke-opacity=".62" stroke-width="1.5"/>
    <path d="m350 147 19 1 98-30 102 27v10l-102-26-97 29-18-2Z" fill="#bc7850" stroke="#643c36" stroke-width="2"/>
    <path d="m356 155 14 1 97-28 103 26" fill="none" stroke="#eba770" opacity=".70"/>
  `;
}

function noren(id, flowerPattern) {
  return `
    <path d="M380 194 537 186" stroke="#392f38" stroke-width="6" stroke-linecap="round"/>
    <path d="M382 192 536 184" stroke="#d18f66" stroke-width="2" stroke-linecap="round"/>
    <g fill="url(#${id}-curtain)" stroke="#38364f" stroke-width="1.6" stroke-linejoin="round">
      <path d="M383 197q18-4 39-5-4 30 0 63-19 4-37-1 2-27-2-57Z"/>
      <path d="M424 192q14-1 32-1-3 37 1 67-17 3-34-3 2-32 1-63Z"/>
      <path d="M458 191q18-2 39-2-3 34 1 72-24 3-39-3 1-31-1-67Z"/>
      <path d="M499 189q17-3 38-2-1 36 4 71-19 6-41 3 1-34-1-72Z"/>
    </g>
    <path d="M390 201q3 25 2 46m36-49q2 25 0 52m35-54q3 28 2 54m40-57q2 29 1 61M389 251q14 3 28 0m11 2q16 4 25 1m11 0q13 5 29 2m13 0q15 2 28-3" fill="none" stroke="#cab5a2" stroke-opacity=".45" stroke-width="1.2"/>
    <g fill="none" stroke="#eed0a0" stroke-width="1.45" stroke-linecap="round">
      <path d="M394 232q8-12 17 0m-20 4q11-13 23 0m-24 4q11-9 24 0m17-11q8-13 17 0m-19 4q10-13 22 0m-21 4q10-10 20 0m61-8q8-13 17 0m-20 4q11-13 22 0m-21 4q10-10 20 0"/>
      ${flowerPattern
        ? '<path d="M477 223c-9-11 9-12 5-1 11-6 15 9 2 6 5 10-10 13-8 3-13 4-13-12-1-6Z"/><circle cx="479" cy="226" r="1.4" fill="#eed0a0"/>'
        : '<path d="M469 229q8-13 17 0m-20 4q11-13 23 0m-24 4q12-10 24 0"/>'}
    </g>
  `;
}

function specialPlate(dumplings) {
  return `
    <g transform="translate(431 299)">
      <ellipse cy="5" rx="24" ry="7" fill="#674943" opacity=".59"/>
      <ellipse rx="24" ry="8" fill="#3f655e" stroke="#44343b" stroke-width="1.4"/>
      <ellipse rx="20" ry="5.4" fill="#a2ab83"/>
      ${dumplings ? `
        <g stroke="#9b5a43" stroke-width="1.15" stroke-linejoin="round">
          <path d="M-18-2q8-15 16-3l3 5q-12 5-19-2ZM-3-4Q3-17 13-8l5 6Q5 4-3-4Z" fill="#ffca78"/>
          <path d="m-13-7 2 4m2-6 2 4m8-4 2 4m2-5 3 4m2-3 3 3" fill="none"/>
        </g>` : `
        <path d="M-21 1 21-9" stroke="#734c3b" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="-11" cy="-2" r="5.8" fill="#e3a087" stroke="#934e49"/>
        <circle cy="-5" r="5.8" fill="#fbe1ad" stroke="#a4775b"/>
        <circle cx="11" cy="-7" r="5.8" fill="#a9b381" stroke="#526b5a"/>
        <path d="m-14-4 2-1m9-2 2-1m9-1 2-1" stroke="#fff0c6" stroke-width="1.3" stroke-linecap="round"/>`}
    </g>`;
}

function dumplingCounter(id, dumplings) {
  return `
    <path d="M381 211 540 204 544 321 385 294Z" fill="#372e37" stroke="#3f3037" stroke-width="4"/>
    <path d="M389 220 534 213 535 306 391 284Z" fill="url(#${id}-noodles)"/>
    <path d="M398 223v62m28-60v67m61-69v73m27-74v79m-124-37 145 15" fill="none" stroke="#aa6b50" opacity=".65" stroke-width="1.5"/>
    <path d="M375 285 559 321 569 348 368 303Z" fill="url(#${id}-counter)" stroke="#432f37" stroke-width="3"/>
    <path d="M375 285 562 315l10 15-204-34Z" fill="#c48b5e" stroke="#684740" stroke-width="1.5"/>
    <path d="m383 289 178 32m-97-13 33 6m12 2 23 4" fill="none" stroke="#ecaf75" stroke-width="1.3"/>
    <path d="m386 308 175 38 9 42-165-48Z" fill="#7b5545" stroke="#50363a" stroke-width="2"/>
    <path d="m401 313 9 27m10-23 10 29m9-25 9 31m11-26 9 31m11-27 9 34m11-31 9 36m12-32 9 37m11-33 10 39m9-35 10 41" fill="none" stroke="#533938" stroke-width="2"/>
    <path d="m406 324 154 37m-119-24 20 4m44 13 39 9" fill="none" stroke="#ae765a" opacity=".73"/>
    ${specialPlate(dumplings)}
    <g transform="translate(505 302)">
      <path d="M-19-12h38v13q-18 9-38 0Z" fill="#ad7354" stroke="#65453b" stroke-width="1.5"/>
      <ellipse cy="-12" rx="19" ry="6.3" fill="#dfad73" stroke="#80543f" stroke-width="1.3"/>
      <path d="M-15-13q15 5 31 0m-31 8q16 5 31 0m-31 4q16 5 31 0" fill="none" stroke="#774b3d" opacity=".85"/>
      <path d="M5-15q4-6-1-9t0-9" fill="none" stroke="#fff0c5" stroke-width="1.8" opacity=".77" stroke-linecap="round"/>
    </g>
    <path d="M540 293q8-5 15 1l1 15q-8 5-15 0Z" fill="#55776d" stroke="#4b4140" stroke-width="1.5"/>
    <path d="m543 293-1-18m5 18 1-20m3 20 4-17" stroke="#845044" stroke-width="1.3" stroke-linecap="round"/>
  `;
}

export function dumplingStall(id, { flowerCurtain, swapFood }) {
  return `
    ${rightRoof()}
    <g transform="translate(479 153) rotate(6)">
      <path d="M-58-15H58V15H-58Z" fill="#292f37" stroke="#8d6048" stroke-width="2"/>
      <path d="M-53-11H53V11H-53Z" fill="#454e4b" stroke="#d1a06f"/>
      <text y="4.5" fill="#ffebbb" font-size="11.5" letter-spacing="1.2" font-family="Georgia, serif" font-weight="700" text-anchor="middle">DUMPLINGS</text>
      <circle cx="-46" r="1.7" fill="#dfae74"/><circle cx="46" r="1.7" fill="#dfae74"/>
    </g>
    ${dumplingCounter(id, swapFood)}
    ${noren(id, flowerCurtain)}
    ${lantern(id, 372, 172, .84)}
    ${lantern(id, 554, 169, 1.04)}
  `;
}
