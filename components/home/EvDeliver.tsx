'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GUTTER, SERIF, EASE, Label, Pill, Rise } from './ui';

// What we deliver: an accordion of the four things we build, with the
// photograph for the open one on the right, and a frosted card of our real
// numbers laid over it.
const ITEMS = [
  { k: 'i1', img: '/images/site/large-diameter-pipe-install.jpg' },
  { k: 'i2', img: '/images/projects/saadiyat-flushing-equipment.jpg' },
  { k: 'i3', img: '/images/projects/tecom-mechanical-room.jpg' },
  { k: 'i4', img: '/images/projects/pump-replacement-plant-room.jpg' },
] as const;

export default function EvDeliver() {
  const t = useTranslations('Home2.deliver');
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);
  const item = ITEMS[open];

  return (
    <section data-section="deliver" className={`bg-[#f4f3ea] text-[#1a1a17] ${GUTTER} pb-24 md:pb-36`}>
      <div className="border-t border-[#1a1a17]/12 pt-5 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-stretch">
        <div className="flex flex-col justify-between gap-12">
        <div>
          <Rise><Label>{t('label')}</Label></Rise>
          <Rise delay={0.06}><h2 className={`${SERIF} mt-6 text-[32px] md:text-[40px] leading-[1.15] max-w-[14ch]`}>{t('title')}</h2></Rise>
          <Rise delay={0.12} className="mt-7"><Pill href="/projects">{t('cta')}</Pill></Rise>
        </div>
        {/* Accordion */}
        <ul>
          {ITEMS.map((it, i) => {
            const isOpen = i === open;
            return (
              <li key={it.k} className="border-t border-[#1a1a17]/12">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className={`w-full text-start py-4 text-[16px] font-bold cursor-pointer transition-colors focus-ring ${isOpen ? 'text-[#1a1a17]' : 'text-[#1a1a17]/45 hover:text-[#1a1a17]/80'}`}
                >
                  {t(`${it.k}Title`)}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[15px] md:text-[16px] leading-[1.6] font-medium text-[#1a1a17]/80 max-w-[44ch]">{t(`${it.k}Text`)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
        </div>

        {/* Photograph with the numbers card */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[640px] overflow-hidden rounded-[10px] bg-[#1a1a17]">
          <AnimatePresence initial={false}>
            <motion.div
              key={item.img}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <Image src={item.img} alt={t(`${item.k}Title`)} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/15" aria-hidden="true" />

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-auto sm:end-8 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-[320px] rounded-[12px] bg-white/25 backdrop-blur-xl border border-white/30 p-5 text-white">
            <p className="text-[15px] font-medium">{t('cardTitle')}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {(['1', '2', '3', '4'] as const).map((n) => (
                <li key={n} className="flex items-center justify-between gap-4 h-9 px-3 rounded-[6px] bg-black/30">
                  <span className="text-[13px] text-white/90">{t(`n${n}`)}</span>
                  <span className="text-[13px] font-semibold tabular-nums text-white" dir="ltr">{t(`v${n}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
