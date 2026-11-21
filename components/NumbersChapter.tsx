'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, type MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';

// A two-part scroll chapter:
// 1. A starburst of lines, each naming one part of the work, turning slowly
//    while the page flips from white to black.
// 2. A ring of the company's own site photos turning around the founding
//    year, then sliding aside for the real figures, which light up in turn.

const RAYS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8'] as const;

const PHOTOS = [
  '/images/projects/chilled-water-flushing-works.jpg',
  '/images/projects/jvt-tank-installation.jpg',
  '/images/projects/weld-inspection-tecom.jpg',
  '/images/projects/rta-shindagha-valve-chamber.jpg',
  '/images/projects/hse-safety-briefing-difc.jpg',
  '/images/projects/saadiyat-flushing-equipment.jpg',
  '/images/projects/fabrication-piping-skid.jpg',
  '/images/projects/tecom-mechanical-room.jpg',
  '/images/projects/chilled-water-pump-replacement.jpg',
  '/images/site/scaffolding-piping-install.jpg',
  '/images/site/fire-piping-plant-room.jpg',
  '/images/site/large-diameter-pipe-install.jpg',
  '/images/projects/shindagha-pipe-trench-shoring.jpg',
  '/images/projects/green-field-plant-piping.jpg',
];

const COUNTERS = ['c1', 'c2', 'c3', 'c4'] as const;

export default function NumbersChapter() {
  const t = useTranslations('Numbers');
  const reduceMotion = !!useReducedMotion();

  return (
    <section data-section="numbers" aria-labelledby="numbers-heading" className="relative">
      <h2 id="numbers-heading" className="sr-only">{t('heading')}</h2>
      <Starburst t={t} reduceMotion={reduceMotion} />
      <Ring t={t} reduceMotion={reduceMotion} />
    </section>
  );
}

type T = ReturnType<typeof useTranslations>;

function Starburst({ t, reduceMotion }: { t: T; reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const armRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Pinned range drives the colour switch; the whole pass drives the turn
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const { scrollYProgress: rawPass } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const p = useTransform(raw, (v) => v);
  const pass = useTransform(rawPass, (v) => v);
  const turn = useTransform(pass, [0, 1], [0, reduceMotion ? 0 : -190]);

  // The arms bend while the page is moving and straighten when it stops
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const twistRaw = useTransform(velocity, (v) => (reduceMotion ? 0 : Math.max(-42, Math.min(42, v / 45))));
  const twist = useSpring(twistRaw, { stiffness: 90, damping: 22, mass: 0.6 });

  const [dark, setDark] = useState(false);
  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.5 && !dark) setDark(true);
    else if (v < 0.46 && dark) setDark(false);
  });

  useAnimationFrame(() => {
    const box = boxRef.current;
    if (!box) return;
    const size = box.offsetWidth;
    const c = size / 2;
    const r = size * 0.5;
    const rot = turn.get();
    const tw = twist.get();
    RAYS.forEach((_, i) => {
      const base = i * 45 - 104 + rot;
      // Arm: a polyline from the centre whose inner points lag behind
      let d = '';
      for (let k = 0; k <= 14; k++) {
        const f = k / 14;
        const ang = ((base + tw * (1 - f) * (1 - f)) * Math.PI) / 180;
        const rr = r * 0.93 * f;
        d += `${k ? 'L' : 'M'}${(c + rr * Math.cos(ang)).toFixed(1)},${(c + rr * Math.sin(ang)).toFixed(1)}`;
      }
      armRefs.current[i]?.setAttribute('d', d);
      const la = (base * Math.PI) / 180;
      const el = labelRefs.current[i];
      if (el) el.style.transform = `translate(-50%, -50%) translate(${(r * Math.cos(la)).toFixed(1)}px, ${(r * Math.sin(la)).toFixed(1)}px)`;
    });
  });

  const first = t('statement1').split('\n');
  const second = t('statement2').split('\n');
  const EASE_SWAP = [0.76, 0, 0.24, 1] as const;

  return (
    <div ref={ref} className="relative" style={{ height: '220vh' }}>
      <div
        className={`sticky top-0 h-[100dvh] w-full overflow-hidden transition-colors duration-700 ${dark ? 'bg-black text-white' : 'bg-white text-[#111]'}`}
      >
        <div ref={boxRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(78vw,80vh,760px)] aspect-square">
          <svg className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
            <defs>
              <radialGradient id="arm-fade">
                <stop offset="0.12" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
                <stop offset="1" stopColor="#fff" stopOpacity="1" />
              </radialGradient>
              <mask id="arm-mask" maskUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#arm-fade)" />
              </mask>
            </defs>
            <g mask="url(#arm-mask)" className={`transition-colors duration-700 ${dark ? 'text-white/45' : 'text-black/30'}`}>
              {RAYS.map((k, i) => (
                <path key={k} ref={(el) => { armRefs.current[i] = el; }} stroke="currentColor" strokeWidth={0.95} fill="none" />
              ))}
            </g>
          </svg>
          {RAYS.map((k, i) => (
            <span
              key={k}
              ref={(el) => { labelRefs.current[i] = el; }}
              className="absolute left-1/2 top-1/2 whitespace-nowrap text-[12px] md:text-[14px] leading-none"
            >
              {t(k)}
            </span>
          ))}
        </div>

        {/* Two statements, swapped line by line through masks */}
        <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
          <div className="relative text-center">
            {[first, second].map((lines, h) => (
              <p
                key={h}
                className={`${h === 1 ? 'absolute inset-x-0 top-0' : ''} text-[38px] md:text-[72px] leading-[0.98] font-medium tracking-[-0.01em] whitespace-nowrap`}
                aria-hidden={h === 1 ? !dark : dark}
              >
                {lines.map((line, li) => {
                  const shown = h === 0 ? !dark : dark;
                  const y = shown ? '0%' : h === 0 ? '-118%' : '118%';
                  return (
                    <span key={li} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                      <motion.span
                        className="block"
                        initial={false}
                        animate={{ y }}
                        transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : li * 0.07, ease: EASE_SWAP }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Ring path, keyed to the pinned progress: [progress, centreX vw, centreY vh, radius vmin]
// 1. a huge arc sweeping in from the lower right under the statement
// 2. tightening into a full ring round the founding year
// 3. sliding left beside the figures, then lifting away
const RING_PATH = {
  at: [0, 0.2, 0.34, 0.5, 0.58, 0.66, 0.78, 0.92, 1],
  cx: [70, 62, 50, 50, 50, 34, -6, -4, -4],
  cy: [186, 170, 50, 50, -22, 46, -8, -16, -90],
  r: [112, 100, 72, 72, 60, 30, 92, 92, 92],
};
// Fewer, larger prints with clear gaps between them
const RING_COUNT = 14;
// Share of the hold used by the story; the rest is the next section covering it
const STORY_SHARE = 480 / 580;

function Ring({ t, reduceMotion }: { t: T; reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // The story plays over the first part of the hold; for the last screen the
  // next section slides up over it, so the story finishes before that starts.
  const p = useTransform(raw, (v) => Math.min(1, v / STORY_SHARE));
  const cover = useTransform(raw, [STORY_SHARE, 1], [0, 1]);
  // Behind the card the story sinks back: rises more slowly, shrinks and fades
  const stageY = useTransform(cover, [0, 1], ['0vh', reduceMotion ? '0vh' : '-38vh']);
  const stageDim = useTransform(cover, [0, 1], [1, 0.12]);
  const stageScale = useTransform(cover, [0, 1], [1, reduceMotion ? 1 : 0.9]);

  const cx = useTransform(p, RING_PATH.at, RING_PATH.cx);
  const cy = useTransform(p, RING_PATH.at, RING_PATH.cy);
  const radius = useTransform(p, RING_PATH.at, RING_PATH.r);
  const spin = useTransform(p, [0, 1], [0, reduceMotion ? 0 : -300]);
  // Prints are larger while they sweep in, settling to size in the ring
  const printScale = useTransform(p, [0, 0.32], [1.08, 1]);
  // As the ring breaks up it curls inward into a loose spiral, then opens again
  const curl = useTransform(p, [0.56, 0.66, 0.78], [0, 1, 0]);

  // On narrow screens the figures sit over the ring, so the ring dims behind them
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const ringDim = useTransform(p, [0.62, 0.7], [1, narrow ? 0.18 : 1]);

  useAnimationFrame(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const w = stage.offsetWidth;
    const h = stage.offsetHeight;
    const vmin = Math.min(w, h) / 100;
    const x0 = (cx.get() / 100) * w;
    const y0 = (cy.get() / 100) * h;
    const r = radius.get() * vmin;
    const s = spin.get();
    const k = printScale.get();
    const c = curl.get();
    for (let i = 0; i < RING_COUNT; i++) {
      const el = photoRefs.current[i];
      if (!el) continue;
      const deg = (i / RING_COUNT) * 360 + s;
      const rad = ((deg - 90) * Math.PI) / 180;
      const ri = r * (1 - c * 0.55 * (i / RING_COUNT));
      // Each print is turned to face out from the centre
      el.style.transform = `translate(${(x0 + ri * Math.cos(rad)).toFixed(1)}px, ${(y0 + ri * Math.sin(rad)).toFixed(1)}px) translate(-50%, -50%) rotate(${deg.toFixed(2)}deg) scale(${k.toFixed(3)})`;
    }
  });

  const statementY = useTransform(p, [0.16, 0.3], ['0vh', '-70vh']);
  const statementOpacity = useTransform(p, [0.2, 0.3], [1, 0]);
  const foundOpacity = useTransform(p, [0.28, 0.34, 0.5, 0.56], [0, 1, 1, 0]);
  // Arrives low in the ring, settles in the centre, then rises out with it
  const foundY = useTransform(p, [0.28, 0.38, 0.5, 0.58], ['26vh', '0vh', '0vh', '-30vh']);
  const listOpacity = useTransform(p, [0.64, 0.7], [0, 1]);
  const listY = useTransform(p, [0.64, 1], ['34%', '-58%']);

  return (
    <div ref={ref} className="relative bg-black text-white" style={{ height: '580vh' }}>
      <motion.div ref={stageRef} className="sticky top-0 h-[100dvh] w-full overflow-hidden" style={{ y: stageY, opacity: stageDim, scale: stageScale }}>
        {/* The prints */}
        <motion.ul className="absolute inset-0" style={{ opacity: ringDim }} aria-hidden="true">
          {Array.from({ length: RING_COUNT }, (_, i) => (
            <li
              key={i}
              ref={(el) => { photoRefs.current[i] = el; }}
              className="absolute left-0 top-0 w-[clamp(64px,10.6vw,152px)] aspect-[1/1.06] will-change-transform"
            >
              <Image src={PHOTOS[i % PHOTOS.length]} alt="" fill sizes="150px" className="object-cover" />
            </li>
          ))}
        </motion.ul>

        {/* 1. The statement, top left, while the arc sweeps in */}
        <motion.div
          className="absolute top-0 inset-x-0 px-[22px] md:px-8 pt-28 md:pt-36 grid grid-cols-12 gap-x-6 pointer-events-none"
          style={reduceMotion ? { opacity: statementOpacity } : { y: statementY, opacity: statementOpacity }}
        >
          <span className="col-span-12 md:col-span-2 text-[14px] md:text-[15px] text-white/70 mb-4 md:mb-0 md:pt-3">{t('teamLabel')}</span>
          <p className="col-span-12 md:col-span-9 text-[40px] md:text-[86px] leading-[0.95] font-medium tracking-[-0.01em] max-w-[16ch] text-balance">
            {t('teamStatement')}
          </p>
        </motion.div>

        {/* 2. The founding year, centred in the ring */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          style={reduceMotion ? { opacity: foundOpacity } : { opacity: foundOpacity, y: foundY }}
        >
          <p className="text-[56px] md:text-[112px] leading-[0.9] font-medium tracking-[-0.01em]">
            <span className="block"><span className="tabular-nums">{t('foundYear')}</span> {t('foundLine1')}</span>
            <span className="block">{t('foundLine2')}</span>
          </p>
          <p className="mt-8 text-[14px] md:text-[15px] text-white/60 max-w-[44ch]">{t('foundNote')}</p>
        </motion.div>

        {/* 3. The figures: the list rises, the one in view lights up */}
        <motion.div
          className="absolute inset-y-0 right-0 w-full lg:w-[50%] px-6 md:px-8 flex items-center"
          style={{ opacity: listOpacity }}
        >
          <motion.ol className="flex flex-col gap-[14vh] w-full" style={reduceMotion ? undefined : { y: listY }}>
            {COUNTERS.map((c, i) => (
              <Counter key={c} k={c} i={i} p={p} t={t} reduceMotion={reduceMotion} />
            ))}
          </motion.ol>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Counter({ k, i, p, t, reduceMotion }: { k: string; i: number; p: MotionValue<number>; t: T; reduceMotion: boolean }) {
  // Each figure has its own slice of the scroll in which it is lit
  const start = 0.7 + i * 0.07;
  const lit = useTransform(p, [start - 0.04, start, start + 0.06, start + 0.1], [0.22, 1, 1, 0.22]);
  return (
    <motion.li style={{ opacity: reduceMotion ? 1 : lit }}>
      <p className="text-[64px] md:text-[128px] leading-[0.85] font-medium tracking-[-0.01em] tabular-nums">{t(`${k}v`)}</p>
      <p className="mt-3 ms-[12%] text-[28px] md:text-[52px] leading-[1.02] font-light tracking-[-0.01em] max-w-[14ch]">{t(`${k}l`)}</p>
    </motion.li>
  );
}
