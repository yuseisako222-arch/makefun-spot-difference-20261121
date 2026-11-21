function planter(x, y, scale) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="3" cy="21" rx="33" ry="8" fill="#42343e" opacity=".53"/>
      <path d="M-23-7h46l-6 27q-18 8-34 0Z" fill="#b7795c" stroke="#543942" stroke-width="2"/>
      <path d="M-25-9Q0-14 25-9v7Q0 4-25-2Z" fill="#d39a6b" stroke="#6e483f" stroke-width="1.6"/>
      <path d="M-11 18-14 3m23 16 3-16" stroke="#e2a574" stroke-width="1.2" opacity=".76"/>
      <path d="M0-7q1-21-9-40M0-8q0-14 14-27m-16 23q-8-17-20-16M4-8q10-12 24-10" stroke="#4b5447" stroke-width="1.8"/>
      <path d="M-8-34q-14-2-14-18 11 2 14 18Zm2 7q-1-13 7-20 5 11-7 20Zm-9 5q-13 1-15-10 11-1 15 10Zm26-7q0-13 11-15 1 10-11 15Zm3 12q5-11 17-8-4 9-17 8ZM-2-12q-1-12-9-13-3 10 9 13Z" fill="#8a9868" stroke="#4c594d" stroke-width="1.2"/>
      <path d="M-27-41q-9-8 1-12 6-8 11 0 9 4 1 9-5 8-13 3Zm44 2q-8-5-2-11 5-7 10 0 9 3 1 9-3 7-9 2Z" fill="#da9b87"/>
      <path d="M-21-48h1m41 1h1" stroke="#ffde9c" stroke-width="2.5" stroke-linecap="round"/>
    </g>`;
}

export function sidewalkProps() {
  return `
    <g transform="translate(76 389) rotate(-8)">
      <path d="M-26 24 38 24 25 29-37 29Z" fill="#42343e" opacity=".52"/>
      <path d="M-19-24 9-25 25 27h-6L4-18-15-19-24 28h-6Z" fill="#aa6d56" stroke="#49313b" stroke-width="1.5"/>
      <path d="M-20-24H14l4 41h-43Z" fill="#3e4f49" stroke="#e5af78" stroke-width="3"/>
      <text x="-3" y="-10" text-anchor="middle" fill="#f1d9a3" font-size="7" font-family="system-ui" font-weight="800">TODAY</text>
      <path d="M-9 3h14m-12 5H3m-15-13q8 2 18 0" stroke="#ebd1a1" stroke-width="1" stroke-linecap="round"/>
    </g>
    ${planter(19, 388, .85)}
    <g transform="translate(516 388)">
      <ellipse cx="10" cy="18" rx="44" ry="11" fill="#473641" opacity=".51"/>
      <path d="M-23-13 4-23 40-12 14-1Zm0 0 37 12v25l-37-14Z" fill="#b77e58" stroke="#553c43" stroke-width="2" stroke-linejoin="round"/>
      <path d="m14-1 26-11v24L14 24Z" fill="#7b534a" stroke="#553c43" stroke-width="2" stroke-linejoin="round"/>
      <path d="m-19-6 31 10m-31-3 31 10m-31-3 31 11m5-14 20-8M17 11l20-8m-20 15 20-8" stroke="#634540" stroke-width="1.3"/>
      <path d="m-16-14 31 10m-22-13 33 10m-27-13 34 10" stroke="#dea16d" stroke-width="1.3" stroke-linecap="round"/>
    </g>
    ${planter(459, 375, .83)}
    <path d="M212 399q3-4 9-2-5 3-9 2Zm166 7q2-4 8-3-4 4-8 3Zm-211 22 5-3 5 1-5 2Zm243-49 5-4 4 1-5 3Z" fill="#dfa185" opacity=".81"/>
  `;
}

export function marketCat(tailDown) {
  const tail = tailDown ? 'M15 13q17 12 29 5t5-14' : 'M15 13Q34 17 37-1t11-19';
  return `
    <g transform="translate(323 376)" stroke="#47353c" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="6" cy="20" rx="35" ry="9" fill="#4d3d47" stroke="none" opacity=".58"/>
      <path d="${tail}" fill="none" stroke-width="10"/>
      <path d="${tail}" fill="none" stroke="#d19064" stroke-width="6.3"/>
      <path d="${tailDown ? 'M44 18l-3-4m9-5-5 1' : 'M36 4l-5-1m8-7-5-2m11-6-4-4'}" stroke="#9a5e50" stroke-width="1.4"/>
      <path d="M-15 1q12-8 23-3 13 4 15 16 1 10-15 10h-23q-12-2-11-10 1-8 11-13Z" fill="#d38f63" stroke-width="2"/>
      <path d="M-4 3q9-4 19 5m-12-8q10 0 15 6m-7 15q9-5 10-1" fill="none" stroke="#965c50" stroke-width="1.5"/>
      <path d="M-21 8q8 6 16 5l-1 7q-1 4-9 4-8 0-12-4Z" fill="#f7d9a5" stroke="none"/>
      <path d="M-31-9q0-8 2-16l10 8q5-2 10 0L2-24l-1 14Q7-1 0 7q-7 7-21 4-13-2-13-11 0-5 3-9Z" fill="#e4a674" stroke-width="2"/>
      <path d="m-29-18 7 6-7 3Zm25 5 5-6-1 9Z" fill="#b96d65" stroke="none"/>
      <path d="M-28 3q5-7 13-3 4-5 9 0 4 5 10 3-5 9-18 8t-14-8Z" fill="#f8dca9" stroke="none"/>
      <path d="m-18-14 2 5m5-6-1 5m-11-3 3 4m-7 3q2-2 5 0m10 0q3-2 5 0m-13 6 3 2 3-2Zm3 2v2m-16-1-6-2m7 4-7 1M0 2l6-2M0 5l6 1" fill="none" stroke-width="1.14"/>
      <path d="M-28 10q12 5 23 0" fill="none" stroke="#854c55" stroke-width="1.8"/>
      <circle cx="-13" cy="13" r="2.9" fill="#f9cf70" stroke="#86543e" stroke-width="1"/>
      <path d="M-13 14h1" stroke="#86543e" stroke-width=".8"/>
    </g>`;
}
