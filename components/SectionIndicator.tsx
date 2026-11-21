'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// "You are here": names the section in the middle of the screen, in plain
// words, so a visitor always knows which part of the page they are on.
// Sections opt in with a data-section key; the hero swaps its own key from
// "home" to "whatwedo" as its reveal plays.

const ORDER = ['home', 'who', 'services', 'clients', 'approach', 'deliver', 'safety', 'projects', 'insights', 'contact'];

export default function SectionIndicator() {
  const t = useTranslations('Sections');
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState('home');
  // Only shown while the page is moving; fades out shortly after it stops
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      // The last tagged section whose top has passed the middle line wins,
      // so a section laid over another (the projects card) takes over at once.
      let key = 'home';
      document.querySelectorAll<HTMLElement>('[data-section]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) key = el.dataset.section || key;
      });
      setCurrent((prev) => (prev === key ? prev : key));
    };
    let idle = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
      setMoving(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setMoving(false), 1100);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', read);
    // The hero changes its key without scrolling the page; poll lightly for that
    const id = window.setInterval(read, 500);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', read);
      window.clearInterval(id);
      window.clearTimeout(idle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const step = ORDER.indexOf(current) + 1;

  return (
    // Hidden when the page is still, and in the footer where it would sit on the big name
    <div
      className={`fixed bottom-5 left-[22px] md:bottom-7 md:left-8 z-40 pointer-events-none mix-blend-difference text-white transition-opacity duration-500 ${!moving || current === 'contact' || current === 'home' ? 'opacity-0' : 'opacity-100'}`}
      aria-live="polite"
      aria-hidden={!moving || current === 'contact' || current === 'home' || undefined}
    >
      <div className="flex items-center gap-3">
        <span className="relative flex w-2 h-2" aria-hidden="true">
          <span className="absolute inset-0 rounded-full bg-white motion-safe:animate-ping opacity-60" />
          <span className="relative w-2 h-2 rounded-full bg-white" />
        </span>
        <span className="text-[13px] md:text-[14px] leading-none text-white/70 tabular-nums">
          {step} / {ORDER.length}
        </span>
        <span className="relative h-[18px] md:h-[20px] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current}
              initial={reduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block whitespace-nowrap text-[14px] md:text-[16px] leading-[18px] md:leading-[20px] font-medium"
            >
              {t(current)}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}
