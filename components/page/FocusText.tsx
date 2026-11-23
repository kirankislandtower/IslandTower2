'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// A large statement whose words come into focus one after another as it
// scrolls up the screen: each starts faint and blurred and sharpens in turn.
// Tied to scroll position, so it runs backwards when the page goes back up.
export default function FocusText({
  text, as: Tag = 'p', className = '',
}: { text: string; as?: 'p' | 'h2' | 'h3'; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.38'] });
  const words = text.split(' ');
  const MTag = motion[Tag];

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <MTag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <Word key={i} p={scrollYProgress} i={i} n={words.length}>
          {w}
          {i < words.length - 1 && ' '}
        </Word>
      ))}
    </MTag>
  );
}

function Word({ p, i, n, children }: { p: MotionValue<number>; i: number; n: number; children: React.ReactNode }) {
  // Each word gets an overlapping slice of the scroll so the focus travels
  // through the sentence rather than snapping word by word
  const start = (i / n) * 0.75;
  const end = start + 0.25;
  const opacity = useTransform(p, [start, end], [0.18, 1]);
  const blur = useTransform(p, [start, end], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const y = useTransform(p, [start, end], [10, 0]);
  return (
    <motion.span className="inline-block whitespace-pre" style={{ opacity, filter, y }}>
      {children}
    </motion.span>
  );
}
