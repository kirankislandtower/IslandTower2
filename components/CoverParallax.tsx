'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Wraps a section so the next one slides over it like a card: as the section
// leaves the screen it moves up more slowly than the page, shrinks a little
// and fades. The section that follows needs `relative z-10` to sit on top.
export default function CoverParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['end end', 'end start'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const p = useTransform(raw, (v) => v);
  const y = useTransform(p, [0, 1], ['0vh', reduceMotion ? '0vh' : '62vh']);
  const scale = useTransform(p, [0, 1], [1, reduceMotion ? 1 : 0.9]);
  const opacity = useTransform(p, [0, 1], [1, 0.15]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y, scale, opacity, transformOrigin: '50% 100%' }}>{children}</motion.div>
    </div>
  );
}
