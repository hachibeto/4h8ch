/* ============================================
   HACHIBETO — main.js
   All canvas animations & interactivity
   ============================================ */

/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

/* ---- HERO BACKGROUND CANVAS ---- */
// Renders vertical DNA double-helix strands + Lissajous figure-8 curves
const heroBg = document.getElementById('heroBg');
const hCtx   = heroBg.getContext('2d');
let hW, hH, t = 0;

function resizeHero() {
  hW = heroBg.width  = heroBg.offsetWidth;
  hH = heroBg.height = heroBg.offsetHeight;
}
resizeHero();
window.addEventListener('resize', resizeHero);

function drawHeroBg() {
  hCtx.clearRect(0, 0, hW, hH);

  /* -- DNA Helix strands -- */
  const numStrands = Math.floor(hW / 90);
  for (let s = 0; s < numStrands; s++) {
    const cx         = (s + 0.5) * (hW / numStrands);
    const amplitude  = 28;
    const wavelength = 120;
    const speed      = t * 0.012;
    const offset     = s * 1.3;

    // Strand A
    hCtx.beginPath();
    hCtx.strokeStyle = '#2eedb5';
    hCtx.globalAlpha = 0.28;
    hCtx.lineWidth   = 1.2;
    for (let y = 0; y <= hH; y += 2) {
      const x = cx + amplitude * Math.sin((y / wavelength) * Math.PI * 2 + speed + offset);
      y === 0 ? hCtx.moveTo(x, y) : hCtx.lineTo(x, y);
    }
    hCtx.stroke();

    // Strand B (opposite phase)
    hCtx.beginPath();
    hCtx.strokeStyle = '#6fffd4';
    hCtx.globalAlpha = 0.16;
    hCtx.lineWidth   = 1;
    for (let y = 0; y <= hH; y += 2) {
      const x = cx + amplitude * Math.sin((y / wavelength) * Math.PI * 2 + speed + offset + Math.PI);
      y === 0 ? hCtx.moveTo(x, y) : hCtx.lineTo(x, y);
    }
    hCtx.stroke();

    // Rungs (crossbars)
    const rungSpacing = wavelength / 2;
    for (let r = 0; r < hH / rungSpacing + 1; r++) {
      const y  = (r * rungSpacing) + ((t * 0.6 + offset * 30) % rungSpacing);
      const xA = cx + amplitude * Math.sin((y / wavelength) * Math.PI * 2 + speed + offset);
      const xB = cx + amplitude * Math.sin((y / wavelength) * Math.PI * 2 + speed + offset + Math.PI);
      const phase = Math.abs(Math.sin((y / wavelength) * Math.PI * 2 + speed + offset));

      hCtx.beginPath();
      hCtx.strokeStyle = '#2eedb5';
      hCtx.globalAlpha = 0.12 + 0.1 * phase;
      hCtx.lineWidth   = 0.8;
      hCtx.moveTo(xA, y);
      hCtx.lineTo(xB, y);
      hCtx.stroke();
    }
  }

  /* -- Lissajous / figure-8 overlay curves -- */
  const lissajous = [
    { a: 1, b: 2, d: 0,                       color: '#2eedb5', lw: 1.2, alpha: 0.3  },
    { a: 2, b: 3, d: Math.PI / 4,              color: '#6fffd4', lw: 0.8, alpha: 0.15 },
    { a: 1, b: 2, d: Math.PI / 8 + t * 0.0003, color: '#2eedb5', lw: 0.6, alpha: 0.12 },
  ];

  const cx2 = hW / 2, cy2 = hH / 2;
  const rx  = hW * 0.38, ry = hH * 0.3;

  lissajous.forEach(c => {
    hCtx.beginPath();
    hCtx.strokeStyle = c.color;
    hCtx.globalAlpha = c.alpha;
    hCtx.lineWidth   = c.lw;
    for (let i = 0; i <= 628; i++) {
      const angle = (i / 628) * Math.PI * 2;
      const x = cx2 + rx * Math.sin(c.a * angle + c.d + t * 0.0007);
      const y = cy2 + ry * Math.sin(c.b * angle + t * 0.0004);
      i === 0 ? hCtx.moveTo(x, y) : hCtx.lineTo(x, y);
    }
    hCtx.stroke();
  });

  hCtx.globalAlpha = 1;
  t++;
  requestAnimationFrame(drawHeroBg);
}
drawHeroBg();


/* ---- GALLERY CANVAS HELPER ---- */
function setupCanvas(id, drawFn) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  let animT = 0;

  function resize() {
    c.width  = c.offsetWidth;
    c.height = c.offsetHeight;
  }
  resize();
  new ResizeObserver(resize).observe(c);

  function loop() {
    drawFn(ctx, c.width, c.height, animT);
    animT += 0.012;
    requestAnimationFrame(loop);
  }
  loop();
}


/* ---- GALLERY PIECE 1 — Flowing infinity loops ---- */
setupCanvas('c1', (ctx, w, h, t) => {
  ctx.fillStyle = '#060d0d';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  for (let layer = 0; layer < 5; layer++) {
    const scale = 0.3 + layer * 0.13;
    const alpha = 0.2 + layer * 0.14;
    ctx.beginPath();
    ctx.strokeStyle = layer % 2 === 0 ? '#2eedb5' : '#6fffd4';
    ctx.globalAlpha = alpha;
    ctx.lineWidth   = 2 - layer * 0.3;
    for (let i = 0; i <= 400; i++) {
      const a = (i / 400) * Math.PI * 2;
      const x = cx + w * scale * Math.sin(a + t * (0.3 + layer * 0.05));
      const y = cy + h * scale * 0.45 * Math.sin(2 * a + t * 0.2);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
});


/* ---- GALLERY PIECE 2 — DNA helix close-up ---- */
setupCanvas('c2', (ctx, w, h, t) => {
  ctx.fillStyle = '#060d0d';
  ctx.fillRect(0, 0, w, h);
  const cols = 3;

  for (let s = 0; s < cols; s++) {
    const cx  = (s + 0.5) * (w / cols);
    const amp = w * 0.1;
    const wl  = h * 0.22;

    ctx.beginPath();
    ctx.strokeStyle = '#2eedb5';
    ctx.globalAlpha = 0.85;
    ctx.lineWidth   = 1.5;
    for (let y = 0; y <= h; y += 2) {
      const x = cx + amp * Math.sin((y / wl) * Math.PI * 2 + t + s * 1.1);
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#6fffd4';
    ctx.globalAlpha = 0.5;
    ctx.lineWidth   = 1;
    for (let y = 0; y <= h; y += 2) {
      const x = cx + amp * Math.sin((y / wl) * Math.PI * 2 + t + s * 1.1 + Math.PI);
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    for (let r = 0; r < h / (wl / 2) + 1; r++) {
      const y  = r * (wl / 2) + ((t * 3 + s * 20) % (wl / 2));
      const xA = cx + amp * Math.sin((y / wl) * Math.PI * 2 + t + s * 1.1);
      const xB = cx + amp * Math.sin((y / wl) * Math.PI * 2 + t + s * 1.1 + Math.PI);
      ctx.beginPath();
      ctx.strokeStyle = '#6fffd4';
      ctx.globalAlpha = 0.35;
      ctx.lineWidth   = 0.8;
      ctx.moveTo(xA, y);
      ctx.lineTo(xB, y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
});


/* ---- GALLERY PIECE 3 — Orbiting 8 silhouettes ---- */
setupCanvas('c3', (ctx, w, h, t) => {
  ctx.fillStyle = '#060d0d';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + t * 0.15;
    const px    = cx + Math.cos(angle) * w * 0.22;
    const py    = cy + Math.sin(angle) * h * 0.22;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle + t * 0.3);
    ctx.font          = `bold ${Math.min(w, h) * 0.18}px 'Bebas Neue', sans-serif`;
    ctx.fillStyle     = '#6fffd4';
    ctx.globalAlpha   = 0.18 + 0.1 * Math.sin(t + i);
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';
    ctx.fillText('8', 0, 0);
    ctx.restore();
  }

  ctx.globalAlpha  = 0.9;
  ctx.font         = `bold ${Math.min(w, h) * 0.35}px 'Bebas Neue', sans-serif`;
  ctx.fillStyle    = '#e8f5f2';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('8', cx, cy);
  ctx.globalAlpha  = 1;
});


/* ---- GALLERY PIECE 4 — X crossing waves ---- */
setupCanvas('c4', (ctx, w, h, t) => {
  ctx.fillStyle = '#060d0d';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  const lines = [
    { angle:  Math.PI / 4, color: '#2eedb5' },
    { angle: -Math.PI / 4, color: '#6fffd4' },
    { angle:  0,           color: '#e8f5f2' },
    { angle:  Math.PI / 2, color: '#2eedb5' },
  ];

  lines.forEach((l, idx) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(l.angle + t * 0.05 * (idx % 2 === 0 ? 1 : -1));
    for (let layer = 0; layer < 3; layer++) {
      const amp  = (h / 2) * (0.5 + layer * 0.15);
      const freq = 2 + layer;
      ctx.beginPath();
      ctx.strokeStyle = l.color;
      ctx.globalAlpha = 0.2 + layer * 0.14;
      ctx.lineWidth   = 2 - layer * 0.5;
      for (let i = 0; i <= 300; i++) {
        const x = -w / 2 + (i / 300) * w;
        const y = amp * Math.sin(freq * (x / w) * Math.PI * 2 + t * 0.5);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  });
});


/* ---- SCROLL FADE-IN ---- */
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.15 });

faders.forEach(f => observer.observe(f));
