// Generador estático de vargersoft.com. Cada página sale como HTML completo, en inglés (/) y español (/es/).
import fs from 'node:fs';
import path from 'node:path';
import { site, nav, ui, services } from './src/data-core.mjs';
import { apps, statusLabel, work, industries, templates, kits, faq, home } from './src/data-more.mjs';
import { guides } from './src/guides.mjs';
import { privacy, terms, legalUpdated } from './src/legal.mjs';
import { icon, illus, appleLogo } from './src/icons.mjs';

const STAGING = process.env.STAGING === '1'; // dirección de prueba: no indexar
const OUT = STAGING ? 'dist-staging' : 'dist';
const LANGS = ['en', 'es'];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = n => '$' + n.toLocaleString('en-US');
const pages = []; // {path, lang, html, title, text}

function ctx(lang) {
  const i = lang === 'es' ? 1 : 0;
  const t = p => (Array.isArray(p) ? p[i] : p);
  const L = p => (lang === 'es' ? '/es' + p : p);
  return { lang, t, L, i };
}
const abs = p => site.url + p;
const clamp = (d, n = 158) => { if (d.length <= n) return d; const c = d.slice(0, n); return c.slice(0, c.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…'; };
const svc = slug => services.find(s => s.slug === slug);

// ---------- piezas ----------
function priceLines(s, c) {
  const { t } = c;
  if (s.priceLines) return s.priceLines.map(l => ({ amount: l.amount, label: t(l.label), unit: t(ui[l.unit]) }));
  return [
    { amount: s.setup, label: t(ui.setup), unit: t(ui.oneTime) },
    { amount: s.monthly, label: t(['Monthly service', 'Servicio mensual']), unit: t(ui.monthly) },
  ];
}
function priceShort(s, c) {
  const { t } = c;
  if (s.priceLines) return `${t(['From', 'Desde'])} ${money(Math.min(...s.priceLines.filter(l => l.unit === 'oneTime').map(l => l.amount)))}`;
  return `${money(s.setup)} + ${money(s.monthly)}/${t(['mo', 'mes'])}`;
}
function serviceCard(s, c) {
  const { t, L } = c;
  return `<a class="card svc" href="${L('/ai/' + s.slug + '/')}">
  <span class="svc-ico">${icon(s.icon)}</span>
  <h3>${esc(t(s.name))}</h3>
  <p>${esc(t(s.short))}</p>
  <span class="svc-price">${esc(priceShort(s, c))}</span>
  <span class="more">${esc(t(ui.viewAgent))} ${icon('arrow', 'ico sm')}</span>
</a>`;
}
function appIcon(a, size = 64) {
  if (a.icon) return `<img class="app-ico" src="/img/apps/${a.icon}" alt="" width="${size}" height="${size}" loading="lazy" decoding="async">`;
  return `<span class="app-ico letter" style="width:${size}px;height:${size}px" aria-hidden="true">${a.letter}</span>`;
}
function appThumb(a, c) {
  const domain = a.site.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const inner = a.thumb
    ? `<img src="/img/apps/${a.thumb}" alt="${esc(c.t(['Preview of the ' + a.name + ' website', 'Vista previa del sitio de ' + a.name]))}" width="800" height="420" loading="lazy" decoding="async">`
    : `<span class="thumb-panel" style="background:${a.panel.bg};color:${a.panel.fg}"><b>${a.name}</b><small>${a.panel.sub}</small></span>`;
  return `<span class="frame"><span class="frame-bar"><i></i><i></i><i></i><em>${domain}</em></span>${inner}</span>`;
}
function appCard(a, c) {
  const { t } = c;
  const store = a.appstore ? `<a class="badge-store" href="${a.appstore}" target="_blank" rel="noopener" aria-label="${esc(t(['Download ' + a.name + ' on the App Store', 'Descargar ' + a.name + ' en el App Store']))}">${appleLogo}<span><small>${t(['Download on the', 'Descárgala en el'])}</small>App Store</span></a>` : '';
  return `<article class="card app">
  <a class="app-thumb" href="${a.site}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${appThumb(a, c)}</a>
  <div class="app-head">${appIcon(a, 56)}<div><h3>${a.name}</h3><span class="status s-${a.status}">${esc(t(statusLabel[a.status]))}</span></div></div>
  <p>${esc(t(a.desc))}</p>
  <p class="who">${icon('pin', 'ico sm')} ${esc(t(a.who))}</p>
  <div class="app-actions"><a class="btn sm" href="${a.site}" target="_blank" rel="noopener">${esc(t(ui.visit))} ${icon('ext', 'ico sm')}</a>${store}</div>
</article>`;
}
function dock(c) {
  const { t } = c;
  return `<div class="dock" aria-label="${esc(t(home.dock))}">${apps.map(a => {
    const href = a.appstore || a.site;
    const label = a.appstore ? t([a.name + ' on the App Store', a.name + ' en el App Store']) : t([a.name + ' website', 'Sitio de ' + a.name]);
    return `<a class="dock-item" href="${href}" target="_blank" rel="noopener" aria-label="${esc(label)}">${appIcon(a, 72)}<span>${a.name}</span>${a.appstore ? `<em>${appleLogo} App Store</em>` : `<em>${icon('ext', 'ico xs')} Web</em>`}</a>`;
  }).join('')}</div>`;
}
function workItem(it, kind, c) {
  const dim = kind === 'square' ? [400, 400] : [430, 932];
  return `<figure class="work-item k-${kind}"><span class="${kind === 'phone' ? 'device' : 'tile'}"><img src="/img/work/${it.img}.webp" alt="${esc(c.t(it.alt))}" width="${dim[0]}" height="${dim[1]}" loading="lazy" decoding="async"></span><figcaption>${it.app}</figcaption></figure>`;
}
function faqBlock(items, c, open = 0) {
  const { t } = c;
  return `<div class="faq">${items.map(([q, a], n) => `<details${n < open ? ' open' : ''}><summary>${esc(t(q))}</summary><p>${esc(t(a))}</p></details>`).join('')}</div>`;
}
function faqLd(items, c) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: c.t(q), acceptedAnswer: { '@type': 'Answer', text: c.t(a) } })) };
}
function crumbs(list, c) {
  const { t, L } = c;
  const all = [[t(ui.home), L('/')], ...list];
  const html = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${all.map(([n, h], k) => k < all.length - 1 ? `<li><a href="${h}">${esc(n)}</a></li>` : `<li aria-current="page">${esc(n)}</li>`).join('')}</ol></nav>`;
  const ld = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map(([n, h], k) => ({ '@type': 'ListItem', position: k + 1, name: n, item: abs(h) })) };
  return { html, ld };
}
function ctaBand(c, topic = '') {
  const { t, L } = c;
  return `<section class="band"><div class="wrap band-in"><div><h2>${esc(t(home.contactTitle))}</h2><p>${esc(t(home.contactText))}</p></div><div class="band-cta"><a class="btn" href="${L('/contact/')}${topic}">${esc(t(ui.book))}</a><a class="btn ghost" href="mailto:${site.email}">${icon('mail', 'ico sm')} ${site.email}</a></div></div></section>`;
}
function contactForm(c) {
  const { t, lang } = c;
  return `<form class="form" action="/contact.php" method="post" data-contact>
  <input type="hidden" name="lang" value="${lang}"><input type="hidden" name="topic" value="">
  <p class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
  <label>${t(['Name', 'Nombre'])}<input name="name" required autocomplete="name"></label>
  <label>Email<input name="email" type="email" required autocomplete="email"></label>
  <label>${t(['Company', 'Empresa'])}<input name="company" autocomplete="organization"></label>
  <label>${t(['Phone (optional)', 'Teléfono (opcional)'])}<input name="phone" type="tel" autocomplete="tel"></label>
  <label class="full">${t(['What do you need?', '¿Qué necesitas?'])}<textarea name="message" rows="5" required></textarea></label>
  <button class="btn" type="submit">${t(['Send message', 'Enviar mensaje'])}</button>
  <p class="form-note">${esc(t(home.contactText))}</p>
</form>`;
}

// ---------- estructura común ----------
const orgLd = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': site.url + '/#org', name: site.name, legalName: site.legal, url: site.url + '/',
  logo: site.url + '/img/icon-512.png', email: site.email, slogan: site.tagline[0],
  address: { '@type': 'PostalAddress', addressLocality: 'Conroe', addressRegion: 'TX', addressCountry: 'US' },
  sameAs: ['https://www.linkedin.com/company/varger-group'],
};
function layout(c, p) {
  const { lang, t, L } = c;
  const url = abs(L(p.path));
  const alt = lang === 'es' ? p.path : '/es' + p.path;
  const ld = [orgLd, ...(p.ld || [])];
  const title = p.title.length > 62 ? p.title.replace(' | VARGERSOFT', '') : p.title;
  p = { ...p, desc: clamp(p.desc) };
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${STAGING ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<title>${esc(title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${abs(p.path)}">
<link rel="alternate" hreflang="es" href="${abs('/es' + p.path)}">
<link rel="alternate" hreflang="x-default" href="${abs(p.path)}">
<meta property="og:type" content="${p.article ? 'article' : 'website'}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/img/og.jpg">
<meta property="og:locale" content="${lang === 'es' ? 'es_US' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#000000">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/img/icon-32.png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/rajdhani-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css?v=${site.updated}">
${ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body class="${p.cls || ''}">
<a class="skip" href="#main">${t(ui.skip)}</a>
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${L('/')}" aria-label="${site.name}"><img src="/img/logo-nav.webp" alt="${site.name}" width="111" height="48"></a>
    <nav class="nav" id="nav" aria-label="${t(['Main', 'Principal'])}">
      ${nav.map(n => `<a href="${L(n.href)}"${n.hot ? ' class="hot"' : ''}${p.path === n.href || (!n.hot && p.path.startsWith(n.href) && p.path !== '/ai/ai-receptionist/') ? ' aria-current="page"' : ''}>${t(n.label)}</a>`).join('')}
      <a class="nav-work" href="${L('/work/')}"${p.path.startsWith('/work/') ? ' aria-current="page"' : ''}>${t(['Work', 'Trabajo'])}</a>
    </nav>
    <div class="top-act">
      <a class="lang" href="${alt}" hreflang="${lang === 'es' ? 'en' : 'es'}" aria-label="${lang === 'es' ? 'Switch to English' : 'Cambiar a español'}"><b${lang === 'en' ? ' class="on"' : ''}>EN</b><i>|</i><b${lang === 'es' ? ' class="on"' : ''}>ES</b></a>
      <a class="btn sm quote" href="${L('/contact/')}">${t(ui.quote)}</a>
      <button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="${t(ui.menu)}">${icon('menu')}</button>
    </div>
  </div>
</header>
<main id="main">
${p.body}
</main>
<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand"><img src="/img/logo-nav.webp" alt="${site.name}" width="148" height="64" loading="lazy"><p>${t(site.tagline)}</p><p class="muted">${site.legal}<br>${site.place}, USA</p></div>
    <div><h2>${t(['AI Agents', 'Agentes IA'])}</h2><ul>${services.map(s => `<li><a href="${L('/ai/' + s.slug + '/')}">${esc(t(s.name))}</a></li>`).join('')}</ul></div>
    <div><h2>${t(['Company', 'Empresa'])}</h2><ul>
      <li><a href="${L('/work/')}">${t(['Our work', 'Nuestro trabajo'])}</a></li><li><a href="${L('/apps/')}">Apps</a></li><li><a href="${L('/downloads/')}">${t(['Downloads', 'Descargas'])}</a></li>
      <li><a href="${L('/industries/')}">${t(['Industries', 'Industrias'])}</a></li><li><a href="${L('/resources/')}">${t(['Resources', 'Recursos'])}</a></li><li><a href="${L('/about/')}">${t(['About', 'Acerca de'])}</a></li><li><a href="${L('/faq/')}">${t(['FAQ', 'Preguntas'])}</a></li></ul></div>
    <div><h2>${t(['Contact', 'Contacto'])}</h2><ul>
      <li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="${L('/contact/')}">${t(['Contact form', 'Formulario de contacto'])}</a></li><li><a href="${L('/support/')}">${t(['Support', 'Soporte'])}</a></li>
      <li><a href="https://www.linkedin.com/company/varger-group" rel="noopener" target="_blank">LinkedIn</a></li><li><a href="${L('/privacy/')}">${t(['Privacy', 'Privacidad'])}</a></li><li><a href="${L('/terms/')}">${t(['Terms', 'Términos'])}</a></li></ul></div>
  </div>
  <div class="wrap foot-end"><p>${t(ui.footerLine)}</p><p>© 2026 ${site.legal}. ${t(ui.rights)}</p></div>
</footer>
<script src="/js/site.js?v=${site.updated}" defer></script>
<elevenlabs-convai agent-id="agent_6501m7nyr3eyfgsaypksn87xnmad" variant="compact" action-text="${t(['Talk to Sofía', 'Habla con Sofía'])}" start-call-text="${t(['Start call', 'Iniciar llamada'])}" end-call-text="${t(['End', 'Colgar'])}" expand-text="${t(['Talk to Sofía', 'Habla con Sofía'])}" listening-text="${t(['Listening…', 'Escuchando…'])}" speaking-text="${t(['Sofía is speaking', 'Sofía está hablando'])}"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
</body>
</html>`;
}
function add(c, p) {
  pages.push({ path: c.L(p.path), lang: c.lang, basePath: p.path, title: p.title, desc: p.desc, html: layout(c, p), llm: p.llm });
}
const head = (c, eyebrow, h, text, tag = 'h1') => `<p class="eyebrow">${esc(eyebrow)}</p><${tag}>${esc(h)}</${tag}>${text ? `<p class="lead">${esc(text)}</p>` : ''}`;

// ---------- Producto estrella: Recepcionista IA (intro de valor → demo → tu negocio → pago) ----------
const STRIPE_RECEPCIONISTA = process.env.STRIPE_RECEPCIONISTA || (process.env.STAGING ? 'https://buy.stripe.com/test_4gMdRa4Kp2YU3va9IQ0gw00' : '');
const TALK_URL = 'https://elevenlabs.io/app/talk-to?agent_id=agent_6501m7nyr3eyfgsaypksn87xnmad';
function payBtn(c, cls = '') {
  const { t, L } = c;
  return STRIPE_RECEPCIONISTA
    ? `<a class="btn ${cls}" href="${STRIPE_RECEPCIONISTA}" data-pay>${icon('check', 'ico sm')} ${esc(t(['Pay & activate', 'Pagar y activar']))}</a>`
    : `<a class="btn ${cls}" href="${L('/ai/start/')}?service=ai-receptionist">${esc(t(['Activate my receptionist', 'Activar mi recepcionista']))}</a>`;
}
function talkBtn(c, cls = 'ghost') {
  const { t } = c;
  return `<a class="btn ${cls}" href="${TALK_URL}" data-talk target="_blank" rel="noopener">${icon('phone', 'ico sm')} ${esc(t(['Talk to Sofía now', 'Habla con Sofía ahora']))}</a>`;
}
function spotlight(c, onHome) {
  const { t, L } = c;
  const slides = [
    ['phone', ['What it is', 'Qué es'], ['A receptionist with a natural voice that answers your business line 24/7, in English or Spanish, without asking.', 'Una recepcionista con voz natural que contesta tu línea 24/7, en inglés o español, sin preguntar.'], null],
    ['calendar', ['How it helps', 'Cómo te ayuda'], ['Answers prices, hours and services from your own info, takes name and phone, books, and emails you a summary of every call.', 'Responde precios, horarios y servicios con tu información, toma nombre y teléfono, agenda y te manda por correo el resumen de cada llamada.'], null],
    ['chart', ['What you gain', 'Qué ganas'], ['44% of business calls go unanswered (Invoca, 2026, 70M calls). 82% of callers would try a competitor instead (CallRail, 2025).', 'El 44% de las llamadas a negocios no se contesta (Invoca, 2026, 70 millones de llamadas). El 82% buscaría a la competencia (CallRail, 2025).'],
      [['No missed calls, day or night', 'Cero llamadas perdidas, de día y de noche'], ['Half your callers speak Spanish? Covered', '¿La mitad llama en español? Cubierto'], ['From $349/month, less than a part-time hire', 'Desde $349 al mes, menos que medio turno']]],
  ];
  return `<section class="sec spot" id="recepcionista"><div class="wrap">
  <p class="eyebrow">${esc(t(['Featured product', 'Producto estrella']))}</p>
  <${onHome ? 'h2' : 'h2'}>${esc(t(['AI Receptionist: never miss a call again', 'Recepcionista IA: no vuelvas a perder una llamada']))}</${onHome ? 'h2' : 'h2'}>
  <div class="grid g3 slides">${slides.map(([ic, h, p, list], k) => `<div class="card slide"><span class="status">${k + 1} / 3</span><div class="slide-art">${illus(ic === 'chart' ? 'spark' : ic, t(h))}</div><h3>${esc(t(h))}</h3><p>${esc(t(p))}</p>${list ? `<ul class="checks">${list.map(x => `<li>${esc(t(x))}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
  ${onHome ? `<h3 class="mt flow-title">${esc(t(['How it works: from demo to your live line', 'Cómo funciona: del demo a tu línea']))}</h3>${flowDiagram(c)}` : ''}
  <div class="demo-band"><span class="band-ico">${icon('phone', 'ico')}</span><div class="band-txt"><h3>${esc(t(['Live demo: talk to Sofía', 'Demo en vivo: habla con Sofía']))}</h3><p>${esc(t(['She is the product. Ask her anything about VARGERSOFT in English or Spanish, then give her your name and number.', 'Ella es el producto. Pregúntale lo que quieras de VARGERSOFT en inglés o español y déjale tu nombre y teléfono.']))}</p></div>
    <div class="hero-cta">${talkBtn(c, '')}</div></div>
  <div class="demo-band real"><span class="band-ico">${icon('bot', 'ico')}</span><div class="band-txt"><h3>${esc(t(['Now with your business', 'Ahora con tu negocio']))}</h3><p>${esc(t(['Your own assistant with her name, badge and your industry playbook: setup $1,950 · $349/month with 500 minutes · extra minute $0.35.', 'Tu propia asistente con su nombre, gafete y la guía de tu giro: instalación $1,950 · $349 al mes con 500 minutos · minuto extra $0.35.']))}</p></div>
    <div class="hero-cta">${payBtn(c)}${onHome ? `<a class="btn ghost" href="${L('/ai/ai-receptionist/')}">${esc(t(['See how it works', 'Ver cómo funciona']))}</a>` : ''}</div></div>
</div></section>`;
}

// ---------- Flujo completo: demo → pago → instalación (íconos + flechas) ----------
const FLOW = [
  ['try', 'chat', ['Talk to Sofía', 'Habla con Sofía'], ['Free live demo, English or Spanish.', 'Demo gratis en vivo, en inglés o español.']],
  ['pay', 'check', ['Pay & activate', 'Paga y activa'], ['Secure Stripe checkout: $1,950 setup + $349/mo.', 'Pago seguro con Stripe: $1,950 instalación + $349/mes.']],
  ['pay', 'mail', ['Check your email', 'Revisa tu correo'], ['Receipt + your setup link, right away.', 'Recibo + tu enlace de alta, al instante.']],
  ['setup', 'sheet', ['Fill the form', 'Llena el formulario'], ['5 minutes: hours, services, prices.', '5 minutos: horario, servicios, precios.']],
  ['setup', 'bot', ['We build her', 'La armamos'], ['Her name, badge and your industry playbook. 1 business day.', 'Su nombre, gafete y la guía de tu giro. 1 día hábil.']],
  ['setup', 'phone', ['You test her', 'La pruebas'], ['We send you a link. Tell us what to adjust.', 'Te mandamos un enlace. Nos dices qué ajustar.']],
  ['setup', 'plug', ['Connect your line', 'Conecta tu línea'], ['New number or call forwarding. Live!', 'Número nuevo o desvío de llamadas. ¡En línea!']],
];
const FASE = { try: ['Try it', 'Pruébala'], pay: ['Pay', 'Pago'], setup: ['Setup', 'Instalación'] };
function flowDiagram(c, here = -1) {
  const { t } = c;
  const steps = FLOW.map(([fase, ic, h, p], i) => `<li class="flow-step f-${fase}${i === here ? ' here' : ''}${here > -1 && i < here ? ' done' : ''}">
    <span class="flow-n">${i + 1}</span><span class="flow-fase">${esc(t(FASE[fase]))}</span>
    <span class="flow-ico">${icon(i < here ? 'check' : ic, 'ico')}</span>
    <h3>${esc(t(h))}</h3><p>${esc(t(p))}</p>${i === here ? `<span class="flow-here">${esc(t(['You are here', 'Estás aquí']))}</span>` : ''}</li>`);
  return `<ol class="flow" aria-label="${esc(t(['How it works, step by step', 'Cómo funciona, paso a paso']))}">${steps.join(`<li class="flow-arrow" aria-hidden="true">${icon('next', 'ico')}</li>`)}</ol>`;
}
function flowSection(c, title, here = -1, alt = true) {
  const { t } = c;
  return `<section class="sec${alt ? ' alt' : ''}"><div class="wrap"><p class="eyebrow">${esc(t(['How it works', 'Cómo funciona']))}</p><h2>${esc(title)}</h2>${flowDiagram(c, here)}</div></section>`;
}

function installGuide(c) {
  const { t } = c;
  const steps = [
    ['sheet', ['1. Tell us about your business', '1. Cuéntanos de tu negocio'], ['5-minute form: hours, services, prices and common questions.', 'Formulario de 5 minutos: horario, servicios, precios y preguntas frecuentes.']],
    ['bot', ['2. We build her', '2. La armamos'], ['Name, badge and your industry playbook. Ready in 1 business day.', 'Nombre, gafete y la guía de tu giro. Lista en 1 día hábil.']],
    ['phone', ['3. You test her', '3. La pruebas'], ['We send you a link to talk to her and adjust what you want.', 'Te mandamos un enlace para hablarle y ajustamos lo que quieras.']],
    ['plug', ['4. Connect your phone', '4. Conecta tu teléfono'], ['Pick one: new number, forward when you can\'t answer (recommended), or forward every call.', 'Elige: número nuevo, desvío cuando no contestas (recomendado) o desvío de todas las llamadas.']],
  ];
  const opts = [
    ['A', ['New number', 'Número nuevo'], ['We give you a new local number in your area. Put it on Google, your site and your truck.', 'Te damos un número local nuevo de tu zona. Ponlo en Google, tu sitio y tu camioneta.']],
    ['B', ['Keep your number · recommended', 'Conserva tu número · recomendado'], ['You answer first; if you don\'t pick up in 4 rings, Sofía does. One code on your phone.', 'Tú contestas primero; si no levantas en 4 timbres, contesta ella. Un código en tu teléfono.']],
    ['C', ['She answers everything', 'Ella contesta todo'], ['Every call goes to her and she transfers to you when needed.', 'Todas las llamadas van a ella y te transfiere cuando hace falta.']],
  ];
  return `<section class="sec alt"><div class="wrap"><p class="eyebrow">${esc(t(['Installation', 'Instalación']))}</p><h2>${esc(t(['From demo to live line in 7 steps', 'Del demo a tu línea en 7 pasos']))}</h2>
  ${flowDiagram(c)}
  <h3 class="mt">${esc(t(['How it connects to your phone', 'Cómo se conecta a tu teléfono']))}</h3>
  <div class="grid g3">${opts.map(([k, h, p]) => `<div class="card opt"><span class="status">${t(['Option', 'Opción'])} ${k}</span><h3>${esc(t(h))}</h3><p>${esc(t(p))}</p></div>`).join('')}</div>
  <p class="pnote">${esc(t(['Works with AT&T, T-Mobile, Verizon and most office lines. We guide you step by step and you can undo it any time.', 'Funciona con AT&T, T-Mobile, Verizon y la mayoría de líneas de oficina. Te guiamos paso a paso y se puede quitar cuando quieras.']))}</p>
</div></section>`;
}

// ---------- páginas ----------
function pageHome(c) {
  const { t, L } = c;
  const pick = ['scorlee-feliz', 'casealerta-screen-1', 'paternoster-amanecer', 'freshie-fresh', 'freshortoss-result', 'casealerta-paywall', 'scorlee-celebrando', 'paternoster-vitral', 'freshie-eat-soon', 'casealerta-screen-3', 'paternoster-oro', 'freshortoss-home'];
  const all = work.flatMap(w => w.items.map(it => ({ it, kind: w.kind })));
  const feat = pick.map(k => all.find(a => a.it.img === k)).filter(Boolean);
  const body = `
<section class="hero">
  <canvas class="fx" data-fx aria-hidden="true"></canvas>
  <div class="wrap hero-in">
    <img class="hero-logo" src="/img/logo.webp" alt="${site.name} — ${esc(t(site.tagline))}" width="692" height="300" fetchpriority="high">
    <p class="chip">${icon('pin', 'ico sm')} ${site.place}</p>
    <h1><span>${esc(t(['Your AI receptionist.', 'Tu recepcionista con IA.']))}</span> <span class="g">${esc(t(['English and Spanish.', 'En inglés y español.']))}</span></h1>
    <p class="hero-sub">${esc(t(['She answers every call 24/7, books, quotes and emails you a summary. From $349/month. Talk to her right now.', 'Contesta cada llamada 24/7, agenda, cotiza y te manda un resumen por correo. Desde $349 al mes. Háblale ahora mismo.']))}</p>
    <div class="hero-cta">${talkBtn(c, '')}${payBtn(c, 'ghost')}</div>
    <ul class="feats">${[['clock', ['24/7, nights & weekends', '24/7, noches y fines']], ['globe', ['English · Español', 'Inglés · Español']], ['calendar', ['Books appointments', 'Agenda citas']], ['mail', ['Summary of every call', 'Resumen de cada llamada']], ['phone', ['Your number or a new one', 'Tu número o uno nuevo']]].map(([ic, l]) => `<li>${icon(ic, 'ico')}<span>${esc(t(l))}</span></li>`).join('')}</ul>
    <p class="strap">${esc(t(home.strap))}</p>
  </div>
</section>
${spotlight(c, true)}
<section class="sec dock-sec"><div class="wrap"><p class="dock-title">${esc(t(home.dock))}</p>${dock(c)}</div></section>
<section class="sec" id="what"><div class="wrap">${head(c, t(home.whatEyebrow), t(home.whatTitle), '', 'h2')}
  <div class="grid g4">${home.what.map(w => `<a class="card what" href="${L(w.href)}"><span class="svc-ico">${icon(w.icon)}</span><h3>${esc(t(w.title))}</h3><p>${esc(t(w.text))}</p></a>`).join('')}</div></div></section>
<section class="sec alt" id="agents"><div class="wrap">${head(c, t(home.agentsEyebrow), t(home.agentsTitle), t(home.agentsText), 'h2')}
  <div class="grid g4">${services.map(s => serviceCard(s, c)).join('')}</div></div></section>
<section class="sec" id="work"><div class="wrap">${head(c, t(home.workEyebrow), t(home.workTitle), t(home.workText), 'h2')}</div>
  <div class="rail" tabindex="0" aria-label="${esc(t(home.workTitle))}">${feat.map(f => workItem(f.it, f.kind, c)).join('')}</div>
  <div class="wrap center"><a class="btn ghost" href="${L('/work/')}">${esc(t(home.workCta))} ${icon('arrow', 'ico sm')}</a></div></section>
<section class="sec alt" id="apps"><div class="wrap">${head(c, t(home.appsEyebrow), t(home.appsTitle), t(home.appsText), 'h2')}
  <div class="grid g4 apps-grid">${apps.map(a => appCard(a, c)).join('')}</div></div></section>
<section class="sec" id="why"><div class="wrap">${head(c, t(home.whyEyebrow), t(home.whyTitle), '', 'h2')}
  <div class="grid g4">${home.why.map(w => `<div class="card flat"><span class="svc-ico">${icon(w.icon)}</span><h3>${esc(t(w.title))}</h3><p>${esc(t(w.text))}</p></div>`).join('')}</div></div></section>
<section class="sec alt" id="track"><div class="wrap two"><div>${head(c, t(home.trackEyebrow), t(home.trackTitle), '', 'h2')}<p>${esc(t(home.trackText))}</p><a class="more" href="${L('/about/')}">${t(['About VARGERSOFT', 'Acerca de VARGERSOFT'])} ${icon('arrow', 'ico sm')}</a></div>
  <div class="nums">${home.numbers.map(n => `<div class="num"><b data-count="${n.n}">${n.n}</b>${n.suffix ? `<i>${n.suffix}</i>` : ''}<span>${esc(t(n.label))}</span></div>`).join('')}</div></div></section>
<section class="sec" id="process"><div class="wrap">${head(c, t(home.processEyebrow), t(home.processTitle), '', 'h2')}
  <ol class="steps">${home.process.map((s, n) => `<li><span class="step-n">0${n + 1}</span><h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p></li>`).join('')}</ol></div></section>
<section class="sec alt" id="industries"><div class="wrap">${head(c, t(home.indEyebrow), t(home.indTitle), '', 'h2')}
  <div class="grid g3">${industries.map(n => `<a class="card ind" href="${L('/industries/' + n.slug + '/')}"><span class="svc-ico">${icon(n.icon)}</span><h3>${esc(t(n.name))}</h3><p>${esc(t(n.pain))}</p></a>`).join('')}</div></div></section>
<section class="sec" id="guides"><div class="wrap">${head(c, t(home.guidesEyebrow), t(home.guidesTitle), '', 'h2')}
  <div class="grid g4">${guides.slice(0, 4).map(g => guideCard(g, c)).join('')}</div><p class="center"><a class="more" href="${L('/resources/')}">${t(['All guides', 'Todas las guías'])} ${icon('arrow', 'ico sm')}</a></p></div></section>
<section class="sec alt" id="faq"><div class="wrap narrow">${head(c, 'FAQ', t(home.faqTitle), '', 'h2')}${faqBlock(faq.slice(0, 6), c, 1)}<p class="center"><a class="more" href="${L('/faq/')}">${t(['All questions', 'Todas las preguntas'])} ${icon('arrow', 'ico sm')}</a></p></div></section>
<section class="sec" id="contact"><div class="wrap two">
  <div>${head(c, t(home.contactEyebrow), t(home.contactTitle), t(home.contactText), 'h2')}<p class="contact-line">${icon('mail', 'ico sm')} <a href="mailto:${site.email}">${site.email}</a></p><p class="contact-line">${icon('pin', 'ico sm')} ${site.place}</p></div>
  ${contactForm(c)}</div></section>`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': site.url + '/#site', url: site.url + '/', name: site.name, inLanguage: ['en', 'es'], publisher: { '@id': site.url + '/#org' } },
    { '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': site.url + '/#service', name: site.name, url: site.url + '/', image: site.url + '/img/og.jpg', email: site.email, priceRange: '$$',
      address: orgLd.address, parentOrganization: { '@id': site.url + '/#org' }, knowsLanguage: ['en', 'es'],
      areaServed: { '@type': 'Country', name: 'United States' },
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'AI agents', itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name[c.i], url: abs(c.L('/ai/' + s.slug + '/')) } })) } },
    faqLd(faq.slice(0, 6), c),
  ];
  add(c, { path: '/', title: t(home.title), desc: t(home.desc), body, ld, cls: 'home' });
}
function guideCard(g, c) {
  const { t, L } = c;
  return `<a class="card guide" href="${L('/resources/' + g.slug + '/')}"><span class="svc-ico">${icon(g.icon)}</span><h3>${esc(t(g.title))}</h3><span class="more">${esc(t(ui.read))} ${icon('arrow', 'ico sm')}</span></a>`;
}
function pageAiHub(c) {
  const { t, L } = c;
  const title = t(['AI Agents for Small and Mid-Size Businesses | VARGERSOFT', 'Agentes de IA para Pequeñas y Medianas Empresas | VARGERSOFT']);
  const desc = t(['Eight AI services that answer calls and chats, book appointments, send quotes, follow up and make your business readable to AI. English and Spanish. Prices on the page.', 'Ocho servicios de IA que contestan llamadas y chats, agendan citas, envían cotizaciones, dan seguimiento y hacen tu negocio legible para la IA. Inglés y español. Precios en la página.']);
  const cr = crumbs([[t(['AI Agents', 'Agentes IA']), L('/ai/')]], c);
  const body = `<section class="sec page-head"><div class="wrap">${cr.html}${head(c, t(home.agentsEyebrow), t(['AI agents for small and mid-size businesses', 'Agentes de IA para pequeñas y medianas empresas']), t(home.agentsText))}
  <p class="pills"><span>${icon('clock', 'ico sm')} ${t(ui.setupTime)}</span><span>${icon('globe', 'ico sm')} English / Español</span><span>${icon('check', 'ico sm')} ${t(ui.cancel)}</span></p></div></section>
<section class="sec"><div class="wrap"><div class="grid g4">${services.map(s => serviceCard(s, c)).join('')}</div>
  <div class="table-wrap"><table class="ptable"><caption>${t(['Prices at a glance', 'Precios de un vistazo'])}</caption><thead><tr><th>${t(['Service', 'Servicio'])}</th><th>${t(ui.setup)}</th><th>${t(['Monthly', 'Mensual'])}</th></tr></thead><tbody>
  ${services.map(s => s.priceLines
    ? `<tr><th scope="row"><a href="${L('/ai/' + s.slug + '/')}">${esc(t(s.name))}</a></th><td>${money(s.priceLines[1].amount)} – ${money(s.priceLines[0].amount)}</td><td>${money(s.priceLines[2].amount)} (${t(['optional', 'opcional'])})</td></tr>`
    : `<tr><th scope="row"><a href="${L('/ai/' + s.slug + '/')}">${esc(t(s.name))}</a></th><td>${money(s.setup)}</td><td>${money(s.monthly)}</td></tr>`).join('')}
  </tbody></table></div></div></section>
<section class="sec alt"><div class="wrap narrow">${head(c, 'FAQ', t(home.faqTitle), '', 'h2')}${faqBlock(faq.slice(1, 9), c)}</div></section>${ctaBand(c)}`;
  const ld = [cr.ld, { '@context': 'https://schema.org', '@type': 'ItemList', name: title, itemListElement: services.map((s, k) => ({ '@type': 'ListItem', position: k + 1, name: s.name[c.i], url: abs(L('/ai/' + s.slug + '/')) })) }, faqLd(faq.slice(1, 9), c)];
  add(c, { path: '/ai/', title, desc, body, ld });
}
function pageService(s, c) {
  const { t, L } = c;
  const lines = priceLines(s, c);
  const cr = crumbs([[t(['AI Agents', 'Agentes IA']), L('/ai/')], [t(s.name), L('/ai/' + s.slug + '/')]], c);
  const rel = services.filter(x => x.slug !== s.slug).slice(0, 4);
  const body = `<section class="sec page-head"><div class="wrap two top-align">
  <div>${cr.html}${head(c, t(home.agentsEyebrow), t(s.name), t(s.lead))}
    <p class="pills"><span>${icon('clock', 'ico sm')} ${t(ui.setupTime)}</span><span>${icon('globe', 'ico sm')} English / Español</span></p>
    <div class="hero-cta">${s.slug === 'ai-receptionist' ? talkBtn(c, '') + payBtn(c, 'ghost') : `<a class="btn" href="${L(['ai-receptionist','website-assistant'].includes(s.slug) ? '/ai/start/' : '/contact/')}?service=${s.slug}">${esc(t(ui.start))}</a><a class="btn ghost" href="${L('/contact/')}">${esc(t(ui.book))}</a>`}</div></div>
  <div class="illus-box">${illus(s.icon, t(s.name))}</div></div></section>
${s.slug === 'ai-receptionist' ? spotlight(c, false) + installGuide(c) : ''}
<section class="sec"><div class="wrap two top-align">
  <div class="prose"><h2>${t(ui.problem)}</h2><p>${esc(t(s.problem))}</p>
    <h2>${t(ui.does)}</h2><ul class="checks">${s.does.map(d => `<li>${esc(t(d))}</li>`).join('')}</ul>
    <h2>${t(ui.includes)}</h2><ul class="checks">${s.includes.map(d => `<li>${esc(t(d))}</li>`).join('')}</ul></div>
  <aside class="pricebox" aria-label="${t(ui.price)}"><h2>${t(ui.price)}</h2>
    ${lines.map(l => `<div class="pline"><span>${esc(l.label)}</span><b>${money(l.amount)}</b><small>${esc(l.unit)}</small></div>`).join('')}
    ${s.priceNote ? `<p class="pnote">${esc(t(s.priceNote))}</p>` : ''}
    <p class="pnote">${t(ui.cancel)}</p>
    ${s.slug === 'ai-receptionist' ? payBtn(c, 'full') + `<p class="pnote">${t(['Secure payment with Stripe. Your assistant is built and tested with you before we connect your phone.', 'Pago seguro con Stripe. Tu asistente se arma y se prueba contigo antes de conectar tu teléfono.'])}</p>` : `<a class="btn full" href="${L(['ai-receptionist','website-assistant'].includes(s.slug) ? '/ai/start/' : '/contact/')}?service=${s.slug}">${esc(t(ui.start))}</a>`}</aside></div></section>
<section class="sec alt"><div class="wrap narrow"><h2>${t(ui.faq)}</h2>${faqBlock(s.faq, c, 1)}</div></section>
<section class="sec"><div class="wrap"><h2>${t(ui.related)}</h2><div class="grid g4">${rel.map(x => serviceCard(x, c)).join('')}</div></div></section>${ctaBand(c, '?service=' + s.slug)}`;
  const offers = s.priceLines
    ? s.priceLines.map(l => ({ '@type': 'Offer', name: l.label[c.i], price: l.amount, priceCurrency: 'USD' }))
    : [{ '@type': 'Offer', name: ui.setup[c.i], price: s.setup, priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Monthly service', price: s.monthly, priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: s.monthly, priceCurrency: 'USD', unitCode: 'MON' } }];
  const ld = [cr.ld, { '@context': 'https://schema.org', '@type': 'Service', name: t(s.name), description: t(s.desc), url: abs(L('/ai/' + s.slug + '/')), provider: { '@id': site.url + '/#org' }, areaServed: 'US', availableLanguage: ['en', 'es'], offers }, faqLd(s.faq, c)];
  add(c, { path: '/ai/' + s.slug + '/', title: t(s.title) + ' | VARGERSOFT', desc: t(s.desc), body, ld,
    llm: { name: t(s.name), price: lines.map(l => `${l.label}: ${money(l.amount)} ${l.unit}`).join('; '), text: [t(s.lead), t(s.problem), ...s.does.map(t), ...s.includes.map(t)], faq: s.faq } });
}
function pageApps(c) {
  const { t, L } = c;
  const title = t(['Apps Built by VARGERSOFT', 'Apps Hechas por VARGERSOFT']);
  const desc = t(['Eight apps designed, built and run by VARGERSOFT: DERATE, Paternoster, Fresh or Toss, CaseAlerta, Recalert, SignatureForever, Scorlee and BajaBill.', 'Ocho apps diseñadas, construidas y operadas por VARGERSOFT: DERATE, Paternoster, Fresh or Toss, CaseAlerta, Recalert, SignatureForever, Scorlee y BajaBill.']);
  const cr = crumbs([['Apps', L('/apps/')]], c);
  const body = `<section class="sec page-head"><div class="wrap">${cr.html}${head(c, t(home.appsEyebrow), t(['Apps built by VARGERSOFT', 'Apps hechas por VARGERSOFT']), t(home.appsText))}${dock(c)}</div></section>
<section class="sec"><div class="wrap"><div class="grid g3 apps-grid">${apps.map(a => appCard(a, c)).join('')}</div></div></section>
<section class="sec alt"><div class="wrap narrow center"><h2>${t(['Want an app like these for your business?', '¿Quieres una app así para tu negocio?'])}</h2><p>${t(['We design and build apps at a fixed price: the product, the brand, the store page and the paywall.', 'Diseñamos y construimos apps a precio fijo: el producto, la marca, la página de tienda y el paywall.'])}</p><p><a class="btn" href="${L('/work/')}">${t(home.workCta)}</a></p></div></section>${ctaBand(c)}`;
  const ld = [cr.ld, { '@context': 'https://schema.org', '@type': 'ItemList', name: title, itemListElement: apps.map((a, k) => ({ '@type': 'ListItem', position: k + 1, name: a.name, url: a.site })) }];
  add(c, { path: '/apps/', title: title + ' | VARGERSOFT', desc, body, ld });
}
function pageWork(c) {
  const { t, L } = c;
  const title = t(['Our Work: App Design, Mascots, Paywalls and Screens', 'Nuestro Trabajo: Diseño de Apps, Mascotas, Paywalls y Pantallas']);
  const desc = t(['Real art and product from apps VARGERSOFT designed and built: mascots, app screens, store pages, paywalls and full-screen illustration.', 'Arte y producto reales de apps que VARGERSOFT diseñó y construyó: mascotas, pantallas, páginas de tienda, paywalls e ilustración a pantalla completa.']);
  const cr = crumbs([[t(['Work', 'Trabajo']), L('/work/')]], c);
  const body = `<section class="sec page-head"><div class="wrap">${cr.html}${head(c, t(home.workEyebrow), t(home.workTitle), t(home.workText))}${dock(c)}</div></section>
${work.map((w, n) => `<section class="sec${n % 2 ? ' alt' : ''}" id="${w.key}"><div class="wrap">${head(c, '0' + (n + 1), t(w.title), t(w.text), 'h2')}</div><div class="rail" tabindex="0" aria-label="${esc(t(w.title))}">${w.items.map(it => workItem(it, w.kind, c)).join('')}</div></section>`).join('')}
<section class="sec alt"><div class="wrap narrow center"><h2>${t(['What we build for a client', 'Qué construimos para un cliente'])}</h2>
  <ul class="checks cols">${[['The product: mobile app or web app, in English and Spanish', 'El producto: app móvil o web, en inglés y español'], ['Brand: name, icon, mascot and color system', 'Marca: nombre, ícono, mascota y sistema de color'], ['Store page: screenshots, description and keywords', 'Página de tienda: capturas, descripción y palabras clave'], ['Paywall, subscriptions and payments', 'Paywall, suscripciones y pagos'], ['Its own website, built to be found', 'Su propio sitio web, hecho para ser encontrado'], ['Launch, measurement and updates', 'Lanzamiento, medición y actualizaciones']].map(x => `<li>${t(x)}</li>`).join('')}</ul>
  <p><a class="btn" href="${L('/contact/')}?service=custom-app">${t(ui.book)}</a></p></div></section>`;
  add(c, { path: '/work/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld] });
}
function pageDownloads(c) {
  const { t, L } = c;
  const title = t(['Templates and Kits: Excel, Google Sheets and Notion', 'Plantillas y Kits: Excel, Google Sheets y Notion']);
  const desc = t(['Operations templates for inventory, quality, cash flow, point of sale and fleet maintenance, plus AI kits launching soon.', 'Plantillas de operación para inventario, calidad, flujo de efectivo, punto de venta y mantenimiento de flota, más kits de IA próximamente.']);
  const cr = crumbs([[t(['Downloads', 'Descargas']), L('/downloads/')]], c);
  const body = `<section class="sec page-head"><div class="wrap">${cr.html}${head(c, t(home.tplEyebrow), t(home.tplTitle), t(['Tools already running in real companies. Ask for details, pricing or a version tailored to your operation.', 'Herramientas que ya operan en empresas reales. Pide detalles, precio o una versión a la medida de tu operación.']))}</div></section>
<section class="sec"><div class="wrap"><h2>${t(['Templates', 'Plantillas'])}</h2><div class="grid g3">${templates.map(x => `<div class="card flat tpl"><span class="svc-ico">${icon(x.icon)}</span><h3>${esc(t(x.name))}</h3><p>${esc(t(x.desc))}</p><span class="fmt">${x.fmt}</span><a class="more" href="${L('/contact/')}?product=${encodeURIComponent(x.name[0])}">${t(ui.details)} ${icon('arrow', 'ico sm')}</a></div>`).join('')}</div></div></section>
<section class="sec alt"><div class="wrap"><h2>${t(['AI kits', 'Kits de IA'])}</h2><p class="lead">${t(['Instant downloads you set up yourself. Leave your email and we tell you the day they launch.', 'Descargas inmediatas que instalas tú mismo. Deja tu correo y te avisamos el día que salgan.'])}</p>
  <div class="grid g3">${kits.map(k => `<div class="card flat tpl" id="${k.slug}"><span class="svc-ico">${icon(k.icon)}</span><span class="status s-early">${t(ui.soon)}</span><h3>${esc(t(k.name))}</h3><p>${esc(t(k.desc))}</p><span class="svc-price">${money(k.price)}</span><a class="btn sm ghost" href="${L('/contact/')}?product=${k.slug}">${t(ui.notify)}</a></div>`).join('')}</div></div></section>${ctaBand(c)}`;
  add(c, { path: '/downloads/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld] });
}
function pageIndustries(c) {
  const { t, L } = c;
  const title = t(['AI Agents by Industry', 'Agentes de IA por Industria']);
  const desc = t(['How AI voice receptionists and AI agents fit construction, roofing, manufacturing, oil and gas, repair shops, clinics, contractors, law firms, retail and distribution, with the agents we recommend for each.', 'Cómo encajan la recepcionista de IA con voz y los agentes de IA en constructoras, roofing, industria, petroleras, talleres, clínicas, contratistas, despachos, tiendas y distribución, con los agentes que recomendamos para cada uno.']);
  const cr = crumbs([[t(['Industries', 'Industrias']), L('/industries/')]], c);
  const body = `<section class="sec page-head"><div class="wrap">${cr.html}${head(c, t(home.indEyebrow), t(home.indTitle), desc)}</div></section>
<section class="sec"><div class="wrap"><div class="grid g3">${industries.map(n => `<a class="card ind" href="${L('/industries/' + n.slug + '/')}"><span class="svc-ico">${icon(n.icon)}</span><h3>${esc(t(n.name))}</h3><p>${esc(t(n.pain))}</p><span class="more">${t(['See the agents that fit', 'Ver los agentes que encajan'])} ${icon('arrow', 'ico sm')}</span></a>`).join('')}</div></div></section>${ctaBand(c)}`;
  add(c, { path: '/industries/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld] });
  for (const n of industries) {
    const cr2 = crumbs([[t(['Industries', 'Industrias']), L('/industries/')], [t(n.name), L('/industries/' + n.slug + '/')]], c);
    const b = `<section class="sec page-head"><div class="wrap">${cr2.html}<span class="svc-ico big">${icon(n.icon)}</span>${head(c, t(home.indEyebrow), t(['AI agents for ', 'Agentes de IA para ']) + t(n.name).toLowerCase(), t(n.pain))}</div></section>
<section class="sec alt"><div class="wrap narrow prose"><h2>${esc(t(['AI voice receptionist for ', 'Recepcionista de IA con voz para ']) + t(n.name).toLowerCase())}</h2><p>${esc(t(n.voice || ['The AI voice receptionist answers every call on the first ring, 24/7, in English or Spanish. It answers questions with your approved information, books appointments, takes messages, transfers to a person when needed and emails you a summary of every call.', 'La recepcionista de IA con voz contesta cada llamada al primer timbre, 24/7, en inglés o español. Responde con tu información aprobada, agenda citas, toma recados, transfiere a una persona cuando hace falta y te manda por correo un resumen de cada llamada.']))}</p><p><a class="btn" href="${L('/ai/ai-receptionist/')}">${esc(t(['See the AI Voice Receptionist', 'Ver la Recepcionista de IA con Voz']))}</a> <a class="btn ghost" href="${L('/resources/what-is-an-ai-voice-receptionist/')}">${esc(t(['How it works', 'Cómo funciona']))}</a></p></div></section>
<section class="sec"><div class="wrap"><h2>${t(['The agents that fit', 'Los agentes que encajan'])}</h2><div class="grid g4">${n.fits.map(f => serviceCard(svc(f), c)).join('')}</div>${n.note ? `<p class="callout">${icon('check', 'ico sm')} ${esc(t(n.note))}</p>` : ''}</div></section>${ctaBand(c)}`;
    add(c, { path: '/industries/' + n.slug + '/', title: (n.title ? t(n.title) : t(['AI Agents for ', 'Agentes de IA para ']) + t(n.name)) + ' | VARGERSOFT', desc: t(n.desc), body: b, ld: [cr2.ld] });
  }
}
function pageResources(c) {
  const { t, L } = c;
  const title = t(['Resources: Plain Guides on AI for Business', 'Recursos: Guías Claras sobre IA para Negocios']);
  const desc = t(['Plain-language guides on AI receptionists, SEO, AEO and GEO, llms.txt, MCP and WebMCP, and what a small business should automate first.', 'Guías en lenguaje claro sobre recepcionistas con IA, SEO, AEO y GEO, llms.txt, MCP y WebMCP, y qué debe automatizar primero un negocio pequeño.']);
  const cr = crumbs([[t(['Resources', 'Recursos']), L('/resources/')]], c);
  const body = `<section class="sec page-head"><div class="wrap">${cr.html}${head(c, t(home.guidesEyebrow), t(home.guidesTitle), desc)}</div></section>
<section class="sec"><div class="wrap"><div class="grid g4">${guides.map(g => guideCard(g, c)).join('')}</div></div></section>${ctaBand(c)}`;
  add(c, { path: '/resources/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld] });
  for (const g of guides) {
    const cr2 = crumbs([[t(['Resources', 'Recursos']), L('/resources/')], [t(g.title), L('/resources/' + g.slug + '/')]], c);
    const table = g.table ? `<div class="table-wrap"><table class="ptable"><thead><tr>${g.table.head.map(h => `<th>${esc(t(h))}</th>`).join('')}</tr></thead><tbody>${g.table.rows.map(r => `<tr>${r.map((x, k) => k ? `<td>${esc(t(x))}</td>` : `<th scope="row">${esc(t(x))}</th>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
    const secs = g.sections.map(s => `<h2>${esc(t(s.h))}</h2>${(s.p || []).map(p => `<p>${esc(t(p))}</p>`).join('')}${s.list ? `<ul class="checks">${s.list.map(x => `<li>${esc(t(x))}</li>`).join('')}</ul>` : ''}${(s.after || []).map(p => `<p>${esc(t(p))}</p>`).join('')}`).join('');
    const src = g.sources ? `<h2>${t(ui.sources)}</h2><ul class="sources">${g.sources.map(([n, u]) => `<li><a href="${u}" rel="noopener" target="_blank">${esc(n)}</a></li>`).join('')}</ul>` : '';
    const b = `<article><section class="sec page-head"><div class="wrap narrow">${cr2.html}<p class="eyebrow">${t(['Guide', 'Guía'])}</p><h1>${esc(t(g.title))}</h1><p class="answer">${esc(t(g.answer))}</p><p class="meta">${t(ui.reviewed)}: ${t(legalUpdated)} · VARGERSOFT</p></div></section>
<section class="sec"><div class="wrap narrow prose">${table}${secs}${src}</div></section></article>
<section class="sec alt"><div class="wrap"><h2>${t(ui.related)}</h2><div class="grid g4">${g.related.map(f => serviceCard(svc(f), c)).join('')}</div></div></section>${ctaBand(c)}`;
    const ld = [cr2.ld, { '@context': 'https://schema.org', '@type': 'Article', headline: t(g.title), description: t(g.desc), inLanguage: c.lang, datePublished: site.updated, dateModified: site.updated, author: { '@id': site.url + '/#org' }, publisher: { '@id': site.url + '/#org' }, mainEntityOfPage: abs(L('/resources/' + g.slug + '/')), image: site.url + '/img/og.jpg' }];
    add(c, { path: '/resources/' + g.slug + '/', title: t(g.title) + ' | VARGERSOFT', desc: t(g.desc), body: b, ld, article: true,
      llm: { name: t(g.title), text: [t(g.answer), ...g.sections.flatMap(s => [t(s.h), ...(s.p || []).map(t), ...(s.list || []).map(t), ...(s.after || []).map(t)])] } });
  }
}
function pageFaq(c) {
  const { t, L } = c;
  const title = t(['Frequently Asked Questions', 'Preguntas Frecuentes']);
  const desc = t(['Answers about VARGERSOFT AI agents: prices, setup time, languages, contracts, data ownership and how to get started.', 'Respuestas sobre los agentes de IA de VARGERSOFT: precios, tiempo de instalación, idiomas, contratos, propiedad de datos y cómo empezar.']);
  const cr = crumbs([[t(['FAQ', 'Preguntas']), L('/faq/')]], c);
  const body = `<section class="sec page-head"><div class="wrap narrow">${cr.html}${head(c, 'FAQ', t(home.faqTitle), desc)}</div></section><section class="sec"><div class="wrap narrow">${faqBlock(faq, c, 2)}</div></section>${ctaBand(c)}`;
  add(c, { path: '/faq/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld, faqLd(faq, c)], llm: { name: title, faq } });
}
function pageAbout(c) {
  const { t, L } = c;
  const title = t(['About VARGERSOFT', 'Acerca de VARGERSOFT']);
  const desc = t(['VARGERSOFT is the software division of VARGER Group LLC, Conroe, Texas: engineers with 24 years in operations who build AI agents, apps and websites.', 'VARGERSOFT es la división de software de VARGER Group LLC, Conroe, Texas: ingenieros con 24 años en operación que crean agentes de IA, apps y sitios web.']);
  const cr = crumbs([[t(['About', 'Acerca de']), L('/about/')]], c);
  const story = [
    [['We built the software we could not buy', 'Construimos el software que no pudimos comprar'], ['For years we bought business software for our own companies, and for years we ended up running the business from a spreadsheet next to it. Then we noticed the same spreadsheet on every other owner\'s desk: hardware, parts, transportation, manufacturing. Small and mid-size businesses are sold enterprise software with features removed and the price barely reduced. VARGERSOFT exists to close that gap.', 'Durante años compramos software de negocio para nuestras propias empresas, y durante años terminamos operando desde una hoja de cálculo a un lado. Luego notamos la misma hoja en el escritorio de cada empresario: ferretería, refacciones, transporte, manufactura. A las pequeñas y medianas empresas les venden software corporativo con funciones quitadas y el precio apenas reducido. VARGERSOFT existe para cerrar esa brecha.']],
    [['Anyone can write code now. Knowing what to build is the hard part.', 'Hoy cualquiera puede escribir código. Saber qué construir es lo difícil.'], ['AI made software cheap to produce. It did not make it easier to know which step of a process is actually costing the money. That takes having signed the payroll, chased the missing part and closed a month that did not add up. We use AI as a tool and bring the operating judgment ourselves.', 'La IA abarató producir software. No hizo más fácil saber qué paso de un proceso es el que realmente cuesta dinero. Eso exige haber firmado la nómina, perseguido la refacción que no llegó y cerrado un mes que no cuadraba. Usamos la IA como herramienta y ponemos el criterio de operación nosotros.']],
    [['Where the experience comes from', 'De dónde viene la experiencia'], [home.trackText[0], home.trackText[1]]],
  ];
  const body = `<section class="sec page-head"><div class="wrap narrow">${cr.html}${head(c, t(home.trackEyebrow), t(home.trackTitle), desc)}</div></section>
<section class="sec"><div class="wrap narrow prose">${story.map(([h, p]) => `<h2>${esc(t(h))}</h2><p>${esc(t(p))}</p>`).join('')}</div></section>
<section class="sec alt"><div class="wrap"><div class="nums wide">${home.numbers.map(n => `<div class="num"><b data-count="${n.n}">${n.n}</b>${n.suffix ? `<i>${n.suffix}</i>` : ''}<span>${esc(t(n.label))}</span></div>`).join('')}</div></div></section>
<section class="sec"><div class="wrap">${head(c, t(home.processEyebrow), t(home.processTitle), '', 'h2')}<ol class="steps">${home.process.map((s, n) => `<li><span class="step-n">0${n + 1}</span><h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p></li>`).join('')}</ol></div></section>
<section class="sec alt"><div class="wrap narrow prose"><h2>${t(['Company details', 'Datos de la empresa'])}</h2><ul class="checks"><li>${t(['Legal entity: VARGER Group LLC, a Texas limited liability company', 'Razón social: VARGER Group LLC, sociedad de responsabilidad limitada de Texas'])}</li><li>${t(['Trade name: VARGERSOFT', 'Nombre comercial: VARGERSOFT'])}</li><li>${t(['Location: Conroe, Texas, United States', 'Ubicación: Conroe, Texas, Estados Unidos'])}</li><li>${t(['Contact', 'Contacto'])}: <a href="mailto:${site.email}">${site.email}</a></li></ul></div></section>${ctaBand(c)}`;
  add(c, { path: '/about/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld, { '@context': 'https://schema.org', '@type': 'AboutPage', name: title, url: abs(L('/about/')), about: { '@id': site.url + '/#org' } }],
    llm: { name: title, text: story.flatMap(([h, p]) => [t(h), t(p)]) } });
}
const GIROS = [['generico',['Other business','Otro negocio']],['taller_diesel',['Diesel / truck repair shop','Taller diésel / camiones']],['refaccionaria',['Auto or truck parts store','Refaccionaria']],['clinica_dental',['Dental clinic','Clínica dental']],['clinica_medica',['Medical office','Consultorio médico']],['despacho_legal',['Law firm','Despacho legal']],['contratista',['Contractor / remodeling','Contratista / remodelación']],['hvac_plomeria',['A/C, heating & plumbing','A/C, calefacción y plomería']],['restaurante',['Restaurant','Restaurante']],['salon_belleza',['Salon / spa','Salón de belleza / spa']],['veterinaria',['Veterinary clinic','Veterinaria']],['bienes_raices',['Real estate','Bienes raíces']],['agencia_ia',['Agency / software','Agencia / software']]];
const ALTA_URL = 'https://pawcwvwchlzgrrijipqu.supabase.co/functions/v1/alta-cliente';
function pageStart(c) {
  const { t, L } = c;
  const title = t(['Start your AI receptionist', 'Activa tu recepcionista IA']);
  const desc = t(['Tell us about your business in 5 minutes. We build your bilingual AI receptionist, you test it, then we connect it to your phone.', 'Cuéntanos de tu negocio en 5 minutos. Armamos tu recepcionista IA bilingüe, la pruebas y la conectamos a tu teléfono.']);
  const cr = crumbs([[t(['AI Agents', 'Agentes IA']), L('/ai/')], [title, L('/ai/start/')]], c);
  const steps = [['sheet',['Fill this form','Llena este formulario'],['5 minutes: your business, hours, services and prices.','5 minutos: tu negocio, horario, servicios y precios.']],
    ['spark',['We build her','La armamos'],['Your assistant gets her own name, badge and the playbook for your industry.','Tu asistente recibe nombre, gafete y la guía de tu giro.']],
    ['phone',['You test her','La pruebas'],['We send you a link to talk to her and you tell us what to adjust.','Te mandamos un enlace para hablar con ella y nos dices qué ajustar.']],
    ['plug',['We connect her','La conectamos'],['To a new number or your current one, with a step-by-step guide.','A un número nuevo o al tuyo, con guía paso a paso.']]];
  const f = (name, label, attrs = '', full = false) => `<label${full ? ' class="full"' : ''}>${esc(t(label))}<input name="${name}" ${attrs}></label>`;
  const ta = (name, label, ph) => `<label class="full">${esc(t(label))}<textarea name="${name}" rows="4" placeholder="${esc(t(ph))}"></textarea></label>`;
  const body = `<section class="sec page-head"><div class="wrap">${cr.html}${head(c, t(['Onboarding', 'Alta']), title, desc)}
  ${flowDiagram(c, 3)}</div></section>
<section class="sec"><div class="wrap narrow">
<div class="demo-band paid-ok" style="justify-content:flex-start;margin-bottom:1.4rem" id="pagoOk" hidden><span class="band-ico">${icon('check', 'ico')}</span><div style="flex:1"><h3>${esc(t(['Payment received. Thank you!', '¡Pago recibido, gracias!']))}</h3><p>${esc(t(['Last step: fill this form so we can build your receptionist. It takes 5 minutes.', 'Último paso: llena este formulario para armar tu recepcionista. Toma 5 minutos.']))}</p></div></div>
<form class="form" id="alta" novalidate>
  <input type="hidden" name="servicio" value="ai-receptionist">
  <input type="hidden" name="stripe_session" id="stripeSession">
  <input name="sitio_web_2" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
  ${f('negocio', ['Business name', 'Nombre del negocio'], 'required maxlength="120"')}
  <label>${t(['Industry', 'Giro'])}<select name="giro">${GIROS.map(([v, n]) => `<option value="${v}">${esc(t(n))}</option>`).join('')}</select></label>
  ${f('contacto', ['Your name', 'Tu nombre'], 'required maxlength="120" autocomplete="name"')}
  ${f('telefono', ['Phone', 'Teléfono'], 'required type="tel" autocomplete="tel"')}
  ${f('correo', ['Email (call summaries go here)', 'Correo (aquí llegan los resúmenes)'], 'required type="email" autocomplete="email"', true)}
  ${f('sitio_web', ['Website (optional)', 'Sitio web (opcional)'], 'type="url" placeholder="https://"')}
  ${f('zona', ['Address or service area', 'Dirección o zona de servicio'])}
  ${ta('horario', ['Business hours', 'Horario'], ['Mon–Fri 8am–6pm, Sat 8am–2pm', 'Lun–Vie 8–6, Sáb 8–2'])}
  ${ta('servicios', ['Services and prices she can share', 'Servicios y precios que puede dar'], ['Oil change $89. Diagnostic $120. Brakes from $250…', 'Cambio de aceite $89. Diagnóstico $120. Frenos desde $250…'])}
  ${ta('preguntas', ['Questions customers always ask (with the answer)', 'Preguntas que siempre hacen (con su respuesta)'], ['Do you take walk-ins? Yes, until 4pm…', '¿Atienden sin cita? Sí, hasta las 4…'])}
  ${ta('transferir', ['When should she pass the call to a person?', '¿Cuándo debe pasar la llamada a una persona?'], ['Emergencies, complaints, quotes over $2,000…', 'Emergencias, quejas, cotizaciones mayores a $2,000…'])}
  <label>${t(['Phone number', 'Número'])}<select name="numero"><option value="conservar">${t(['Keep my number (she answers when I can\'t)', 'Conservar mi número (ella contesta cuando no puedo)'])}</option><option value="nuevo">${t(['New number', 'Número nuevo'])}</option><option value="todas">${t(['She answers every call', 'Ella contesta todas'])}</option></select></label>
  <label>${t(['Languages', 'Idiomas'])}<select name="idioma"><option value="auto">English + Español</option><option value="es">Español</option><option value="en">English</option></select></label>
  ${f('nombre_asistente', ['Assistant name (optional)', 'Nombre de la asistente (opcional)'], 'maxlength="30" placeholder="Sofía, Lucía, Elena…"', true)}
  <button class="btn" type="submit">${t(['Send and build my assistant', 'Enviar y armar mi asistente'])}</button>
  <p class="form-note" data-msg>${t(['Setup $1,950 · $349/month with 500 minutes · extra minute $0.35. You pay only after you approve her.', 'Instalación $1,950 · $349 al mes con 500 minutos · minuto extra $0.35. Pagas hasta que la apruebes.'])}</p>
</form></div></section>
<script>(function(){var f=document.getElementById('alta');var q=new URLSearchParams(location.search).get('service');if(q)f.servicio.value=q;f.addEventListener('submit',async function(e){e.preventDefault();var m=f.querySelector('[data-msg]'),b=f.querySelector('button');var d=Object.fromEntries(new FormData(f));if(!d.negocio||!d.contacto||!d.correo||!d.telefono){m.textContent=${JSON.stringify(t(['Please fill business, name, phone and email.', 'Llena negocio, nombre, teléfono y correo.']))};return;}b.disabled=true;m.textContent=${JSON.stringify(t(['Sending…', 'Enviando…']))};try{var r=await fetch('${ALTA_URL}',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});var j=await r.json();if(j.ok){f.innerHTML='<div class="full"><h2>'+${JSON.stringify(t(['Received!', '¡Recibido!']))}+'</h2><p>'+${JSON.stringify(t(['Your assistant is being built:', 'Tu asistente está en preparación:']))}+' <b>'+(j.asistente||'')+'</b> · '+(j.gafete||'')+'. '+${JSON.stringify(t(['Check your email for next steps.', 'Revisa tu correo para los siguientes pasos.']))}+'</p></div>';}else{m.textContent=j.error||'Error';b.disabled=false;}}catch(x){m.textContent='Error. sales@vargersoft.com';b.disabled=false;}});})();</script>`;
  add(c, { path: '/ai/start/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld] });
}

function pageContact(c) {
  const { t, L } = c;
  const title = t(['Contact VARGERSOFT', 'Contacto VARGERSOFT']);
  const desc = t(['Tell us what is slowing your business down. We reply within one business day, in English or Spanish. sales@vargersoft.com', 'Cuéntanos qué está frenando tu negocio. Respondemos en un día hábil, en inglés o español. sales@vargersoft.com']);
  const cr = crumbs([[t(['Contact', 'Contacto']), L('/contact/')]], c);
  const body = `<section class="sec page-head"><div class="wrap two top-align"><div>${cr.html}${head(c, t(home.contactEyebrow), t(home.contactTitle), t(home.contactText))}
  <p class="sent" data-sent hidden>${icon('check', 'ico sm')} ${t(['Message received. We reply within one business day.', 'Mensaje recibido. Respondemos en un día hábil.'])}</p>
  <p class="contact-line">${icon('mail', 'ico sm')} <a href="mailto:${site.email}">${site.email}</a></p><p class="contact-line">${icon('pin', 'ico sm')} ${site.place}</p><p class="contact-line">${icon('clock', 'ico sm')} ${t(['Monday to Friday, 9:00–18:00 Central', 'Lunes a viernes, 9:00–18:00 hora del centro'])}</p></div>${contactForm(c)}</div></section>`;
  add(c, { path: '/contact/', title: title, desc, body, ld: [cr.ld, { '@context': 'https://schema.org', '@type': 'ContactPage', name: title, url: abs(L('/contact/')) }] });
}
function pageSupport(c) {
  const { t, L } = c;
  const title = t(['Support', 'Soporte']);
  const desc = t(['Support for VARGERSOFT products and services: sales@vargersoft.com, reply within one business day, English and Spanish.', 'Soporte para productos y servicios de VARGERSOFT: sales@vargersoft.com, respuesta en un día hábil, inglés y español.']);
  const cr = crumbs([[title, L('/support/')]], c);
  const body = `<section class="sec page-head"><div class="wrap narrow">${cr.html}${head(c, t(['Help', 'Ayuda']), title, t(['Need help with a VARGERSOFT product or service?', '¿Necesitas ayuda con un producto o servicio de VARGERSOFT?']))}
  <ul class="checks"><li>Email: <a href="mailto:${site.email}">${site.email}</a></li><li>${t(['Response time: within one business day', 'Tiempo de respuesta: un día hábil'])}</li><li>${t(['Hours: Monday to Friday, 9:00–18:00 Central', 'Horario: lunes a viernes, 9:00–18:00 hora del centro'])}</li><li>${t(['Languages: English and Spanish', 'Idiomas: inglés y español'])}</li></ul>
  <p>${t(['For help with one of our apps, use the support page on that app\'s own website.', 'Para ayuda con una de nuestras apps, usa la página de soporte en el sitio de esa app.'])}</p><p><a class="btn" href="${L('/contact/')}">${t(['Contact form', 'Formulario de contacto'])}</a></p></div></section>`;
  add(c, { path: '/support/', title: title + ' | VARGERSOFT', desc, body, ld: [cr.ld] });
}
function pageLegal(doc, slug, c) {
  const { t, L } = c;
  const cr = crumbs([[t(doc.title), L('/' + slug + '/')]], c);
  const body = `<section class="sec page-head"><div class="wrap narrow">${cr.html}<h1>${t(doc.title)}</h1><p class="meta">${t(['Last updated', 'Última actualización'])}: ${t(legalUpdated)}</p></div></section>
<section class="sec"><div class="wrap narrow prose">${doc.sections.map(s => `<h2>${esc(t(s.h))}</h2>${(s.p || []).map(p => `<p>${esc(t(p))}</p>`).join('')}${s.list ? `<ul class="checks">${s.list.map(x => `<li>${esc(t(x))}</li>`).join('')}</ul>` : ''}`).join('')}</div></section>`;
  add(c, { path: '/' + slug + '/', title: t(doc.title) + ' | VARGERSOFT', desc: t(doc.desc), body, ld: [cr.ld] });
}

// ---------- construir ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync('static', OUT, { recursive: true });
for (const lang of LANGS) {
  const c = ctx(lang);
  pageHome(c); pageAiHub(c); services.forEach(s => pageService(s, c)); pageApps(c); pageWork(c); pageDownloads(c);
  pageIndustries(c); pageResources(c); pageFaq(c); pageAbout(c); pageContact(c); pageStart(c); pageSupport(c);
  pageLegal(privacy, 'privacy', c); pageLegal(terms, 'terms', c);
}
for (const p of pages) {
  const f = path.join(OUT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, p.html);
}
// 404
{
  const c = ctx('en');
  const html = layout(c, { path: '/404/', title: 'Page not found | VARGERSOFT', desc: 'Page not found.', body: `<section class="sec page-head"><div class="wrap narrow center"><p class="eyebrow">404</p><h1>Page not found · Página no encontrada</h1><p><a class="btn" href="/">Home</a> <a class="btn ghost" href="/es/">Inicio</a></p></div></section>` })
    .replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"').replace('href="/es/404/"', 'href="/es/"');
  fs.writeFileSync(path.join(OUT, '404.html'), html);
}
// sitemap, robots, manifest
const urls = pages.map(p => p.path);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(p => `<url><loc>${abs(p.path)}</loc><lastmod>${site.updated}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${abs(p.basePath)}"/><xhtml:link rel="alternate" hreflang="es" href="${abs('/es' + p.basePath)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.basePath)}"/></url>`).join('\n')}
</urlset>
`);
const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Googlebot', 'Bingbot', 'Applebot', 'Applebot-Extended', 'DuckDuckBot', 'CCBot'];
fs.writeFileSync(path.join(OUT, 'robots.txt'), STAGING ? 'User-agent: *\nDisallow: /\n' : `# vargersoft.com — todos los rastreadores son bienvenidos, incluidos los de IA.\nUser-agent: *\nAllow: /\nDisallow: /contact.php\n\n${bots.map(b => `User-agent: ${b}\nAllow: /`).join('\n\n')}\n\nSitemap: ${site.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'site.webmanifest'), JSON.stringify({ name: site.name, short_name: site.name, start_url: '/', display: 'standalone', background_color: '#000000', theme_color: '#000000', icons: [{ src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/img/icon-512.png', sizes: '512x512', type: 'image/png' }] }));
// llms.txt y llms-full.txt (inglés; el sitio completo está en HTML)
{
  const c = ctx('en'); const { t } = c;
  const en = pages.filter(p => p.lang === 'en');
  const link = p => `- [${p.title.replace(' | VARGERSOFT', '')}](${abs(p.path)}): ${p.desc}`;
  const sec = (name, test) => `## ${name}\n\n${en.filter(test).map(link).join('\n')}\n`;
  const llms = `# VARGERSOFT\n\n> VARGERSOFT is the software division of VARGER Group LLC (Conroe, Texas, USA). It builds bilingual (English/Spanish) AI agents, apps and AI-ready websites for small and mid-size businesses, at fixed prices. Contact: ${site.email}.\n\nPrices in USD. AI agents are set up in 7 business days and billed month to month. A Spanish version of every page is under /es/.\n\n${sec('AI agents and services', p => p.basePath.startsWith('/ai/'))}\n## Prices\n\n${services.map(s => `- ${s.name[0]}: ${priceLines(s, c).map(l => `${l.label} ${money(l.amount)} (${l.unit})`).join(', ')}`).join('\n')}\n\n## Apps built by VARGERSOFT\n\n${apps.map(a => `- [${a.name}](${a.site}): ${a.desc[0]}`).join('\n')}\n\n${sec('Guides', p => p.basePath.startsWith('/resources/'))}\n${sec('Company', p => ['/', '/about/', '/work/', '/apps/', '/downloads/', '/industries/', '/faq/', '/contact/', '/support/', '/privacy/', '/terms/'].includes(p.basePath))}`;
  fs.writeFileSync(path.join(OUT, 'llms.txt'), llms);
  const full = en.filter(p => p.llm).map(p => `# ${p.llm.name}\n\nURL: ${abs(p.path)}\n${p.llm.price ? `Price: ${p.llm.price}\n` : ''}\n${(p.llm.text || []).join('\n\n')}\n${p.llm.faq ? '\n' + p.llm.faq.map(([q, a]) => `Q: ${t(q)}\nA: ${t(a)}`).join('\n\n') + '\n' : ''}`).join('\n---\n\n');
  fs.writeFileSync(path.join(OUT, 'llms-full.txt'), `# VARGERSOFT: full text of services, guides and FAQ\n\n${full}`);
}
console.log(`ok: ${pages.length} páginas → ${OUT}/ (${urls.filter(u => !u.startsWith('/es')).length} EN, ${urls.filter(u => u.startsWith('/es')).length} ES)`);
