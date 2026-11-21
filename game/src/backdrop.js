const stars = [
  [15, 31, 1.7], [40, 65, 1.5], [68, 29, 2], [83, 70, 1.1], [112, 15, 1.3],
  [130, 53, 1.6], [156, 72, 1.2], [168, 26, 2.3], [197, 52, 1.2], [213, 83, 1.4],
  [225, 18, 1.7], [249, 113, 1.5], [311, 113, 1], [323, 21, 1.5], [335, 86, 1.3],
  [362, 24, 1.7], [376, 67, 1.3], [387, 101, 1.8], [422, 39, 1.4], [462, 82, 1.3],
  [501, 68, 1.5], [529, 33, 1.7], [548, 87, 1.5],
];

const paving = [
  'M248 264 210 294 172 320 109 355 25 400-42 433',
  'M261 265 239 295 215 323 169 369 106 426 80 454',
  'M275 265 271 300 254 335 236 378 214 414 199 454',
  'M290 265 296 291 298 321 310 354 324 396 339 453',
  'M308 267 326 298 352 329 388 371 432 421 468 452',
  'M323 271 351 302 404 343 463 383 558 436',
  'M201 279Q289 286 361 280', 'M172 298Q270 305 394 296',
  'M138 319Q266 330 423 316', 'M99 344Q271 358 459 340',
  'M52 373Q258 390 504 367', 'M-8 406Q297 427 567 397',
  'M-32 438Q282 455 582 434',
];

const litStones = [
  'M267 281 286 282 288 291 263 289Z', 'M306 286 321 285 327 294 308 295Z',
  'M244 301 265 303 259 316 233 314Z', 'M271 306 289 307 290 321 264 320Z',
  'M300 326 335 326 348 343 306 343Z', 'M193 334 214 335 201 350 169 349Z',
  'M273 343 288 342 296 352 268 352Z', 'M221 357 240 359 229 374 204 372Z',
  'M343 360 372 357 385 368 356 369Z', 'M265 390 292 391 297 405 258 405Z',
  'M148 390 180 391 160 410 123 408Z', 'M347 416 384 414 396 432 354 435Z',
];

export function backdropPaint(id) {
  return `
    <linearGradient id="${id}-sky" x2="0" y2="1">
      <stop stop-color="#172d42"/><stop offset=".60" stop-color="#38676b"/><stop offset="1" stop-color="#e0ab83"/>
    </linearGradient>
    <radialGradient id="${id}-moonlight">
      <stop stop-color="#f7ce86" stop-opacity=".45"/><stop offset="1" stop-color="#f7ce86" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-moon" x2=".2" y2="1">
      <stop stop-color="#fff0ae"/><stop offset="1" stop-color="#efad6d"/>
    </linearGradient>
    <linearGradient id="${id}-street" x2="0" y2="1">
      <stop stop-color="#df9c70"/><stop offset=".45" stop-color="#ad7866"/><stop offset="1" stop-color="#574853"/>
    </linearGradient>
    <radialGradient id="${id}-streetlight" cy=".23" fy=".09">
      <stop stop-color="#ffe5a3" stop-opacity=".86"/><stop offset="1" stop-color="#ffbd79" stop-opacity="0"/>
    </radialGradient>`;
}

export function nightSky(id, extraStar) {
  return `
    <rect width="560" height="448" fill="url(#${id}-sky)"/>
    <circle cx="280" cy="66" r="87" fill="url(#${id}-moonlight)"/>
    <circle cx="280" cy="66" r="46" fill="none" stroke="#f9da9a" opacity=".25"/>
    <circle cx="280" cy="66" r="40" fill="url(#${id}-moon)"/>
    <path d="M252 57q21 6 50-2m-43 26q18 8 51-2m-36 17 18-1" fill="none" stroke="#ce8458" stroke-opacity=".28" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M187 93q25-8 39-5m-58 13q32-7 56-3m78-16q37-5 59 0m-30 8q33-5 76-2m-8 38q37-5 73-4" fill="none" stroke="#fae0ac" stroke-opacity=".40" stroke-linecap="round"/>
    <g fill="#ffe7ad">
      ${stars.map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" opacity="${i % 3 === 0 ? '.95' : '.67'}"/>`).join('')}
      <path d="M99 40q1-5 5-6-4-1-5-6-1 5-5 6 4 1 5 6ZM403 62q1-6 6-7-5-1-6-7-1 6-6 7 5 1 6 7Z"/>
      ${extraStar ? '<path d="M347 49q1 6 7 7-6 1-7 7-1-6-7-7 6-1 7-7Z"/>' : ''}
    </g>
    <path d="M-10 204 68 146 116 168 160 143 187 148 215 130 232 135 271 113 287 117 299 114 328 138 347 142 373 156 409 151 451 175 505 146 570 193V279H-10Z" fill="#47696a"/>
    <path d="m232 135 39-22 16 4 12-3 27 24-22-12-6 5-11-3-15 4 2-7-18 3Z" fill="#b4aaa0" opacity=".67"/>
    <path d="M0 225 43 176 98 183 140 175 177 192 212 168 237 173 270 154 305 172 326 171 349 183 379 173 408 191 461 178 501 189 560 174V277H0Z" fill="#385658"/>
    <path d="M0 236 70 199 131 205 162 194 188 209 218 192 240 211 273 202 288 211 317 197 354 205 388 197 438 215 490 202 560 211V281H0Z" fill="#29464b"/>
  `;
}

export function shrineGate() {
  return `
    <g fill="#422e3e">
      <path d="M235 162q43 8 91-2l7-3-3 11q-51 14-103 2l-3-10Z"/>
      <path d="M237 173q38 7 85-1l-2 6q-41 9-82 2Z" fill="#b36555"/>
      <path d="m245 178 10 2-3 85-12 2Zm60 2 10-2 6 89-12-2Z"/>
      <path d="M230 194q48 4 100-1v7q-52 6-100 1Z"/>
      <path d="m243 208 11-1-1 5-10 1Zm64-1 11-1v5l-10 1Z" fill="#c0775e"/>
      <path d="M274 178h13l-1 18h-12Z" fill="#d79568"/>
      <path d="M280 183v9m-3-6h6" fill="none" stroke="#6b3f43"/>
    </g>
    <g fill="#6d554f" stroke="#413d46" stroke-width="2" stroke-linejoin="round">
      <path d="M179 243v-22l28-12 26 12v42h-54Z"/>
      <path d="m209 242 15-15 26 9v30h-41Z"/>
      <path d="M369 248v-19l-31-11-18 12v35h49Z"/>
      <path d="m343 245-18-10-20 8v23h38Z"/>
      <path d="M258 260v-14l21-12 19 11v18Z" fill="#6b514e"/>
      <path d="M256 246l23-15 23 14-2 3-21-12-21 12Z" fill="#382e3d"/>
    </g>
    <g fill="#f4bd7c">
      <path d="M216 239h6v11h-6Zm11 1h6v8h-6Zm8 1h5v8h-5Zm28 7h5v9h-5Zm10-3h12v15h-12Zm17 2h4v9h-4Zm20-2h6v11h-6Zm10 2h6v8h-6Zm12-15h7v11h-7Z"/>
      <path d="M189 228h12v14h-12Zm154 6h10v8h-10Z" opacity=".78"/>
    </g>
    <path d="M268 255v7m6-5v6m11-8v7m6-5v5m6-6v6" stroke="#ffdf9c" stroke-width="1.3"/>
  `;
}

export function pavedLane(id) {
  return `
    <path d="M0 265Q265 255 560 264V448H0Z" fill="url(#${id}-street)"/>
    <path d="M150 262H411L548 448H5Z" fill="url(#${id}-streetlight)"/>
    <path d="M0 304 237 263 194 290 111 354 0 413Zm560-4-226-38 62 37 89 59 75 60Z" fill="#5d4249" opacity=".56"/>
    <g fill="#f9c385" opacity=".31">${litStones.map(d => `<path d="${d}"/>`).join('')}</g>
    <g fill="none" stroke="#3d3440" stroke-opacity=".62" stroke-linecap="round">
      ${paving.map(d => `<path d="${d}"/>`).join('')}
    </g>
    <path d="m137 331 33 3m-66 28 38 3m46 46 33 1m84-122 21-1m46 24 22-1m-81 76 24-1m52-23 35-3m-34 75 33-3m-392-29 40 5" fill="none" stroke="#f4c195" stroke-opacity=".50" stroke-linecap="round"/>
    <g transform="translate(287 414)">
      <ellipse rx="34" ry="10" fill="#50454b" stroke="#bb8a77"/>
      <ellipse rx="28" ry="7" fill="none" stroke="#bb8a77" opacity=".52"/>
      <path d="M-18 0h36m-25-4 14 8m0-8L-7 4" stroke="#b68b7e" opacity=".62"/>
    </g>
    <path d="M5 433q17-10 34-9 13 2 26-1-13 8-30 9-13 0-30 1Zm421-27q18-10 41-7 9 1 22 0-11 8-34 7-12-1-29 0Z" fill="#bab1a2" opacity=".28"/>
    <path d="M12 432l24-4m13-2 11-1m379-21 27-3" fill="none" stroke="#edb792" opacity=".56" stroke-linecap="round"/>
  `;
}

const blossoms = [
  [551, 10, 1], [530, 17, .88], [513, 12, .73], [536, 36, .78], [517, 37, 1.1],
  [497, 28, .77], [486, 38, .68], [471, 37, .98], [457, 49, .65], [506, 50, .72],
  [493, 59, .85], [470, 19, .59], [483, 12, .91], [448, 19, .65], [539, 54, .87],
  [555, 39, .72], [548, 66, .70], [529, 68, .59], [502, 68, .49], [466, 62, .49],
];

export function blossomBough() {
  return `
    <g fill="none" stroke-linecap="round">
      <path d="M573-5q-31 12-54 28t-64 26m67-28q-30-4-75-4m91-4q-23 35-47 48m60-48q-4 23-13 47" stroke="#322b3d" stroke-width="5"/>
      <path d="M571 1q-32 13-50 25t-37 16m53-22q-13 22-22 25" stroke="#9d655d" stroke-width="1.2"/>
    </g>
    ${blossoms.map(([x, y, scale], index) => `
      <g transform="translate(${x} ${y}) rotate(${index * 39}) scale(${scale})">
        <path d="M0-3C-8-11 2-16 5-7 13-11 17-2 8 1 15 9 6 14 2 7-2 16-11 9-7 3-17 2-13-7-5-5Z" fill="${['#d68e89', '#eaada0', '#ad6d77', '#f1b797'][index % 4]}"/>
        <path d="M-1 2 2-2m0 4 4-1" stroke="#863f58" stroke-width="1" stroke-linecap="round"/>
        <circle r="1.2" fill="#ffe6a5"/>
      </g>`).join('')}
    <path d="M452 72q5-2 8 2-5 3-8-2Zm72 8q4 0 4 5-5-1-4-5Zm-116-3q5 0 5 4-5 0-5-4ZM242 385q5-1 7 2-4 3-7-2Zm75 53q5-3 8 1-6 2-8-1Zm-141-32q5-1 7 3-5 2-7-3Z" fill="#cc8f85"/>
  `;
}

export function printTexture() {
  // Fixed spacing and offsets keep the flecks identical between the two prints.
  const flecks = Array.from({ length: 300 }, (_, index) => {
    const x = (index * 113 + index * index * 13 + 9) % 560;
    const y = (index * 73 + index * index * 7 + 23) % 448;
    const length = index % 4 + 1;
    return `M${x} ${y}l${length} -.4`;
  }).join('');
  return `<path d="${flecks}" fill="none" stroke="#ffdbab" stroke-width=".75" opacity=".24"/>
    <rect x="2" y="2" width="556" height="444" rx="1" fill="none" stroke="#ffdfa6" stroke-opacity=".27"/>`;
}
