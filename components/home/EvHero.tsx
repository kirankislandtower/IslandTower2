'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE, Pill } from './ui';

// The first screen, measured from the reference at 1440×900:
// a hairline across the frame at about a third of the way down, the dotted
// label under it, the 60px serif headline on two lines at the left, the
// explanation and actions on the right sitting on the headline's baseline,
// and the founding note 32px from the bottom corner.
// On load the headline words come out of a blur one after another. Once the
// page starts to move, all the text goes soft and fades (the label 5px, the
// rest 10px) while the footage stays sharp.
// After the last frame of the footage, the frame closes into a rounded card
// in the middle while the ground turns cream and four site photographs drift
// in around it, then the page releases to the next section.
const BLUR_ON = 30;

// Share of the track spent on each stage: the footage, then the card closing
const VIDEO_END = 0.55;
const CARD_END = 0.85;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// The photographs around the card. Phone positions sit above and below the
// card; from md up they sit either side of it.
const COLLAGE = [
  { src: '/images/site/excavation-team-trench.jpg', cls: 'top-[11%] start-[6%] w-[30vw] aspect-[4/3] md:top-[13%] md:start-[5%] md:w-[13vw] md:aspect-square' },
  { src: '/images/site/pump-room-team.jpg', cls: 'bottom-[8%] start-[8%] w-[34vw] aspect-[4/3] md:bottom-auto md:top-[60%] md:start-[10%] md:w-[11vw] md:aspect-[4/5]' },
  { src: '/images/site/scaffolding-piping-install.jpg', cls: 'top-[12%] end-[6%] w-[26vw] aspect-square md:top-[10%] md:end-[6%] md:w-[12vw] md:aspect-[4/5]' },
  { src: '/images/site/rooftop-cooling-equipment.jpg', cls: 'bottom-[9%] end-[7%] w-[28vw] aspect-[4/5] md:bottom-auto md:top-[62%] md:end-[8%] md:w-[13vw] md:aspect-[4/3]' },
];

export default function EvHero({ onQuote }: { onQuote: () => void }) {
  const t = useTranslations('Home2.hero');
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // The section is a tall track with the frame pinned inside it. Scrolling
  // through the track scrubs the footage frame by frame (both directions), and
  // the frame only releases to the next section once the last frame is shown.
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const target = useRef(0);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    target.current = clamp01(p / VIDEO_END);
  });

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;
    video.pause();
    let raf = 0;
    let shown = -1;
    const tick = () => {
      const d = video.duration;
      if (d && video.readyState >= 1) {
        // Ease toward the scroll position so a flick of the wheel glides
        // instead of jumping between frames
        const goal = target.current * (d - 0.05);
        const next = shown < 0 ? goal : shown + (goal - shown) * 0.25;
        if (Math.abs(next - shown) > 0.004) {
          video.currentTime = next;
          shown = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const [soft, setSoft] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => {
    if (v > BLUR_ON && !soft) setSoft(true);
    else if (v <= BLUR_ON && soft) setSoft(false);
  });

  // Blur state for a block of text: sharp at the top, soft once scrolling
  const blur = (px: number, fade = 0.55) =>
    reduce
      ? { animate: { opacity: soft ? 0.4 : 1 } }
      : { animate: { filter: soft ? `blur(${px}px)` : 'blur(0px)', opacity: soft ? fade : 1 } };
  const SOFT_T = { duration: 0.6, ease: EASE };

  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1, delay, ease: EASE },
  });

  const words = t('title').split(' ');

  return (
    <section
      ref={trackRef}
      data-section="home"
      className={`relative z-0 w-full ${reduce ? 'h-[100svh] min-h-[640px] bg-[#1a1a17]' : 'h-[460svh]'}`}
    >
      <motion.div
        className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden text-[#f4f3ea]"
        style={reduce ? undefined : { backgroundColor: groundColor }}
      >
        {/* The footage, driven by scroll position (never autoplays), inside
            the frame that closes into a card */}
        <motion.div className="absolute inset-0 overflow-hidden" style={reduce ? undefined : { clipPath: clip }}>
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: footageScale }}>
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster="/hero-scroll-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/hero-scroll.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <motion.div className="absolute inset-0 bg-[#1a1a17]/40" style={reduce ? undefined : { opacity: tint }} aria-hidden="true" />
        </motion.div>

        {/* Site photographs drifting in around the card */}
        {!reduce && COLLAGE.map((c, i) => (
          <CollagePhoto key={c.src} src={c.src} cls={c.cls} close={close} i={i} />
        ))}

        <motion.div className="relative h-full flex flex-col px-[16px] md:px-8" style={reduce ? undefined : { opacity: textOpacity, pointerEvents: textEvents }}>
          <div className="flex-1" />

          {/* Hairline across the frame */}
          <motion.div {...enter(0.05)} className="h-px bg-[#f4f3ea]/20" aria-hidden="true" />

          <div className="pt-[68px] max-md:pt-10 grid md:grid-cols-[1fr_464px] gap-x-10 gap-y-8 items-end">
            <div>
              <motion.div {...enter(0.15)}>
                <motion.p {...blur(5, 0.6)} transition={SOFT_T} className="flex items-center gap-[14px] text-[10px] leading-[12px] font-medium tracking-[0.1em] uppercase">
                  <span className="w-[10px] h-[10px] rounded-full bg-accent" aria-hidden="true" />
                  {t('eyebrow')}
                </motion.p>
              </motion.div>
              <motion.h1
                {...blur(10, 0.5)}
                transition={SOFT_T}
                className="mt-10 font-serif font-normal text-[40px] leading-[44px] tracking-[-1.5px] sm:text-[52px] sm:leading-[56px] md:text-[60px] md:leading-[64px] md:tracking-[-2.5px] max-w-[800px] text-balance"
              >
                {words.map((w, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)', y: 12 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: EASE }}
                  >
                    {w}
                    {i < words.length - 1 && ' '}
                  </motion.span>
                ))}
              </motion.h1>
            </div>
            <motion.div {...enter(0.55)}>
              <motion.div {...blur(10, 0.45)} transition={SOFT_T}>
                <p className="text-[16px] leading-[24px] font-medium text-[#f4f3ea]">{t('body')}</p>
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
          </div>

          <div className="flex-[0.84]" />

          {/* Founding note, bottom corner */}
          <motion.div {...enter(0.7)}>
            <motion.p {...blur(5, 0.6)} transition={SOFT_T} className="pb-8 text-[10px] leading-[12px] font-medium tracking-[0.1em] uppercase">
              {t('est')}<br />{t('place')}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CollagePhoto({ src, cls, close, i }: { src: string; cls: string; close: MotionValue<number>; i: number }) {
  const start = 0.25 + i * 0.1;
  const end = Math.min(1, start + 0.45);
  const opacity = useTransform(close, [start, end], [0, 1]);
  const y = useTransform(close, [start, end], [70, 0]);
  const scale = useTransform(close, [start, end], [0.8, 1]);
  return (
    <motion.div
      className={`absolute overflow-hidden rounded-[12px] pointer-events-none ${cls}`}
      style={{ opacity, y, scale }}
      aria-hidden="true"
    >
      <Image src={src} alt="" fill sizes="(min-width: 768px) 14vw, 34vw" className="object-cover" />
    </motion.div>
  );
}
