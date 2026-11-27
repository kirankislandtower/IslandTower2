'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';

// Shared parts of the home page: the Evermind-style layout (warm cream
// ground, serif headings, small dotted labels, pill buttons) carried in
// Island Tower's own red.

export const CREAM = 'bg-[#f4f3ea]';
export const INK = 'text-[#1a1a17]';
export const GUTTER = 'px-[18px] md:px-6 lg:px-8';
export const SERIF = 'font-serif [font-weight:360] tracking-[-0.03em]';

export const EASE = [0.22, 1, 0.36, 1] as const;

// "● HOW WE WORK" — the small dotted label above each heading
export function Label({ children, light = false, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[11px] leading-none font-medium tracking-[0.08em] uppercase ${light ? 'text-[#f4f3ea]' : 'text-[#3f403c]'} ${className}`}>
      <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

type PillProps = { children: ReactNode; href?: string; onClick?: () => void; variant?: 'accent' | 'outline' | 'ghost-light' | 'dark' };

// Small rounded buttons; the text rolls up on hover, as on the reference
export function Pill({ children, href, onClick, variant = 'outline' }: PillProps) {
  const styles = {
    accent: 'bg-accent text-white hover:bg-[#b91c1c]',
    outline: 'border border-[#1a1a17]/20 text-[#1a1a17] hover:bg-[#1a1a17] hover:text-[#f4f3ea]',
    'ghost-light': 'bg-white/10 text-[#f4f3ea] hover:bg-white/20 backdrop-blur-sm',
    dark: 'bg-[#1a1a17] text-[#f4f3ea] hover:bg-accent',
  }[variant];
  const cls = `group relative inline-flex items-center h-9 px-4 rounded-full text-[14px] leading-none overflow-hidden transition-colors duration-300 cursor-pointer focus-ring ${styles}`;
  const inner = (
    <span className="relative block overflow-hidden h-[16px]">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-x-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full" aria-hidden="true">
        {children}
      </span>
    </span>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}

// Rises into place once, as the element enters the screen
// Reveals with the scroll, bottom to top: a block comes onto the screen
// faint, blurred and a little low, and sharpens and rises into place as it
// is scrolled up, finishing about a third of the way up the screen. It
// follows the scroll both ways. A delay starts it a touch later, so blocks
// side by side still come in one after another.
export function Rise({ children, delay = 0, className = '', y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 1', 'start 0.62'] });
  const lag = Math.min(0.5, delay * 1.4);
  const k = useTransform(scrollYProgress, (v) => {
    const t = Math.min(1, Math.max(0, (v - lag) / (1 - lag)));
    return 1 - Math.pow(1 - t, 2);
  });
  const opacity = useTransform(k, (t) => 0.3 + 0.7 * t);
  const ty = useTransform(k, (t) => (1 - t) * y);
  const filter = useTransform(k, (t) => (t >= 0.999 ? 'none' : `blur(${(1 - t) * 4}px)`));
  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ opacity, y: ty, filter }}>
      {children}
    </motion.div>
  );
}

export function ArrowCircle({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${className}`} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </span>
  );
}
