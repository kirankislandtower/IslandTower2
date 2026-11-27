'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { EASE, Pill, SERIF } from './ui';
import GrowText from '@/components/page/GrowText';
import FlowLine from '@/components/page/FlowLine';

// The first screen: the photograph full bleed, the headline set very large in
// the light serif across it in three staggered lines (building letter by
// letter on load), the explanation and the two actions at the bottom end,
// and a scroll cue. As the
// page moves and the photograph draws back, the headline's lines drift apart
// sideways and fade, then the rest fades, leaving the photograph.
// Then the frame closes into a rounded card
// in the middle while the ground turns cream and two lines slide in either
// side of it (from the plant ... to the building), flowing lines drawing
// from the words into the card with a drop at their tips, then the page
// releases.
// Share of the track spent on each stage: the photograph, then the card closing
// (the track is 6 screens: the photograph takes the first ~1.5, the card
// closes slowly over the next ~1.35, the words build and the line draws
// over the next ~1.6, then the finished scene holds for half a screen)
const VIDEO_END = 0.31;
const CARD_END = 0.58;
const WORDS_LEFT: [number, number] = [0.42, 0.68];
const WORDS_RIGHT: [number, number] = [0.52, 0.78];
const LINE: [number, number] = [0.58, 0.9];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));


export default function EvHero({ onQuote }: { onQuote: () => void }) {
  const t = useTranslations('Home2.hero');
  const a = useTranslations('AboutPage');
  const reduce = useReducedMotion();

  // The section is a tall track with the frame pinned inside it. Scrolling
  // through the first part slowly draws the photograph back and lifts it a
  // little (both directions); then the frame closes and the page releases.
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const photoScale = useTransform(scrollYProgress, [0, VIDEO_END], [1.14, 1.02]);
  const photoY = useTransform(scrollYProgress, [0, VIDEO_END], ['0%', '-3%']);

  // How far the card has closed (0 = full screen, 1 = card)
  const close = useTransform(scrollYProgress, (p) => clamp01((p - VIDEO_END) / (CARD_END - VIDEO_END)));
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const insetX = wide ? 25 : 7;
  const insetY = wide ? 22 : 27;
  const clip = useTransform(close, (v) => {
    const e = 1 - Math.pow(1 - v, 2);
    return `inset(${e * insetY}% ${e * insetX}% ${e * insetY}% ${e * insetX}% round ${e * 24}px)`;
  });
  const footageScale = useTransform(close, [0, 1], [1, 0.9]);
  const groundColor = useTransform(close, [0, 0.6], ['#1a1a17', '#f4f3ea']);
  const tint = useTransform(close, [0, 0.7], [1, 0]);
  const textOpacity = useTransform(close, [0, 0.3], [1, 0]);
  const textEvents = useTransform(close, (v) => (v > 0.25 ? 'none' : 'auto'));
  // The headline's lines drift apart and fade while the footage plays
  const drift = useTransform(scrollYProgress, (p) => clamp01(p / (VIDEO_END * 0.55)));
  const lineX0 = useTransform(drift, (v) => `${-v * 10}vw`);
  const lineX1 = useTransform(drift, (v) => `${v * 12}vw`);
  const lineX2 = useTransform(drift, (v) => `${-v * 8}vw`);
  const headOpacity = useTransform(drift, [0, 0.8], [1, 0]);
  const sideOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01((p - VIDEO_END * 0.25) / (VIDEO_END * 0.35)));
  // The two lines either side of the card slide in as it closes
  const dir = useLocale() === 'ar' ? -1 : 1; // the start side is on the right in Arabic
  const leftX = useTransform(close, [0.25, 0.95], [(wide ? -220 : -60) * dir, 0]);
  const rightX = useTransform(close, [0.25, 0.95], [(wide ? 220 : 60) * dir, 0]);
  // Pipes from the first line into the card and out of it to the second
  const pipeDraw = useTransform(scrollYProgress, LINE, [0, 1], { clamp: true });
  const mx = (x: number) => (dir === 1 ? x : 100 - x); // mirrored in Arabic
  // One flowing line: from under the first words, down and along beneath the
  // card, then up to the second words (in % of the stage; x mirrored in
  // Arabic). On phones it runs down the side margin past the card.
  const c = (pts: number[]) => {
    const [x1, y1, ...rest] = pts;
    let d = `M${mx(x1)} ${y1}`;
    for (let i = 0; i < rest.length; i += 6) {
      d += ` C${mx(rest[i])} ${rest[i + 1]} ${mx(rest[i + 2])} ${rest[i + 3]} ${mx(rest[i + 4])} ${rest[i + 5]}`;
    }
    return d;
  };
  const flow = wide
    ? c([13, 41, 13, 62, 16, 86, 34, 86, 60, 86, 72, 86, 82, 86, 88, 86, 88, 80])
    : c([10, 19, 3, 30, 3, 66, 10, 80]);


  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1, delay, ease: EASE },
  });

  // The headline in three lines of roughly equal length
  const words = t('title').split(' ');
  const total = t('title').length;
  const lines: string[] = ['', '', ''];
  let count = 0;
  words.forEach((w) => {
    const i = Math.min(2, Math.floor((count / total) * 3));
    lines[i] = lines[i] ? `${lines[i]} ${w}` : w;
    count += w.length + 1;
  });


  return (
    <section
      ref={trackRef}
      data-section="home"
      className={`relative z-0 w-full ${reduce ? 'h-[100svh] min-h-[640px] bg-[#1a1a17]' : 'h-[600svh]'}`}
    >
      <motion.div
        className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden text-[#f4f3ea]"
        style={reduce ? undefined : { backgroundColor: groundColor }}
      >
        {/* The photograph, drawn back slowly by the scroll, inside the frame
            that closes into a card */}
        <motion.div className="absolute inset-0 overflow-hidden" style={reduce ? undefined : { clipPath: clip }}>
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: footageScale }}>
            <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: photoScale, y: photoY }}>
              <Image
                src="/images/home-banner-abudhabi.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_60%]"
              />
            </motion.div>
          </motion.div>
          <motion.div className="absolute inset-0 bg-[#1a1a17]/40" style={reduce ? undefined : { opacity: tint }} aria-hidden="true" />
        </motion.div>

        {/* Two lines set large either side of the card as it closes (above
            and below it on phones): from the plant ... to the building */}
        {!reduce && (
          <>
            <motion.p
              className={`${SERIF} absolute text-[#1a1a17] pointer-events-none start-[16px] top-[11%] text-[12vw] md:start-[3%] md:top-[24%] md:w-[20vw] md:text-[clamp(44px,5.4vw,96px)] leading-[0.95]`}
              style={{ x: leftX }}
              aria-hidden="true"
            >
              <ScrubLetters text={t('closeLeft')} progress={scrollYProgress} from={WORDS_LEFT[0]} to={WORDS_LEFT[1]} />
            </motion.p>
            <motion.p
              className={`${SERIF} absolute text-[#1a1a17] pointer-events-none end-[16px] bottom-[15%] text-[12vw] text-end md:end-[3%] md:bottom-[24%] md:w-[20vw] md:text-[clamp(44px,5.4vw,96px)] leading-[0.95]`}
              style={{ x: rightX }}
              aria-hidden="true"
            >
              <ScrubLetters text={t('closeRight')} progress={scrollYProgress} from={WORDS_RIGHT[0]} to={WORDS_RIGHT[1]} />
            </motion.p>
            <FlowLine d={flow} progress={pipeDraw} />
          </>
        )}

        {/* A soft shade so the type reads over any frame */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(26,26,23,0.25) 0%, rgba(26,26,23,0) 30%, rgba(26,26,23,0) 55%, rgba(26,26,23,0.55) 100%)', opacity: reduce ? 1 : textOpacity }}
          aria-hidden="true"
        />

        <motion.div className="relative h-full px-[16px] md:px-8" style={reduce ? undefined : { opacity: textOpacity, pointerEvents: textEvents }}>
          {/* The headline, three staggered lines across the frame */}
          <motion.h1
            className={`${SERIF} absolute inset-x-[16px] md:inset-x-8 top-[18svh] md:top-[16svh] flex flex-col text-[13vw] sm:text-[10vw] lg:text-[8.2vw] leading-[0.95]`}
            style={reduce ? undefined : { opacity: headOpacity }}
            aria-label={t('title')}
          >
            {lines.map((l, i) => (
              <motion.span
                key={i}
                className={`block whitespace-nowrap ${['', 'ps-[12%] md:ps-[22%]', 'ps-[4%] md:ps-[9%]'][i] ?? ''}`}
                style={reduce ? undefined : { x: [lineX0, lineX1, lineX2][i] }}
                aria-hidden="true"
              >
                <GrowText text={l} onView={false} delay={0.25 + i * 0.22} stagger={0.035} />
              </motion.span>
            ))}
          </motion.h1>

          {/* The explanation and the actions, bottom end */}
          <motion.div {...enter(1.05)} className="absolute inset-x-[16px] md:inset-x-auto md:end-28 bottom-[96px] md:bottom-10 md:w-[min(34vw,440px)]">
            <motion.div style={reduce ? undefined : { opacity: sideOpacity }}>
              <p className="text-[15px] md:text-[16px] leading-[1.5] font-medium text-[#f4f3ea]/90">{t('body')}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Pill href="/projects" variant="accent">{t('primary')}</Pill>
                <button type="button" onClick={onQuote} className="group inline-flex items-center gap-3 h-[44px] text-[14px] cursor-pointer focus-ring">
                  <span className="flex -space-x-2 rtl:space-x-reverse" aria-hidden="true">
                    <span className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-[#1a1a17]/40">
                      <Image src="/images/projects/hse-safety-briefing-difc.jpg" alt="" fill sizes="28px" className="object-cover" />
                    </span>
                    <span className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-[#1a1a17]/40">
                      <Image src="/images/projects/weld-inspection-tecom.jpg" alt="" fill sizes="28px" className="object-cover" />
                    </span>
                  </span>
                  <span className="group-hover:text-accent transition-colors">{t('secondary')}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll cue, bottom centre (clear of the WhatsApp button in both languages) */}
          <motion.div {...enter(1.2)} className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 flex-col items-center gap-3">
            <motion.div style={reduce ? undefined : { opacity: sideOpacity }} className="flex flex-col items-center gap-3">
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#f4f3ea]/85">{a('heroScroll')}</span>
              <span className="relative block w-px h-[9svh] bg-[#f4f3ea]/30 overflow-hidden" aria-hidden="true">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-[#f4f3ea] animate-[scrollcue_2.2s_ease-in-out_infinite]" />
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// A line whose letters build with the scroll: across the given part of the
// progress, each letter in turn goes from faint and thin to full weight and
// settles up into place (back again when scrolling up). Arabic builds word
// by word so its letters stay joined.
function ScrubLetters({ text, progress, from, to }: { text: string; progress: MotionValue<number>; from: number; to: number }) {
  const byWord = /[\u0600-\u06FF]/.test(text);
  const words = text.split(/(\s+)/);
  const count = byWord ? words.filter((w) => w.trim()).length : text.replace(/\s/g, '').length;
  // Each letter takes six steps to build, so the last one finishes at `to`
  const span = (to - from) / Math.max(1, count + 5);
  let k = 0;
  const char = (ch: string, key: string) => {
    const i = k++;
    return <ScrubChar key={key} ch={ch} progress={progress} a={from + i * span} b={from + i * span + span * 6} />;
  };
  return (
    <>
      {words.map((w, wi) =>
        !w.trim() ? (
          <span key={wi}>{w}</span>
        ) : byWord ? (
          char(w, String(wi))
        ) : (
          // Letters of one word stay together so lines only break between words
          <span key={wi} className="inline-block whitespace-nowrap">{Array.from(w).map((ch, ci) => char(ch, `${wi}-${ci}`))}</span>
        ),
      )}
    </>
  );
}

function ScrubChar({ ch, progress, a, b }: { ch: string; progress: MotionValue<number>; a: number; b: number }) {
  // How far this letter has built: 0 before its turn, 1 once built (and it
  // stays solid after that). Invisible until its turn, so nothing shows on
  // the first screen.
  const k = (v: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
  const opacity = useTransform(progress, (v) => (v < a ? 0 : 0.06 + 0.94 * k(v)));
  const fontWeight = useTransform(progress, (v) => 200 + 180 * k(v));
  const y = useTransform(progress, (v) => `${0.3 * (1 - k(v))}em`);
  return <motion.span className="inline-block" style={{ opacity, fontWeight, y }}>{ch}</motion.span>;
}
