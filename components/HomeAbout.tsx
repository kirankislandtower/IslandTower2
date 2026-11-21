'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// About, told as a short film: the section pins for a few screens while the
// company's story plays out over full-screen photographs of its own sites,
// one beat per milestone, with the years ticking along the bottom.

const BEATS = [
  { key: 'b1', photo: '/images/projects/chilled-water-flushing-works.jpg' },
  { key: 'b2', photo: '/images/site/rooftop-cooling-equipment.jpg' },
  { key: 'b3', photo: '/images/projects/weld-inspection-tecom.jpg' },
  { key: 'b4', photo: '/images/projects/jvt-tank-installation.jpg' },
  { key: 'b5', photo: '/images/projects/hse-safety-briefing-difc.jpg' },
] as const;

const LABEL = 'font-mono text-[14px] leading-[1.25] tracking-[0.09em] uppercase';
const EASE = [0.22, 1, 0.36, 1] as const;
const CURTAIN = [0.76, 0, 0.24, 1] as const;

export default function HomeAbout() {
  const t = useTranslations('HomeAbout');
  const reduceMotion = !!useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);

  const { scrollYProgress: raw } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  // Function pass-through keeps framer-motion computing scroll-linked values
  // itself; its native ScrollTimeline path mistimes them.
  const progress = useTransform(raw, (v) => v);

  // Opening shot: the picture starts as a framed print and opens out to the
  // full screen as the section takes over.
  const { scrollYProgress: rawEnter } = useScroll({ target: pinRef, offset: ['start end', 'start start'] });
  const enter = useTransform(rawEnter, (v) => v);
  const frameClip = useTransform(enter, [0.35, 1], ['inset(7% 5% 7% 5% round 18px)', 'inset(0% 0% 0% 0% round 0px)']);

  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.min(BEATS.length - 1, Math.max(0, Math.floor(v * BEATS.length)));
    if (next !== beat) setBeat(next);
  });

  const current = BEATS[beat];
  const last = beat === BEATS.length - 1;

  return (
    <section data-section="about" aria-labelledby="home-about-heading" className="relative bg-background">
      <h2 id="home-about-heading" className="sr-only">{t('heading')}</h2>
      <div ref={pinRef} className="relative" style={{ height: `${BEATS.length * 85 + 15}vh` }}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 overflow-hidden bg-[#111] text-white"
            style={reduceMotion ? undefined : { clipPath: frameClip }}
          >
            {/* Photographs: each new one rises over the last like a curtain,
                then drifts slowly while it is on screen */}
            {BEATS.map((b, i) => {
              const active = i === beat;
              return (
                <motion.div
                  key={b.key}
                  className="absolute inset-0 overflow-hidden"
                  style={{ zIndex: active ? 2 : 1 }}
                  initial={false}
                  animate={{ clipPath: active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
                  transition={active ? { duration: reduceMotion ? 0 : 1.1, ease: CURTAIN } : { duration: 0, delay: reduceMotion ? 0 : 1.1 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ scale: active && !reduceMotion ? 1.08 : 1 }}
                    transition={active ? { duration: 9, ease: 'linear' } : { duration: 0, delay: 1.1 }}
                  >
                    <Image src={b.photo} alt="" fill sizes="100vw" className="object-cover" priority={i === 0} />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Scrim so the story always reads, darkest where the text sits */}
            <div className="absolute inset-0 z-[3] bg-black/40" aria-hidden="true" />
            <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/85 via-black/20 to-black/45" aria-hidden="true" />

            <div className="relative z-[4] h-full flex flex-col px-[22px] md:px-8 pt-24 md:pt-28 pb-6 md:pb-8">
              <div className="grid grid-cols-12 gap-x-6">
                <span className={`col-span-6 ${LABEL}`}>{t('label')}</span>
                <span className="col-span-6 lg:col-span-3 lg:col-start-10 relative h-[36px] overflow-hidden text-end lg:text-start" aria-live="polite">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={current.key}
                      initial={reduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className={`block ${LABEL} text-white/70`}
                    >
                      {t(`${current.key}Photo`)}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>

              {/* The story beat */}
              <div className="flex-1 flex items-end pb-10 md:pb-16">
                <div className="w-full grid grid-cols-12 gap-x-6 gap-y-6 items-end">
                  {/* The year rolls over like a counter */}
                  <div className="col-span-12 lg:col-span-4 relative overflow-hidden h-[76px] md:h-[128px]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={current.key}
                        initial={reduceMotion ? { opacity: 0 } : { y: '105%' }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { y: '-105%' }}
                        transition={{ duration: 0.75, ease: CURTAIN }}
                        className="absolute inset-x-0 bottom-[0.16em] text-[72px] md:text-[120px] leading-[0.85] font-medium tracking-[-0.01em] tabular-nums"
                      >
                        {t(`${current.key}Year`)}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="col-span-12 lg:col-span-8 lg:col-start-5 min-h-[7.5rem] md:min-h-[10rem] flex flex-col justify-end">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div key={current.key} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                        <Words text={t(`${current.key}Text`)} reduceMotion={reduceMotion} />
                        {last && (
                          <motion.div
                            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                          >
                            <Link
                              href="/about"
                              className="group mt-8 inline-flex items-center gap-3 h-12 px-6 bg-white text-[#111] text-[15px] font-medium hover:bg-accent hover:text-white active:scale-[0.98] transition-[background-color,color,transform] duration-200 focus-ring"
                            >
                              {t('cta')}
                              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true">→</span>
                            </Link>
                          </motion.div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* The years, filling as the story moves on */}
              <div className="relative" aria-hidden="true">
                <div className="absolute top-0 inset-x-0 h-px bg-white/30" />
                <motion.div className="absolute top-0 inset-x-0 h-[2px] -mt-px bg-accent origin-left rtl:origin-right" style={{ scaleX: progress }} />
                <ol className="grid grid-cols-5 pt-3">
                  {BEATS.map((b, i) => (
                    <li key={b.key} className="relative">
                      <span
                        className={`absolute -top-[17px] start-0 w-2.5 h-2.5 rounded-full transition-[background-color,transform] duration-300 ${
                          i <= beat ? 'bg-accent scale-100' : 'bg-white/40 scale-75'
                        }`}
                      />
                      <span className={`${LABEL} transition-colors duration-300 ${i <= beat ? 'text-white' : 'text-white/40'}`}>
                        {t(`${b.key}Year`)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Without scrolling (screen readers, no script) the whole story is here */}
      <ol className="sr-only">
        {BEATS.map((b) => (
          <li key={b.key}>{t(`${b.key}Year`)}: {t(`${b.key}Text`)}</li>
        ))}
      </ol>
    </section>
  );
}

// The story line rises in word by word, each word from behind its own mask.
function Words({ text, reduceMotion }: { text: string; reduceMotion: boolean }) {
  const words = text.split(' ');
  return (
    <p className="text-[30px] md:text-[52px] leading-[1.08] font-medium tracking-[-0.015em] max-w-[22ch]">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={reduceMotion ? { opacity: 0 } : { y: '110%' }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.035, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </p>
  );
}
