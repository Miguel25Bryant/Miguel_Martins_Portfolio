# Portfolio Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GSAP ScrollTrigger-driven horizontal filmstrip gallery (replacing the work grid) and a 3D tilt effect on project cards to `index.html`.

**Architecture:** All changes are in a single `index.html` file. GSAP + ScrollTrigger are added via CDN. The existing Lenis RAF loop is replaced with a GSAP ticker integration. The `.works` section HTML is restructured from a 2-column grid into a pinned horizontal filmstrip; the tilt JS runs on top of the new card elements.

**Tech Stack:** GSAP 3.12.5, ScrollTrigger plugin, Lenis 1.1.13 (already present), vanilla JS, inline CSS.

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` lines 14–15 | Add 2 GSAP CDN `<script>` tags after Lenis |
| `index.html` CSS block | Remove old grid CSS, add filmstrip + tilt CSS |
| `index.html` HTML `.works` section (lines ~1129–1298) | Replace grid markup with filmstrip markup |
| `index.html` JS block | Replace Lenis RAF loop; add ScrollTrigger setup; add tilt JS; fix char-animation observer selector |

---

## Task 1: Add GSAP CDN scripts

**Files:**
- Modify: `index.html` — `<head>` section, after line 14 (`<script src="...lenis...">`)

- [ ] **Step 1: Insert GSAP scripts in `<head>`**

Find this line (around line 14):
```html
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
```

Add immediately after it:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

- [ ] **Step 2: Verify scripts load**

Start dev server if not running: `node serve.mjs`
Open `http://localhost:3000` in browser, open DevTools console.
Run: `gsap.version`
Expected output: `"3.12.5"` (no errors)

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "Add GSAP + ScrollTrigger CDN scripts"
```

---

## Task 2: Replace Lenis RAF loop with GSAP ticker integration

**Files:**
- Modify: `index.html` JS block — the `/* ── LENIS SMOOTH SCROLL ── */` section (around line 1401–1409)

- [ ] **Step 1: Replace the RAF loop**

Find and replace this block:
```js
/* ── LENIS SMOOTH SCROLL ── */
const lenis = new Lenis({
  duration: 1.25,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
(function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
})(0);
```

Replace with:
```js
/* ── LENIS SMOOTH SCROLL ── */
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.25,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

- [ ] **Step 2: Verify smooth scroll still works**

Open `http://localhost:3000`. Scroll the page — it should still feel smooth (Lenis easing intact). No console errors.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "Replace Lenis RAF with GSAP ticker for ScrollTrigger compatibility"
```

---

## Task 3: Replace works section HTML

**Files:**
- Modify: `index.html` — the `<!-- WORKS -->` section (lines ~1129–1298)

- [ ] **Step 1: Replace the entire works section**

Find the entire block from:
```html
<!-- ─────────────────────────────── WORKS ─── -->
<section id="works" class="works">
```
…to the closing `</section>` of works (just before `<!-- SKILLS -->`).

Replace it entirely with:
```html
<!-- ─────────────────────────────── WORKS ─── -->
<section id="works" class="works works-filmstrip">
  <div class="works-pin-wrap">
    <div class="works-track">
      <div class="works-track-inner">

        <div class="film-heading">
          <div class="works-h" id="works-h1">Selected</div>
          <div class="works-h" id="works-h2">Work</div>
        </div>

        <a href="#" class="film-card" data-idx="0">
          <div class="work-thumb"><img src="Selected%20Work/Distortion/thumbs/Magazine_Mockup_0.jpg" alt="Distortion" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Distortion</span><span class="work-type">Print &amp; Editorial</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="1">
          <div class="work-thumb"><img src="Selected%20Work/Northern%20Collections/thumbs/logo_v2_green.jpg" alt="Northern Collections" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Northern Collections</span><span class="work-type">Branding &amp; Identity</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="2">
          <div class="work-thumb"><img src="Selected%20Work/IPB%20E3%2B/thumbs/balc%C3%A3o.jpg" alt="IPB E3+" decoding="async"/></div>
          <div class="work-info"><span class="work-name">IPB E3+</span><span class="work-type">Branding &amp; Identity</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="3">
          <div class="work-thumb"><img src="Selected%20Work/Inova/thumbs/mockup_v1.jpg" alt="Inova Contabilidade" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Inova Contabilidade</span><span class="work-type">Branding &amp; Identity</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="4">
          <div class="work-thumb"><img src="Selected%20Work/Stay%20Home/thumbs/Billboard_Mockup.jpg" alt="Stay Home" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Stay Home</span><span class="work-type">Digital &amp; Campaign</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="5">
          <div class="work-thumb"><img src="Selected%20Work/ACOB/thumbs/maquete_flyeracob_v2.jpg" alt="ACOB" decoding="async"/></div>
          <div class="work-info"><span class="work-name">ACOB</span><span class="work-type">Print &amp; Editorial</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="6">
          <div class="work-thumb"><img src="Selected%20Work/Solar%20do%20Rabal/thumbs/Mockup_Outdoor.jpg" alt="Solar do Rabal" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Solar do Rabal</span><span class="work-type">Print &amp; Campaign</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="7">
          <div class="work-thumb"><img src="Selected%20Work/Grafpub/thumbs/3.jpg" alt="Grafpub" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Grafpub</span><span class="work-type">Print &amp; Editorial</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="8">
          <div class="work-thumb"><img src="Selected%20Work/Business%20Cards/thumbs/maquete_trazgas_v1.jpg" alt="Business Cards" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Business Cards</span><span class="work-type">Print &amp; Identity</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="9">
          <div class="work-thumb"><img src="Selected%20Work/Ci%C3%AAncia%20Viva/thumbs/maquete_ccv_v1.jpg" alt="Ciência Viva" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Ciência Viva</span><span class="work-type">Print &amp; Campaign</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="10">
          <div class="work-thumb"><img src="Selected%20Work/Sol%20e%20Sombra/thumbs/mockupbranding_v1.jpg" alt="Sol e Sombra" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Sol &amp; Sombra</span><span class="work-type">Branding &amp; Identity</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="11">
          <div class="work-thumb"><img src="Selected%20Work/Live%20Well/thumbs/maquete_rolluplivewell_v2.jpg" alt="Live Well" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Live Well</span><span class="work-type">Print &amp; Campaign</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="12">
          <div class="work-thumb"><img src="Selected%20Work/O%20Arado/thumbs/maquete_oarado_v1.jpg" alt="O Arado" decoding="async"/></div>
          <div class="work-info"><span class="work-name">O Arado</span><span class="work-type">Print &amp; Editorial</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="13">
          <div class="work-thumb"><img src="Selected%20Work/Posters/thumbs/mockup_ground.jpg" alt="Posters" decoding="async"/></div>
          <div class="work-info"><span class="work-name">Posters</span><span class="work-type">Print Design</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

        <a href="#" class="film-card" data-idx="14">
          <div class="work-thumb"><img src="Selected%20Work/SOS%20Renova%C3%A7%C3%B5es/thumbs/proposta_sosrenova%C3%A7oes_v1.jpg" alt="SOS Renovações" decoding="async"/></div>
          <div class="work-info"><span class="work-name">SOS Renovações</span><span class="work-type">Branding &amp; Identity</span></div>
          <div class="film-card-gloss"></div>
          <div class="work-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </a>

      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify HTML renders without errors**

Open `http://localhost:3000`. The dark works section should be visible with project images stacked (no horizontal scroll yet — CSS comes next). No console errors.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "Replace works grid HTML with horizontal filmstrip markup"
```

---

## Task 4: Replace works CSS with filmstrip CSS

**Files:**
- Modify: `index.html` CSS block — the `/* ═══ WORKS (DARK) ═══ */` section

- [ ] **Step 1: Remove old grid CSS, add filmstrip CSS**

Find the entire CSS block between:
```css
/* ═══════════════════════════════════════════
   WORKS (DARK)
═══════════════════════════════════════════ */
```
…down to (and including) the `.work-arrow svg` rule and the blank line after it (just before `/* ═══ MARQUEE ═══ */`).

Replace that entire block with:

```css
/* ═══════════════════════════════════════════
   WORKS (DARK) — FILMSTRIP
═══════════════════════════════════════════ */
.works {
  background: var(--dark);
}

/* Pin wrapper — ScrollTrigger pins this */
.works-pin-wrap {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* Horizontal track — GSAP translates this */
.works-track {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.works-track-inner {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 32px);
  padding: 0 5vw;
  height: 100%;
}

/* "Selected Work" heading — left anchor of the strip */
.film-heading {
  flex-shrink: 0;
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
}

.works-h {
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: clamp(52px, 8vw, 128px);
  line-height: 0.86em;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--light);
}

/* Individual project card */
.film-card {
  flex-shrink: 0;
  width: clamp(220px, 22vw, 360px);
  height: 78vh;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #0a0a0a;
  transform-style: preserve-3d;
  will-change: transform;
  display: block;
  text-decoration: none;
}

/* Card image */
.film-card .work-thumb {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.film-card .work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.72) saturate(0.65);
  transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              filter 0.9s ease;
}
.film-card:hover .work-thumb img {
  transform: scale(1.05);
  filter: brightness(0.92) saturate(1);
}

/* Bottom gradient overlay on image */
.film-card .work-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 45%, transparent 70%);
  z-index: 1;
}

/* Info overlay */
.work-info {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 2vw 1.4vw 1.4vw;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.4vw;
}
.work-name {
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: clamp(10px, 0.85vw, 14px);
  letter-spacing: 0.04em;
  color: var(--light);
  line-height: 1.3;
}
.work-type {
  font-size: clamp(8px, 0.58vw, 10px);
  letter-spacing: 0.1em;
  color: var(--light);
  opacity: 0.3;
}

/* Hover arrow */
.work-arrow {
  position: absolute;
  top: 1.2vw;
  right: 1.2vw;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  opacity: 0;
  transform: scale(0.8) rotate(-45deg);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.work-arrow svg { width: 14px; height: 14px; stroke: white; fill: none; stroke-width: 1.5; }
.film-card:hover .work-arrow { opacity: 1; transform: scale(1) rotate(0deg); }

/* 3D tilt gloss overlay */
.film-card-gloss {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.11) 0%, transparent 55%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}
.film-card:hover .film-card-gloss { opacity: 1; }
```

- [ ] **Step 2: Verify filmstrip renders**

Open `http://localhost:3000`. The works section should now show a row of tall portrait cards in the dark section. They won't pin/scroll yet (GSAP setup comes next). Cards should be visible with images. No console errors.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "Add filmstrip CSS, remove old works grid CSS"
```

---

## Task 5: Update all `.work-item` references to `.film-card`

**Files:**
- Modify: `index.html` — CSS animations block and JS block

All existing JS and CSS still references `.work-item`. The HTML no longer has that class — everything is `.film-card` now. This task updates the remaining references and removes the old clip-path reveal (not needed in a filmstrip).

- [ ] **Step 1: Remove clip-path animation CSS for `.work-item`**

In the `/* ═══ ANIMATIONS ═══ */` CSS section, find and delete these two rules:

```css
/* Work item reveal — clip-path wipe */
.work-item {
  clip-path: inset(0 0 100% 0);
  will-change: clip-path;
  transition: clip-path 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.work-item.in-view { clip-path: inset(0 0 0% 0); will-change: auto; }
```

Also in `@media (max-width: 600px)` remove:
```css
.work-item.span2 { grid-column: span 1; }
```
and:
```css
.work-item.span2 .work-thumb { aspect-ratio: 16/9; }
```

- [ ] **Step 2: Remove the `wo` IntersectionObserver for work items**

Find and delete this entire block (the `wo` observer was only used for `.work-item`):
```js
const wo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      wo.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px 80px 0px' });

document.querySelectorAll('.work-item').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 2) * 0.1}s`;
  wo.observe(el);
});
```

- [ ] **Step 3: Update `.work-item` → `.film-card` in instant-reveal block**

Find:
```js
document.querySelectorAll('[data-reveal], .work-item').forEach(el => {
```
Replace with:
```js
document.querySelectorAll('[data-reveal], .film-card').forEach(el => {
```

- [ ] **Step 4: Update `.work-item` → `.film-card` in custom cursor block**

Find:
```js
document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('mouseenter', () => el.classList.add('view'));
  item.addEventListener('mouseleave', () => el.classList.remove('view'));
});
```
Replace with:
```js
document.querySelectorAll('.film-card').forEach(item => {
  item.addEventListener('mouseenter', () => el.classList.add('view'));
  item.addEventListener('mouseleave', () => el.classList.remove('view'));
});
```

- [ ] **Step 5: Update `.work-item[data-idx]` → `.film-card[data-idx]` in lightbox block**

Find:
```js
document.querySelectorAll('.work-item[data-idx]').forEach(item => {
```
Replace with:
```js
document.querySelectorAll('.film-card[data-idx]').forEach(item => {
```

- [ ] **Step 6: Verify no remaining `.work-item` references**

Run in terminal:
```bash
grep -n "work-item" index.html
```
Expected: zero results.

- [ ] **Step 7: Commit**
```bash
git add index.html
git commit -m "Update all .work-item selectors to .film-card, remove clip-path reveal"
```

---

## Task 6: Add ScrollTrigger filmstrip JS + fix char observer  

**Files:**
- Modify: `index.html` JS block — replace the `/* ── WORKS HEADING — scroll-triggered char reveal ── */` section and add new filmstrip ScrollTrigger

- [ ] **Step 1: Replace the works heading observer**

Find this block (around line 1490–1503):
```js
/* ── WORKS HEADING — scroll-triggered char reveal ── */
splitChars(document.getElementById('works-h1'), 0.05);
splitChars(document.getElementById('works-h2'), 0.35);
let worksCharsTriggered = false;
(function () {
  const area = document.querySelector('.works-heading-area');
  if (!area) return;
  const hObs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.works-h').forEach(h => h.classList.add('chars-go'));
    worksCharsTriggered = true;
    hObs.disconnect();
  }, { threshold: 0.2 });
  hObs.observe(area);
})();
```

Replace with:
```js
/* ── WORKS HEADING — scroll-triggered char reveal ── */
splitChars(document.getElementById('works-h1'), 0.05);
splitChars(document.getElementById('works-h2'), 0.35);
let worksCharsTriggered = false;
(function () {
  const area = document.querySelector('.works-pin-wrap');
  if (!area) return;
  const hObs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.works-h').forEach(h => h.classList.add('chars-go'));
    worksCharsTriggered = true;
    hObs.disconnect();
  }, { threshold: 0.05 });
  hObs.observe(area);
})();

/* ── FILMSTRIP HORIZONTAL SCROLL ── */
(function () {
  const pinWrap   = document.querySelector('.works-pin-wrap');
  const trackInner = document.querySelector('.works-track-inner');
  if (!pinWrap || !trackInner) return;

  const getScrollAmount = () => -(trackInner.scrollWidth - window.innerWidth);

  gsap.to(trackInner, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: pinWrap,
      start: 'top top',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      scrub: 1.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });
})();
```

- [ ] **Step 2: Verify filmstrip scroll works**

Open `http://localhost:3000`. Scroll into the "Selected Work" section — the section should pin and the cards should slide left as you scroll. Scroll past it and the page should resume normal flow. "Selected Work" heading chars should animate in when the section enters view.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "Add GSAP ScrollTrigger filmstrip horizontal scroll"
```

---

## Task 7: Add 3D tilt JS

**Files:**
- Modify: `index.html` JS block — add after the filmstrip IIFE (Task 6), before `/* ── SCROLL REVEAL ── */`

- [ ] **Step 1: Add tilt JS**

Find the comment `/* ── SCROLL REVEAL (generic) ── */` and insert the following block immediately before it:

```js
/* ── 3D TILT ON FILM CARDS ── */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.film-card').forEach(card => {
    const xTo = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power3.out' });
    const gloss = card.querySelector('.film-card-gloss');

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const y = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      xTo(x * 8);
      yTo(-y * 8);
      if (gloss) {
        gloss.style.setProperty('--gx', `${((1 - (x + 1) / 2) * 100).toFixed(1)}%`);
        gloss.style.setProperty('--gy', `${((1 - (y + 1) / 2) * 100).toFixed(1)}%`);
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });
})();
```

- [ ] **Step 2: Verify tilt works**

Open `http://localhost:3000`. Scroll into the filmstrip section. Hover over a project card — it should tilt in 3D toward your cursor with a gloss highlight. Move the mouse away and it should spring back to flat.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "Add 3D tilt with gloss overlay on film cards"
```

---

## Task 8: Mobile fallback

**Files:**
- Modify: `index.html` CSS block — inside the `@media (max-width: 900px)` block

- [ ] **Step 1: Add mobile filmstrip overrides**

Find the `@media (max-width: 900px)` block and add these rules inside it (after the existing `.nav { position: absolute; }` rule):

```css
/* Filmstrip mobile fallback — disable pin, use scroll-snap */
.works-pin-wrap {
  height: auto;
  overflow: visible;
}
.works-track {
  position: static;
  height: auto;
}
.works-track-inner {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 5vw;
  gap: 12px;
  height: auto;
  align-items: stretch;
}
.works-track-inner::-webkit-scrollbar { display: none; }
.film-heading {
  display: none;
}
.film-card {
  width: 85vw;
  height: 70vw;
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Add JS to kill ScrollTrigger on mobile**

Find the filmstrip IIFE (added in Task 5). Wrap the `gsap.to(...)` call with a media condition:

```js
/* ── FILMSTRIP HORIZONTAL SCROLL ── */
(function () {
  const pinWrap    = document.querySelector('.works-pin-wrap');
  const trackInner = document.querySelector('.works-track-inner');
  if (!pinWrap || !trackInner) return;

  // Only pin on desktop
  if (!window.matchMedia('(min-width: 901px)').matches) return;

  const getScrollAmount = () => -(trackInner.scrollWidth - window.innerWidth);

  gsap.to(trackInner, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: pinWrap,
      start: 'top top',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      scrub: 1.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });
})();
```

- [ ] **Step 3: Verify mobile**

Open `http://localhost:3000` with DevTools responsive mode at 375px wide. The works section should be a horizontal swipe-able strip. No pinning. Cards are 85vw wide.

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "Add mobile fallback for filmstrip (scroll-snap, no pin)"
```

---

## Task 9: Final visual QA

- [ ] **Step 1: Start server and open the site**

```bash
node serve.mjs
```
Open `http://localhost:3000`

- [ ] **Step 2: Run through the full checklist**

| Check | Expected |
|-------|----------|
| Intro typewriter | Plays correctly, fades out |
| Hero char animation | "Miguel Martins" reveals letter by letter |
| Smooth scroll | Lenis easing still active |
| Works section pins | Section locks at top, cards slide left on scroll |
| "Selected Work" chars | Animate when section enters viewport |
| Lightbox | Click any card → lightbox opens, arrows/close work |
| 3D tilt | Hover card → tilts toward cursor, gloss follows, springs back |
| Nav colour | Switches to white text over dark sections |
| Custom cursor | Expands to "VIEW" on card hover |
| Post-filmstrip scroll | Page continues normally after all cards pass |
| No console errors | DevTools console clean |

- [ ] **Step 3: Final commit**
```bash
git add index.html
git commit -m "Portfolio animations complete: filmstrip + 3D tilt (localhost only)"
```
