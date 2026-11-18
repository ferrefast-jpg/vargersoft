// VARGERSOFT — interacción ligera. El contenido funciona completo sin este archivo.
(() => {
  const d = document;
  d.documentElement.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // menú móvil
  const burger = d.querySelector('.burger'), nav = d.getElementById('nav');
  if (burger && nav) burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  // fondo dinámico de la portada: cuadros verdes a la deriva
  const cv = d.querySelector('[data-fx]');
  if (cv && !reduce) {
    const g = cv.getContext('2d');
    let w = 0, h = 0, dots = [], raf = 0, on = true;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, s: 2 + Math.random() * 7,
        vx: (Math.random() - .5) * .22, vy: -.08 - Math.random() * .3, a: .15 + Math.random() * .75, p: Math.random() * 6.28,
      }));
    };
    const draw = t => {
      g.clearRect(0, 0, w, h);
      for (const o of dots) {
        o.x += o.vx; o.y += o.vy;
        if (o.y < -12) { o.y = h + 12; o.x = Math.random() * w; }
        if (o.x < -12) o.x = w + 12; else if (o.x > w + 12) o.x = -12;
        const a = o.a * (.55 + .45 * Math.sin(t / 900 + o.p));
        g.fillStyle = `rgba(34,197,94,${a})`;
        g.shadowColor = 'rgba(34,197,94,.9)'; g.shadowBlur = o.s > 6 ? 12 : 0;
        g.fillRect(o.x, o.y, o.s, o.s);
      }
      if (on) raf = requestAnimationFrame(draw);
    };
    size(); raf = requestAnimationFrame(draw);
    addEventListener('resize', size, { passive: true });
    new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } }).observe(cv);
  }

  // aparición al hacer scroll y contadores
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    e.target.querySelectorAll('[data-count]').forEach(el => {
      const end = +el.dataset.count; if (reduce) return;
      const t0 = performance.now();
      const step = t => { const k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }), { threshold: .04, rootMargin: "0px 0px -6% 0px" }) : null;
  d.querySelectorAll('.sec .wrap, .rail').forEach((el, i) => { if (io && i > 0) { el.classList.add('rv'); io.observe(el); } });

  // contacto: prellenar tema desde ?service= / ?product=, y aviso de enviado
  const q = new URLSearchParams(location.search);
  const form = d.querySelector('[data-contact]');
  if (form) {
    const topic = q.get('service') || q.get('product');
    if (topic) {
      const es = d.documentElement.lang === 'es';
      form.topic.value = topic;
      const pretty = topic.replace(/-/g, ' ');
      if (!form.message.value) form.message.value = (q.get('product') ? (es ? 'Me interesa: ' : 'I am interested in: ') : (es ? 'Quiero iniciar: ' : 'I want to start: ')) + pretty + '\n';
    }
  }
  const sent = d.querySelector('[data-sent]');
  if (sent && q.get('sent') === '1') { sent.hidden = false; if (form) form.hidden = true; }
})();

// Botón "Habla con Sofía": abre el widget de voz de la página; si no carga, abre la demo en otra pestaña.
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('[data-talk]');
  if (!a) return;
  var w = document.querySelector('elevenlabs-convai');
  var root = w && w.shadowRoot;
  var btn = root && (root.querySelector('button[aria-label*="call" i], button[aria-label*="llamada" i]') || root.querySelector('button'));
  if (btn) { e.preventDefault(); btn.click(); try { w.scrollIntoView({ block: 'end' }); } catch (_) {} }
});
