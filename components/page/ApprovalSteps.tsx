'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import GrowText, { LIGHT } from '@/components/page/GrowText';

// lines: the name broken into short lines, each set in from the start by
// `indent` (em), the way the reference staggers its step names
export type ApprovalStep = { lines: string[]; indent?: number[]; desc: string; img: string; ltr?: boolean };

const INK = 'text-[#f4f3ea]';
const BODY = 'text-[#dad9d2]';
const OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Phases along the pinned track (0 = section reaches the top, 1 = it leaves)
const INTRO_OUT: [number, number] = [0.035, 0.08];
const RISE: [number, number] = [0.075, 0.19];
const STEPS_FROM = 0.2;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const phase = (p: number, [a, b]: [number, number]) => clamp01((p - a) / (b - a));

// Approvals, step by step, after the reference's numbered steps. One pinned
// stage on dark ground. The label stays near the top with a fine line hanging
// from it. First the heading sits in the middle over the line; scrolling on,
// it fades and shrinks away, and the card climbs up from below the screen
// until the line meets its top edge. Then the dots arrive on the edge and
// each approval takes its stretch of scrolling: the new photograph fades in
// as it settles from a slight zoom, the old name fades, the new one builds
// letter by letter just off the card's start edge, and what it means appears
// word by word just off its end edge, lower down.
export default function ApprovalSteps({ id, label, title, steps }: { id?: string; label: string; title: string; steps: ApprovalStep[] }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const n = steps.length;
  const span = (1 - STEPS_FROM) / n;

  const { scrollYProgress: p } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const introOpacity = useTransform(p, (v) => 1 - smooth(phase(v, INTRO_OUT)));
  const introScale = useTransform(p, (v) => 1 - 0.02 * smooth(phase(v, INTRO_OUT)));
  const introY = useTransform(p, (v) => -16 * smooth(phase(v, INTRO_OUT)));
  const rise = (v: number) => (1 - smooth(phase(v, RISE))) * 75; // svh below its place
  const frameY = useTransform(p, (v) => `${rise(v)}svh`);
  // The line runs from under the label to the card's top edge
  const lineH = useTransform(p, (v) => `calc(var(--ft) + ${rise(v)}svh - var(--lt))`);
  const uiOpacity = useTransform(p, (v) => clamp01((v - (RISE[1] - 0.005)) / 0.02));

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  useMotionValueEvent(p, 'change', (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor((v - STEPS_FROM) / span)));
    if (i !== active) setActive(i);
    const on = v >= RISE[1];
    if (on !== shown) setShown(on);
  });
  const jump = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (STEPS_FROM + (i + 0.5) * span) * (el.offsetHeight - window.innerHeight);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  if (reduce) {
    return (
      <section id={id} className="relative bg-[#1a1a17] text-[#f4f3ea]">
        <div className="flex flex-col items-center text-center px-6 pt-28 md:pt-40 pb-16">
          <span className="font-mono text-[12px] md:text-[13px] tracking-[0.12em] uppercase text-[#f4f3ea]/80">{label}</span>
          <h2 className={`${LIGHT} ${INK} mt-8 text-[36px] md:text-[48px] leading-[0.95] max-w-[14ch]`}>{title}</h2>
        </div>
        <ul className="px-6 md:px-16 pb-28 grid md:grid-cols-2 gap-10">
          {steps.map((st) => (
            <li key={st.img}>
              <div className="relative aspect-[44/52] max-w-[440px] rounded-[16px] bg-[#f4f3ea]/[0.08] p-[13px]">
                <div className="relative w-full h-full overflow-hidden rounded-[4px]"><Image src={st.img} alt="" fill sizes="440px" className="object-cover" /></div>
              </div>
              <h3 className={`${LIGHT} ${INK} mt-5 text-[32px]`}><span dir={st.ltr ? 'ltr' : undefined}>{st.lines.join(' ')}</span></h3>
              <p className={`${LIGHT} ${BODY} mt-2 text-[20px] leading-[1.1]`}>{st.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const s = steps[active];
  const name = s.lines.join(' ');

  return (
    <section id={id} className="relative bg-[#1a1a17] text-[#f4f3ea]">
      <div ref={trackRef} className="relative" style={{ height: `${n * 125 + 220}svh` }}>
        {/* --ft: where the card's top settles, --fh: its height, --lt: where
            the line starts under the label */}
        <div className="sticky top-0 h-[100svh] overflow-hidden [--ft:22svh] [--fh:36svh] [--lt:calc(13svh+24px)] md:[--ft:26svh] md:[--fh:58svh] md:[--lt:calc(11.5svh+26px)]">
          {/* The label, pinned near the top */}
          <span className="absolute inset-x-0 top-[13svh] md:top-[11.5svh] text-center font-mono text-[12px] md:text-[14px] tracking-[0.08em] uppercase text-[#f4f3ea]/85">
            {label}
          </span>

          {/* The line, hanging from the label to the card (or past the
              bottom of the screen until the card arrives) */}
          <motion.span className="absolute left-1/2 top-[var(--lt)] w-px bg-[#f4f3ea]/35" style={{ height: lineH }} aria-hidden="true" />

          {/* The heading in the middle, over the line */}
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-6 text-[34px] sm:text-[42px] md:text-[48px]"
            style={{ opacity: introOpacity, scale: introScale, y: introY }}
          >
            <h2 className={`${LIGHT} ${INK} leading-[0.95] text-center max-w-[12ch] bg-[#1a1a17] py-4`}><GrowText text={title} /></h2>
          </motion.div>

          {/* The card, climbing into place */}
          <motion.div
            className="absolute left-1/2 top-[var(--ft)] h-[var(--fh)] w-[calc(var(--fh)*0.846)] rounded-[16px] bg-[#f4f3ea]/[0.08] p-[10px] md:p-[13px]"
            style={{ x: '-50%', y: frameY }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-[4px]">
              {steps.map((st, i) => (
                <motion.div
                  key={st.img}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1.01 : 1.12 }}
                  transition={{ opacity: { duration: 0.7, ease: 'easeInOut' }, scale: { duration: 1.2, ease: OUT } }}
                  style={{ zIndex: i === active ? 2 : 1 }}
                >
                  <Image src={st.img} alt={i === active ? st.lines.join(' ') : ''} fill loading="eager" sizes="(min-width: 768px) 30vw, 64vw" className="object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: uiOpacity }}>
            {/* The name, off the card's start edge, level with its top (under
                the card on phones) */}
            <div className="absolute start-6 end-[84px] top-[calc(var(--ft)+var(--fh)+4svh)] md:end-[calc(50%+var(--fh)*0.423+72px)] md:start-auto md:top-[calc(var(--ft)+12svh)] text-[34px] sm:text-[40px] md:text-[clamp(36px,3.35vw,56px)]">
              <AnimatePresence mode="wait">
                {shown && (
                  <motion.h3
                    key={name}
                    className={`${LIGHT} ${INK} leading-[0.95]`}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.35 } }}
                    dir={s.ltr ? 'ltr' : undefined}
                    aria-label={name}
                  >
                    {s.lines.map((l, li) => (
                      <span key={li} className="block" style={{ paddingInlineStart: `${s.indent?.[li] ?? 0}em` }}>
                        <GrowText text={l} onView={false} playKey={`${name}-${li}`} delay={0.1 + li * 0.12} />
                      </span>
                    ))}
                  </motion.h3>
                )}
              </AnimatePresence>
            </div>

            {/* What it means, off the card's end edge, lower down */}
            <div className="absolute start-6 end-[84px] bottom-[6svh] md:bottom-auto md:end-auto md:start-[calc(50%+var(--fh)*0.423+72px)] md:top-[calc(var(--ft)+var(--fh)*0.62)] md:w-[clamp(200px,15vw,260px)]">
              <AnimatePresence mode="wait">
                {shown && (
                  <motion.p
                    key={s.desc}
                    className={`${LIGHT} ${BODY} text-[18px] md:text-[clamp(18px,1.67vw,26px)] leading-[1.1]`}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  >
                    {s.desc.split(' ').map((w, wi) => (
                      <motion.span
                        key={wi}
                        className="inline-block origin-left rtl:origin-right"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.35 + wi * 0.03, ease: OUT }}
                      >
                        {w}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Numbered dots on the end edge */}
            <nav className="pointer-events-auto absolute end-3 md:end-[5.5%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 rounded-full border border-[#f4f3ea]/15 p-1.5" aria-label={label}>
              {steps.map((st, i) => (
                <button
                  key={st.img}
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={st.lines.join(' ')}
                  aria-current={i === active ? 'step' : undefined}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full font-mono text-[12px] md:text-[13px] tabular-nums transition-colors duration-500 cursor-pointer focus-ring ${i === active ? 'bg-[#f4f3ea]/20 text-[#f4f3ea]' : 'text-[#f4f3ea]/55 hover:text-[#f4f3ea]'}`}
                  dir="ltr"
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
