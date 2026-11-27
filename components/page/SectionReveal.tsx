'use client';

import { useEffect } from 'react';

// Whole sections reveal with the scroll, bottom to top: each section after
// the banner comes onto the screen faint, blurred and a little low, and
// sharpens and rises into place as one block as it is scrolled up,
// finishing when its top is a little over a third of the way up the
// screen. It follows the scroll both ways. Mount once inside <main>; a
// section can opt out with data-reveal="off".
const SELECTOR = 'main > section, main > div > section';
const RISE = 70; // px the section travels up while it reveals
const BLUR = 10; // px of blur at the start

export default function SectionReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const all = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    // The first section is the banner, already on screen
    const els = all.slice(1).filter((el) => el.dataset.reveal !== 'off');
    const shift = new Map<HTMLElement, number>();
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const rise = window.innerWidth < 768 ? RISE * 0.6 : RISE;
      for (const el of els) {
        // Measure where it would be without the shift already applied
        const top = el.getBoundingClientRect().top - (shift.get(el) ?? 0);
        const raw = Math.min(1, Math.max(0, (vh - top) / (vh * 0.62)));
        const t = 1 - Math.pow(1 - raw, 2);
        const y = (1 - t) * rise;
        shift.set(el, y);
        if (t >= 0.999) {
          el.style.opacity = '';
          el.style.transform = '';
          el.style.filter = '';
          continue;
        }
        el.style.opacity = String(0.06 + 0.94 * t);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        el.style.filter = `blur(${((1 - t) * BLUR).toFixed(2)}px)`;
      }
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      for (const el of els) { el.style.opacity = ''; el.style.transform = ''; el.style.filter = ''; }
    };
  }, []);
  return null;
}
