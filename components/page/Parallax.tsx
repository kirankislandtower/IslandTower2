'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// A layer that moves at its own speed as it passes through the screen.
// `y` is the offset in px when the layer enters at the bottom and when it
// leaves at the top; `scale` likewise, reaching its end value by the time
// the layer is centred.
export default function Parallax({
  children, y = [0, 0], scale, className = '', style,
}: { children?: ReactNode; y?: [number, number]; scale?: [number, number]; className?: string; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ty = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : y);
  const s = useTransform(scrollYProgress, [0, 0.5], reduce || !scale ? [1, 1] : scale, { clamp: true });
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: ty, scale: s }}>
      {children}
    </motion.div>
  );
}
