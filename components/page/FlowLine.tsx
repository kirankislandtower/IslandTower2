'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';

export type FlowNode = { x: number; y: number; at: number };

// Scale a path written in % of the box (absolute M and C commands, numbers
// in x, y pairs) to pixels, so the stroke draws evenly at any box shape
function toPixels(d: string, w: number, h: number) {
  let i = 0;
  return d.replace(/-?\d*\.?\d+/g, (n) => {
    const v = (parseFloat(n) * (i++ % 2 === 0 ? w : h)) / 100;
    return v.toFixed(1);
  });
}

// A line that flows down the page as it is scrolled, like water along a
// pipe: the path (written in % of its box, so it follows the layout) draws
// in with the scroll as one thin solid line, a faint dashed preview shows
// where it is heading, a red drop with a soft glow leads its tip, and ring
// markers appear where it meets a picture. Purely decorative.
export default function FlowLine({
  d, progress, nodes = [], className = '', tone = 'ink',
}: { d: string; progress: MotionValue<number>; nodes?: FlowNode[]; className?: string; tone?: 'ink' | 'light' }) {
  const box = useRef<HTMLDivElement>(null);
  const ref = useRef<SVGPathElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pd = size.w ? toPixels(d, size.w, size.h) : '';

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const place = (v: number) => {
    const el = ref.current;
    if (!el || !pd) return;
    const pt = el.getPointAtLength(el.getTotalLength() * Math.min(1, Math.max(0, v)));
    px.set(pt.x);
    py.set(pt.y);
  };
  useMotionValueEvent(progress, 'change', place);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => place(progress.get()), [pd]);

  const dropOn = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.9]);
  const previewOn = useTransform(progress, [0, 0.03], [0, 1]);
  // Nothing shows until the line starts drawing
  const anyOn = useTransform(progress, (v) => (v > 0.002 ? 1 : 0));
  const line = tone === 'ink' ? '#1a1a17' : '#f4f3ea';

  return (
    <motion.div ref={box} className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity: anyOn }} aria-hidden="true">
      {pd && (
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`}>
          {/* Where it is heading, faint and dashed */}
          <motion.path d={pd} fill="none" stroke={line} strokeOpacity={0.18} strokeWidth={1} strokeDasharray="5 7" style={{ opacity: previewOn }} />
          {/* The line itself, drawn by the scroll */}
          <motion.path ref={ref} d={pd} fill="none" stroke={line} strokeOpacity={0.6} strokeWidth={1.2} strokeLinecap="round" style={{ pathLength: progress }} />
        </svg>
      )}
      {nodes.map((n, i) => (
        <Node key={i} n={n} progress={progress} />
      ))}
      {/* The drop at the tip */}
      <motion.span
        className="absolute left-0 top-0 w-[10px] h-[10px] -ml-[5px] -mt-[5px] rounded-full bg-accent shadow-[0_0_0_4px_rgba(220,38,38,0.16),0_0_14px_3px_rgba(220,38,38,0.32)]"
        style={{ x: px, y: py, opacity: dropOn }}
      />
    </motion.div>
  );
}

// A ring marker where the line meets a picture, popping in as the line
// reaches it
function Node({ n, progress }: { n: FlowNode; progress: MotionValue<number> }) {
  const from = Math.max(0.005, n.at - 0.04);
  const scale = useTransform(progress, [from, from + 0.08], [0, 1], { clamp: true });
  return (
    <motion.span
      className="absolute w-[46px] h-[46px] md:w-[58px] md:h-[58px] rounded-full border-2 border-accent/70 flex items-center justify-center"
      style={{ left: `${n.x}%`, top: `${n.y}%`, x: '-50%', y: '-50%', scale }}
    >
      <span className="w-[10px] h-[10px] rounded-full bg-accent" />
    </motion.span>
  );
}
