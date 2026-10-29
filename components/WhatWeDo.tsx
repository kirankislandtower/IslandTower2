'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import RevealText from './RevealText';
import { Link } from '@/i18n/navigation';

// The path chilled water takes, plant to building. Order is the real
// sequence of a district cooling job, which is why the stops are numbered.
const STOPS = [
  { key: 'plant', image: '/images/site/rooftop-cooling-equipment.jpg' },
  { key: 'row', image: '/images/projects/shindagha-valve-chamber-formwork.jpg' },
  { key: 'network', image: '/images/site/large-diameter-pipe-install.jpg' },
  { key: 'flushing', image: '/images/projects/saadiyat-flushing-equipment.jpg' },
  { key: 'ets', image: '/images/projects/tecom-mechanical-room.jpg' },
] as const;

export default function WhatWeDo() {
  const t = useTranslations('WhatWeDo');
  const [active, setActive] = useState(2);
  const stop = STOPS[active];
  // Six columns (five stops + the building); line runs to each node's centre.
  const columnPct = (i: number) => `calc(${(i / (STOPS.length + 1)) * 100}% + 12px)`;

  return (
    <section className="bg-background pt-24 md:pt-36 pb-24 md:pb-32 w-full" id="speciality">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-16 items-end mb-16 md:mb-20"
        >
          <RevealText text={t('headline')} className="text-4xl md:text-6xl lg:text-[4.25rem] text-foreground font-light tracking-[-0.03em] leading-[1.02] text-balance" />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md lg:justify-self-end">
            {t('description')}
          </p>
        </motion.div>

        {/* The route */}
        <div className="relative" role="tablist" aria-label={t('routeLabel')}>
          <div className="absolute start-0 top-[11px] h-[3px] bg-border rounded-full" style={{ width: columnPct(STOPS.length) }} aria-hidden="true" />
          <motion.div
            className="absolute start-0 top-[11px] h-[3px] bg-accent rounded-full"
            animate={{ width: columnPct(active) }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          />
          <ol className="relative grid grid-cols-6">
            {STOPS.map((s, i) => {
              const isActive = i === active;
              const passed = i < active;
              return (
                <li key={s.key}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="route-panel"
                    onClick={() => setActive(i)}
                    className="group w-full flex flex-col items-start text-start cursor-pointer focus-ring rounded-md"
                  >
                    <span
                      className={`relative z-10 w-[25px] h-[25px] rounded-full border-[3px] transition-colors duration-300 ${
                        isActive ? 'bg-accent border-accent' : passed ? 'bg-background border-accent' : 'bg-background border-border group-hover:border-foreground/40'
                      }`}
                    />
                    <span className={`font-mono text-[11px] tracking-[0.16em] mt-4 transition-colors ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                      0{i + 1}
                    </span>
                    <span className={`hidden sm:block text-sm md:text-lg tracking-tight mt-1 pe-2 transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {t(`${s.key}Stop`)}
                    </span>
                  </button>
                </li>
              );
            })}
            <li>
              <a href="#mep" className="group w-full flex flex-col items-start text-start focus-ring rounded-md">
                <span className="relative z-10 w-[25px] h-[25px] rounded-[5px] bg-foreground" />
                <span className="font-mono text-[11px] tracking-[0.16em] mt-4 text-muted-foreground">{t('endLabel')}</span>
                <span className="hidden sm:block text-sm md:text-lg tracking-tight mt-1 text-foreground group-hover:text-accent transition-colors">
                  {t('buildingStop')}
                </span>
              </a>
            </li>
          </ol>
        </div>

        {/* Selected stop */}
        <div id="route-panel" role="tabpanel" className="mt-12 md:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={stop.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-14 items-stretch"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={stop.image}
                  alt={t(`${stop.key}Title`)}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-10 py-2">
                <div>
                  <h3 className="text-3xl md:text-4xl text-foreground font-light tracking-[-0.02em] leading-tight">{t(`${stop.key}Title`)}</h3>
                  <p className="text-foreground/80 text-base md:text-lg leading-relaxed mt-5">{t(`${stop.key}Desc`)}</p>
                </div>
                <div className="border-t border-border pt-6">
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground">{t('whereLabel')}</span>
                  <p className="text-foreground text-base mt-2">{t(`${stop.key}Ref`)}</p>
                  <Link
                    href="/services#district-cooling"
                    className="inline-flex items-center gap-2 mt-6 font-mono text-xs tracking-widest uppercase text-foreground hover:text-accent transition-colors focus-ring"
                  >
                    {t('cta')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
