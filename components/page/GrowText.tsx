'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// The light serif used by the Dwell-style sections, at its resting weight
export const LIGHT = 'font-serif tracking-[-0.03em] [font-weight:360]';

const ARABIC = /[؀-ۿ]/;

// Text that builds letter by letter: each letter starts invisible, a little
// small and very thin, then grows to full size and weight in turn (the font
// is variable, so the weight itself animates). Arabic is animated word by
// word so its letters stay joined. Plays when it scrolls into view, or again
// whenever `playKey` changes.
export default function GrowText({
  text, className = '', delay = 0, stagger = 0.028, onView = true, playKey,
}: { text: string; className?: string; delay?: number; stagger?: number; onView?: boolean; playKey?: string | number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '-10% 0px' });
  const play = !onView || seen;

  if (reduce) return <span className={className}>{text}</span>;

  const byWord = ARABIC.test(text);
  const step = byWord ? stagger * 3 : stagger;
  let n = 0;
  const piece = (ch: string, key: string) => (
    <motion.span
      key={key}
      aria-hidden="true"
      className="inline-block origin-bottom"
      initial={{ opacity: 0, scale: 0.86, fontWeight: 200 }}
      animate={play ? { opacity: 1, scale: 1, fontWeight: 360 } : { opacity: 0, scale: 0.86, fontWeight: 200 }}
      transition={{ duration: 0.7, delay: delay + n++ * step, ease: [0.22, 1, 0.36, 1] }}
    >
      {ch}
    </motion.span>
  );

  return (
    <span ref={ref} key={playKey} className={className} aria-label={text}>
      {text.split(/(\s+)/).map((w, wi) =>
        /^\s+$/.test(w) || !w ? (
          <span key={wi} aria-hidden="true">{w}</span>
        ) : byWord ? (
          piece(w, String(wi))
        ) : (
          // Letters of one word stay together so lines only break between words
          <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
            {Array.from(w).map((ch, ci) => piece(ch, `${wi}-${ci}`))}
          </span>
        ),
      )}
    </span>
  );
}
