// Iconografía propia de VARGERSOFT: trazo fino, estilo "plano de ingeniería".
const P = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/><path d="M15 4a5 5 0 0 1 5 5M15 7.5a1.5 1.5 0 0 1 1.5 1.5"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="1"/><path d="M4 10h16M8 3v4M16 3v4"/><path d="M9 15l2 2 4-4"/>',
  quote: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h4"/><path d="M9 8h3"/>',
  bell: '<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0M12 3v2"/>',
  browser: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M6 6.5h.01M9 6.5h.01"/><path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
  wrench: '<path d="M15 4a4 4 0 0 0-3.5 6L4 17.5 6.5 20l7.5-7.500A4 4 0 0 0 20 9l-3 1.500L14.500 8 16 5a4 4 0 0 0-1-1z"/>',
  cross: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
  hardhat: '<path d="M4 16a8 8 0 0 1 16 0z"/><path d="M2 16h20v3H2zM10 8V5h4v3"/>',
  scale: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  store: '<path d="M4 9l1.500-5h13L20 9"/><path d="M4 9a2.700 2.700 0 0 0 5.300 0 2.700 2.700 0 0 0 5.400 0A2.700 2.700 0 0 0 20 9"/><path d="M5 12v8h14v-8M10 20v-5h4v5"/>',
  boxes: '<path d="M3 13h8v8H3zM13 13h8v8h-8zM8 3h8v8H8z"/><path d="M12 3v3M7 13v3M17 13v3"/>',
  check: '<path d="M12 3l7 3v6c0 4.500-3 7.500-7 9-4-1.500-7-4.500-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  board: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M9 4v16M15 4v16M5.500 8h1.500M11 8h2M17 8h1.500M11 12h2"/>',
  chart: '<path d="M4 4v16h16"/><path d="M7 15l4-5 3 3 5-7"/>',
  truck: '<path d="M2 7h11v9H2zM13 10h4l4 3.500V16h-8z"/><circle cx="6.500" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21a2 2 0 0 1 2-2h13M9 8h6"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M7 9l3 3-3 3M12 15h5"/>',
  bot: '<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V4M9 13h.01M15 13h.01M9.500 16h5M3 12v3M21 12v3"/><circle cx="12" cy="3.500" r="1"/>',
  app: '<rect x="7" y="2.500" width="10" height="19" rx="2"/><path d="M11 18.500h2"/>',
  sheet: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9h16M4 14h16M10 4v16"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.500 3 14.500 0 18M12 3c-3 3.500-3 14.500 0 18"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8.500" r="1.200"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>',
  file: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/>',
  arrow: '<path d="M7 17L17 7M9 7h8v8"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v6H4V6h6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6.300 7-11a7 7 0 0 0-14 0c0 4.700 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
export function icon(name, cls = 'ico') {
  const d = (P[name] || P.spark).replace(/(\d)\.(\d)00/g, '$1.$2');
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
}
export const appleLogo = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" class="apple"><path d="M16.4 12.700c0-2.300 1.900-3.400 2-3.500-1.100-1.600-2.800-1.800-3.400-1.800-1.400-.1-2.800.9-3.500.9s-1.800-.8-3-.8c-1.500 0-2.900.9-3.700 2.300-1.600 2.700-.4 6.800 1.100 9 .8 1.100 1.600 2.300 2.800 2.200 1.100 0 1.500-.7 2.900-.7s1.700.7 2.900.7 2-1.100 2.700-2.200c.9-1.200 1.200-2.400 1.200-2.500 0 0-2-.800-2-3.600zM14.200 5.900c.6-.700 1-1.700.9-2.700-.9 0-1.900.6-2.500 1.300-.6.600-1 1.600-.9 2.600 1 .1 1.900-.5 2.500-1.200z"/></svg>'.replace(/(\d)00\b/g, '$1');

// Ilustraciones de servicio: panel de plano con dibujo animado.
const G = (inner, label) => `<svg class="illus" viewBox="0 0 320 220" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
<defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width=".5"/></pattern></defs>
<rect width="320" height="220" fill="url(#g)"/>
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
<g fill="currentColor"><rect x="8" y="8" width="5" height="5"/><rect x="307" y="8" width="5" height="5"/><rect x="8" y="207" width="5" height="5"/><rect x="307" y="207" width="5" height="5"/></g></svg>`;
const wave = (x, y) => [0, 1, 2, 3, 4, 5, 6].map(i => `<path class="bar b${i}" d="M${x + i * 12} ${y - [8, 18, 28, 14, 24, 10, 6][i]}v${[16, 36, 56, 28, 48, 20, 12][i]}"/>`).join('');
const I = {
  phone: `<rect x="40" y="36" width="84" height="150" rx="10"/><path d="M70 48h24M74 172h16"/><circle cx="82" cy="96" r="20"/><path d="M74 96l5 5 11-11"/>${wave(160, 110)}<path d="M150 60h120M150 160h90" stroke-opacity=".4"/><text x="150" y="52" class="t">EN</text><text x="178" y="52" class="t">ES</text>`,
  chat: `<rect x="34" y="30" width="252" height="160" rx="6"/><path d="M34 54h252"/><circle cx="48" cy="42" r="2.500"/><circle cx="58" cy="42" r="2.500"/><path d="M54 76h120v30H74l-12 10v-10h-8z"/><path d="M266 122H150v30h96l12 10v-10h8z" class="pulse"/><path d="M68 88h70M68 96h44M164 134h80M164 142h52" stroke-opacity=".5"/>`.replace(/(\d)\.(\d)00/g, '$1.$2'),
  calendar: `<rect x="60" y="40" width="200" height="150" rx="6"/><path d="M60 72h200M100 28v24M220 28v24"/><path d="M60 110h200M60 148h200M110 72v118M160 72v118M210 72v118" stroke-opacity=".35"/><rect x="164" y="114" width="42" height="30" class="fillp"/><path d="M175 129l7 7 14-14"/><circle cx="85" cy="91" r="4" class="fillp"/><circle cx="235" cy="167" r="4"/>`,
  quote: `<path d="M50 30h90l24 24v136H50z"/><path d="M140 30v24h24M68 82h78M68 100h78M68 118h50"/><path d="M68 150h40" stroke-width="3"/><path d="M186 70h80M186 110h80M186 150h80" stroke-dasharray="4 5" class="dash"/><path d="M258 62l10 8-10 8M258 102l10 8-10 8M258 142l10 8-10 8"/><circle cx="286" cy="70" r="5" class="fillp"/><circle cx="286" cy="110" r="5" class="fillp"/><circle cx="286" cy="150" r="5"/>`,
  bell: `<path d="M90 150V104a40 40 0 0 1 80 0v46l14 14H76z"/><path d="M118 176a12 12 0 0 0 24 0M130 52v10"/><path d="M186 86a40 40 0 0 1 0 50M200 72a62 62 0 0 1 0 78" class="pulse"/><rect x="214" y="150" width="72" height="40" rx="4"/><path d="M226 170h30M266 170h8"/><circle cx="250" cy="170" r="0"/><path d="M226 162h12" stroke-opacity=".5"/>`,
  browser: `<rect x="30" y="30" width="260" height="160" rx="6"/><path d="M30 56h260"/><circle cx="46" cy="43" r="2.500"/><circle cx="57" cy="43" r="2.500"/><circle cx="68" cy="43" r="2.500"/><rect x="88" y="37" width="150" height="12" rx="6" stroke-opacity=".5"/><path d="M52 80h90M52 96h130M52 112h70" /><path d="M52 138h56v32H52z" class="fillp"/><path d="M122 138h56v32h-56zM192 138h56v32h-56z"/><path d="M214 84l-12 12 12 12M240 84l12 12-12 12" class="pulse"/>`.replace(/(\d)\.(\d)00/g, '$1.$2'),
  spark: `<circle cx="160" cy="110" r="26"/><path d="M160 92l5 13 13 5-13 5-5 13-5-13-13-5 13-5z" class="fillp"/><circle cx="60" cy="56" r="14"/><circle cx="262" cy="60" r="14"/><circle cx="64" cy="170" r="14"/><circle cx="258" cy="166" r="14"/><path d="M72 64l66 34M250 68l-68 30M76 162l64-36M246 158l-64-34" stroke-dasharray="4 5" class="dash"/><path d="M54 56h12M256 60h12M58 170h12M252 166h12"/>`,
  plug: `<rect x="34" y="70" width="90" height="80" rx="6"/><path d="M50 92h58M50 108h40M50 124h50"/><rect x="196" y="70" width="90" height="80" rx="6"/><circle cx="241" cy="104" r="12"/><path d="M233 104h.01M249 104h.01M222 132h38"/><path d="M124 110h22M174 110h22" /><rect x="146" y="98" width="28" height="24" rx="3" class="fillp"/><path d="M154 98v-8M166 98v-8" /><path d="M124 96h12M124 124h12M184 96h12M184 124h12" stroke-opacity=".4"/>`,
};
export function illus(name, label = '') {
  return G(I[name] || I.spark, label);
}
