'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
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
const BLUR_ON = 30;

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
    target.current = p;
  });

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
      className={`relative z-0 w-full bg-[#1a1a17] ${reduce ? 'h-[100svh] min-h-[640px]' : 'h-[300svh]'}`}
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden text-[#f4f3ea]">
        {/* Driven by scroll position, never autoplays */}
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
        <div className="absolute inset-0 bg-[#1a1a17]/40" aria-hidden="true" />

        <div className="relative h-full flex flex-col px-[16px] md:px-8">
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
        </div>
      </div>
    </section>
  );
}
