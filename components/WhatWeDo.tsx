'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// The path chilled water takes, plant to building, as a carousel: the
// current stop large in the centre, its neighbours smaller and lower at the
// sides, arrows and swipe to move along the route.
const STOPS = [
  { key: 'plant', image: '/images/site/rooftop-cooling-equipment.jpg' },
  { key: 'row', image: '/images/projects/shindagha-valve-chamber-formwork.jpg' },
  { key: 'network', image: '/images/site/large-diameter-pipe-install.jpg' },
  { key: 'flushing', image: '/images/projects/saadiyat-flushing-equipment.jpg' },
  { key: 'ets', image: '/images/projects/tecom-mechanical-room.jpg' },
] as const;

const EASE = [0.65, 0, 0.35, 1] as const;
const SIDE_SCALE = 0.42;

export default function WhatWeDo() {
  const t = useTranslations('WhatWeDo');
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = STOPS.length;

  // Slide width in vw: wide on desktop, nearly full width on phones
  const [w, setW] = useState(58);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setW(mq.matches ? 58 : 84);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const go = (d: number) => setActive((a) => (a + d + n) % n);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  // Shortest signed distance from the active slide, so neighbours are always
  // on both sides
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };
  const sideX = w / 2 + 2 + (w * SIDE_SCALE) / 2;
  const sideY = w * 0.625 * 0.3;
  const stop = STOPS[active];

  return (
    <section data-section="route" className="bg-background pt-24 md:pt-36 pb-24 md:pb-32 w-full overflow-hidden" id="speciality">
      {/* Title, centred */}
      <div className="px-[22px] md:px-8 text-center">
        <motion.h2
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[32px] md:text-[52px] leading-[1.02] font-medium tracking-[-0.01em] text-foreground"
        >
          {t('headline')}
        </motion.h2>
        <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">{t('description')}</p>

        {/* The route, as a row of stops; the current one in red */}
        <ol className="mt-10 flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[13px] md:text-[14px]" aria-label={t('routeLabel')}>
          {STOPS.map((s, i) => (
            <li key={s.key} className="flex items-center gap-3">
              <button
                onClick={() => setActive(i)}
                aria-current={i === active ? 'step' : undefined}
                className={`cursor-pointer transition-colors focus-ring ${i === active ? 'text-accent font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t(`${s.key}Stop`)}
              </button>
              <span className="text-foreground/25" aria-hidden="true">→</span>
            </li>
          ))}
          <li>
            <a href="#mep" className="text-foreground hover:text-accent transition-colors focus-ring">{t('buildingStop')}</a>
          </li>
        </ol>
      </div>

      {/* Carousel */}
      <div className="relative mt-12 md:mt-16" dir="ltr">
        <div className="relative mx-auto" style={{ height: `${w * 0.625}vw` }}>
          {STOPS.map((s, i) => {
            const d = offsetOf(i);
            const isCenter = d === 0;
            const hidden = Math.abs(d) > 1;
            return (
              <motion.div
                key={s.key}
                className="absolute top-0 left-1/2 aspect-[16/10] overflow-hidden rounded-[10px] bg-muted origin-top"
                style={{ width: `${w}vw`, marginLeft: `${-w / 2}vw`, zIndex: isCenter ? 3 : hidden ? 1 : 2 }}
                initial={false}
                animate={{
                  x: `${d * (isCenter ? 0 : hidden ? sideX * 1.6 : sideX)}vw`,
                  y: isCenter ? '0vw' : `${sideY}vw`,
                  scale: isCenter ? 1 : SIDE_SCALE,
                  opacity: hidden ? 0 : 1,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={isCenter ? onDragEnd : undefined}
                onClick={!isCenter && !hidden ? () => setActive(i) : undefined}
                aria-hidden={!isCenter}
              >
                <Image
                  src={s.image}
                  alt={isCenter ? t(`${s.key}Title`) : ''}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 58vw, 84vw"
                  className={`object-cover pointer-events-none ${isCenter ? '' : 'cursor-pointer'}`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Arrows, at the height of the side slides */}
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={() => go(d)}
            aria-label={d < 0 ? t('prev') : t('next')}
            className={`absolute z-10 ${d < 0 ? 'left-2 md:left-6' : 'right-2 md:right-6'} w-11 h-11 md:w-14 md:h-14 flex items-center justify-center text-white mix-blend-difference hover:scale-110 transition-transform cursor-pointer focus-ring`}
            style={{ top: `${sideY + w * 0.625 * SIDE_SCALE * 0.5}vw`, transform: 'translateY(-50%)' }}
          >
            <svg width="28" height="56" viewBox="0 0 28 56" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <polyline points={d < 0 ? '22 4 6 28 22 52' : '6 4 22 28 6 52'} />
            </svg>
          </button>
        ))}

        {/* Caption for the centre slide */}
        <div className="mx-auto mt-6 md:mt-8 px-1" style={{ width: `${w}vw` }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stop.key}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid md:grid-cols-[1.4fr_1fr] gap-x-10 gap-y-5"
              dir="auto"
            >
              <div>
                <span className="text-[13px] text-accent font-medium tabular-nums">
                  {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {t(`${stop.key}Stop`)}
                </span>
                <h3 className="mt-2 text-[24px] md:text-[30px] leading-tight tracking-[-0.01em] text-foreground">{t(`${stop.key}Title`)}</h3>
                <p className="mt-3 text-[15px] md:text-base leading-relaxed text-foreground/75">{t(`${stop.key}Desc`)}</p>
              </div>
              <div className="md:text-end">
                <span className="text-[13px] text-muted-foreground">{t('whereLabel')}</span>
                <p className="mt-1 text-[15px] md:text-base text-foreground">{t(`${stop.key}Ref`)}</p>
                <Link
                  href="/services#district-cooling"
                  className="group inline-flex items-center gap-2 mt-4 text-[15px] text-foreground border-b border-foreground/40 pb-0.5 hover:text-accent hover:border-accent transition-colors focus-ring"
                >
                  {t('cta')}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
