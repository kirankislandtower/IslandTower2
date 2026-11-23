'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// A paragraph that fills in as it is read: every word starts faint and turns
// to full ink in order as the paragraph moves up the screen, so the colour
// boundary travels through the text with the scroll (and back again).
export default function ReadText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} p={scrollYProgress} from={i / words.length} to={(i + 1) / words.length}>
          {w}
          {i < words.length - 1 && ' '}
        </Word>
      ))}
    </p>
  );
}

function Word({ p, from, to, children }: { p: MotionValue<number>; from: number; to: number; children: React.ReactNode }) {
  const opacity = useTransform(p, [from, to], [0.22, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}
