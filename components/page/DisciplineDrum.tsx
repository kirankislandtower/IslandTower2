'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { EASE } from '@/components/home/ui';
import GrowText, { LIGHT } from '@/components/page/GrowText';

export type Discipline = { name: string; icon: keyof typeof ICONS };

// Line icons, one per discipline (24px grid, stroked)
const ICONS = {
  snow: 'M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9M9 4l3 2 3-2M9 20l3-2 3 2M4 9l2 3-2 3M20 9l-2 3 2 3',
  drop: 'M12 2.7c3.5 4.1 6 7.6 6 10.8A6 6 0 0 1 6 13.5c0-3.2 2.5-6.7 6-10.8z',
  plug: 'M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v5',
  building: 'M4 21V5l8-3 8 3v16M4 21h16M9 21v-4h6v4M8 8h2M14 8h2M8 12h2M14 12h2',
  shovel: 'M14 4l6 6M17 7l-8.5 8.5M5 15l4 4-2.5 2.5a2.8 2.8 0 0 1-4-4L5 15z',
  road: 'M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v3',
  wave: 'M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2',
  flask: 'M9 2h6M10 2v6L4.5 18.5A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-2.5L14 8V2M7 15h10',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
} as const;

// "What we build": a cream card set into the dark ground. The section pins
// and, as the page moves, the list of disciplines rolls upward past a fixed
// line; the one on the line is in full ink with its icon, the rest fade with
// distance. A ring of fine lines turns slowly in the corner.
export default function DisciplineDrum({ label, title, text, items }: { label: string; title: string; text: string; items: Discipline[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const n = items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const pos = useTransform(scrollYProgress, [0.05, 0.95], [0, n - 1], { clamp: true });
  const spin = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(pos, 'change', (v) => {
    const i = Math.round(v);
    if (i !== active) setActive(i);
  });

  if (reduce) {
    return (
      <section className="bg-[#1a1a17] p-2 md:p-3">
        <div className="rounded-[14px] md:rounded-[20px] bg-[#f4f3ea] px-6 py-16 md:px-16 md:py-24 grid md:grid-cols-2 gap-10">
          <Intro label={label} title={title} text={text} />
          <ul className="flex flex-col gap-3">
            {items.map((it) => (
              <li key={it.name} className={`${LIGHT} text-[24px] md:text-[30px]`}>{it.name}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-[#1a1a17]" style={{ height: `${n * 30 + 100}svh` }}>
      <div className="sticky top-0 h-[100svh] p-2 md:p-3 pt-[76px] md:pt-[92px]">
        <div className="relative h-full overflow-hidden rounded-[18px] md:rounded-[28px] bg-[#f4f3ea] text-[#1a1a17]">
          <Rings spin={spin} />
          <div className="relative h-full grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1.15fr_1fr] gap-4 md:gap-12 px-6 sm:px-10 lg:px-0 py-10 md:py-0">
            <div className="md:self-center lg:ps-[18%]">
              <Intro label={label} title={title} text={text} />
            </div>
            {/* The roll: fixed line in the middle, names slide past it */}
            <div className="relative min-h-[300px] [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
              {items.map((it, i) => (
                <Item key={it.name} it={it} i={i} pos={pos} on={i === active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro({ label, title, text }: { label: string; title: string; text: string }) {
  const [l1, l2] = title.includes('|') ? title.split('|') : [title, ''];
  return (
    <>
      <span className="sr-only">{label}</span>
      <h2 className={`${LIGHT} text-[42px] sm:text-[56px] lg:text-[clamp(56px,4.8vw,84px)] leading-[1.02]`}>
        <span className="block ps-[1.5em]"><GrowText text={l1.trim()} /></span>
        {l2 && <span className="block"><GrowText text={l2.trim()} delay={0.25} /></span>}
      </h2>
      <p className={`${LIGHT} mt-6 md:mt-8 ms-[2em] sm:ms-[30%] text-[18px] sm:text-[21px] lg:text-[clamp(21px,1.7vw,28px)] leading-[1.22] text-[#1a1a17]/90 max-w-[22ch]`}>{text}</p>
    </>
  );
}

function Item({ it, i, pos, on }: { it: Discipline; i: number; pos: MotionValue<number>; on: boolean }) {
  // Distance from the line, in rows
  const d = useTransform(pos, (v) => i - v);
  const y = useTransform(d, (v) => `calc(-50% + ${v * 2.15}em)`);
  const opacity = useTransform(d, (v) => (Math.abs(v) > 3.6 ? 0 : 1));
    return (
    <motion.div
      className={`${LIGHT} absolute inset-x-0 top-1/2 flex items-center gap-[0.6em] ps-[1.55em] text-[21px] sm:text-[26px] lg:text-[clamp(26px,2.2vw,38px)] leading-none whitespace-nowrap origin-left rtl:origin-right`}
      style={{ y, opacity }}
      aria-current={on ? 'true' : undefined}
    >
      <motion.svg
        width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        className="shrink-0 w-[0.95em] h-[0.95em] text-[#1a1a17] -ms-[1.55em]"
        initial={false}
        animate={{ opacity: on ? 1 : 0, x: on ? 0 : -8 }}
        transition={{ duration: 0.4, ease: EASE }}
        aria-hidden="true"
      >
        <path d={ICONS[it.icon]} />
      </motion.svg>
      <span className={`transition-[color,font-weight] duration-500 ${on ? 'text-[#1a1a17]' : 'text-[#1a1a17]/25'}`} style={{ fontWeight: on ? 400 : 300 }}>{it.name}</span>
    </motion.div>
  );
}

// Fine concentric rings in the lower corner, turning with the page
function Rings({ spin }: { spin: MotionValue<number> }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute -bottom-[18%] -start-[8%] w-[46vw] max-w-[420px] min-w-[220px] text-[#1a1a17]/[0.09] pointer-events-none"
      style={{ rotate: spin }}
      aria-hidden="true"
    >
      {Array.from({ length: 26 }, (_, k) => (
        <ellipse key={k} cx="100" cy="100" rx={96 - k * 3.4} ry={(96 - k * 3.4) * (0.94 - k * 0.004)} fill="none" stroke="currentColor" strokeWidth="0.8" />
      ))}
    </motion.svg>
  );
}
