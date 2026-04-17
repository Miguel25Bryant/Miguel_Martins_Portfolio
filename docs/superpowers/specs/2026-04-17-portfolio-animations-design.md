# Portfolio Animation Enhancement — Design Spec
**Date:** 2026-04-17  
**Status:** Approved

## Overview

Add two high-impact animations to the portfolio to increase visual memorability for hiring managers and creative directors: a scroll-driven horizontal filmstrip gallery and a 3D tilt effect on project cards.

---

## Tech Stack

- **GSAP 3** via CDN (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`)
- **ScrollTrigger plugin** via CDN (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`)
- Integrate with existing **Lenis** smooth scroll via `ScrollTrigger.normalizeScroll(true)` and Lenis's `scrollerProxy` or `ScrollTrigger.scrollerProxy`
- Everything stays in `index.html` — no new files

---

## Effect 1: Horizontal Filmstrip Gallery

### What changes
The existing `.works` section (dark, 2-column grid) is **replaced** with a pinned horizontal filmstrip. The `.works-grid` markup and all its CSS are removed. The lightbox remains — cards still open it on click.

### HTML structure
```html
<section id="works" class="works works-filmstrip">
  <div class="works-pin-wrap">           <!-- pinned by ScrollTrigger -->
    <div class="works-track">            <!-- translates horizontally -->
      <div class="works-track-inner">   <!-- flex row of cards -->
        <div class="film-heading">...</div>   <!-- "Selected Work" heading, left edge -->
        <a class="film-card" data-idx="0">...</a>
        <!-- repeat for all 15 projects -->
      </div>
    </div>
  </div>
</section>
```

### CSS
- `.works-pin-wrap`: `height: 100vh; overflow: hidden; position: relative`
- `.works-track`: `position: absolute; top: 0; left: 0; height: 100%; display: flex; align-items: center`
- `.works-track-inner`: `display: flex; gap: 2vw; padding: 0 5vw; align-items: center`
- `.film-heading`: large "Selected Work" display text, left-anchored, `flex-shrink: 0; margin-right: 4vw`
- `.film-card`: `height: 78vh; width: auto; aspect-ratio: 3/4; flex-shrink: 0; position: relative; overflow: hidden; cursor: pointer`
- `.film-card img`: `width: 100%; height: 100%; object-fit: cover; filter: brightness(0.72) saturate(0.7); transition: filter 0.6s ease`
- `.film-card:hover img`: `filter: brightness(0.92) saturate(1)`
- Card info overlay: same as current `.work-info` (position absolute, gradient, name + type)
- Preserve existing `.work-arrow` hover reveal

### ScrollTrigger setup
```js
gsap.registerPlugin(ScrollTrigger);

// Lenis integration
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Filmstrip pin + translate
const track = document.querySelector('.works-track-inner');
const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

gsap.to(track, {
  x: getScrollAmount,
  ease: 'none',
  scrollTrigger: {
    trigger: '.works-pin-wrap',
    start: 'top top',
    end: () => `+=${Math.abs(getScrollAmount())}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  }
});
```

### Char animation
The "Selected Work" heading char-split animation triggers when `.works-pin-wrap` enters the viewport (same IntersectionObserver approach as current, adjusted selector).

---

## Effect 2: 3D Tilt on Film Cards

### Behaviour
- On `mouseenter`: enable tilt tracking
- On `mousemove`: compute cursor offset from card centre, apply `rotateX` / `rotateY` via GSAP `quickTo` and shift a gloss overlay pseudo-element
- On `mouseleave`: spring back to flat (`rotateX: 0, rotateY: 0`, `duration: 0.6, ease: 'power3.out'`)
- Max tilt: **±8°** (visible but not cartoonish)
- Disabled on touch devices (`window.matchMedia('(pointer: fine)')`)
- `transform-style: preserve-3d` on the card, `perspective: 900px` on a wrapper

### CSS additions
```css
.film-card-wrap { perspective: 900px; }
.film-card { transform-style: preserve-3d; will-change: transform; }
.film-card-gloss {
  position: absolute; inset: 0;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.11) 0%, transparent 55%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}
.film-card:hover .film-card-gloss { opacity: 1; }
```

### JS setup
```js
if (window.matchMedia('(pointer: fine)').matches) {
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
      // gloss follows cursor (opposite side for realism)
      gloss.style.setProperty('--gx', `${((1 - (x + 1) / 2) * 100).toFixed(1)}%`);
      gloss.style.setProperty('--gy', `${((1 - (y + 1) / 2) * 100).toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });
}
```

Each `.film-card` HTML element gets a `<div class="film-card-gloss"></div>` child added inside it.

---

## What Does NOT Change

- Static hero grain (stays as-is)
- Intro typewriter animation
- Hero character-split reveal
- Custom cursor (still expands to "VIEW" on card hover)
- Lightbox (cards still open it)
- Marquee, Skills, About, Statement, Contact sections — untouched
- Mobile layout (filmstrip degrades to a horizontal scroll container on `max-width: 900px`)
- No git push until user explicitly requests it

---

## Mobile Fallback

On `max-width: 900px`, ScrollTrigger pinning is killed and `.works-track-inner` becomes a standard `overflow-x: auto; scroll-snap-type: x mandatory` container. Cards are `85vw` wide, scroll-snapped. 3D tilt is already disabled on touch.

---

## Deployment

No push to GitHub until user explicitly requests it. All testing on `http://localhost:3000`.
