'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GUTTER, SERIF, Label, Pill, Rise } from './ui';

// How we work: a tall site photograph on the left, the idea on the right,
// and two proof points pinned to the bottom of the column.
export default function EvApproach() {
  const t = useTranslations('Home2.approach');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const p = useTransform(raw, (v) => v);
  const imgY = useTransform(p, [0, 1], ['-6%', reduce ? '-6%' : '6%']);

  return (
    <section data-section="approach" className={`bg-[#f4f3ea] text-[#1a1a17] ${GUTTER} pb-24 md:pb-36`}>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        <div ref={ref} className="relative aspect-[5/6] lg:aspect-auto lg:min-h-[640px] overflow-hidden rounded-[10px] bg-[#e7e5da]">
          <motion.div className="absolute inset-[-7%_0]" style={{ y: imgY }}>
            <Image src="/images/site/underground-pipe-trench.jpg" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </motion.div>
          <span className="absolute bottom-4 start-4 px-2.5 py-1.5 rounded-[6px] bg-black/35 backdrop-blur-sm text-[10px] font-medium tracking-[0.08em] uppercase text-[#f4f3ea]">
            {t('tag')}
          </span>
        </div>

        <div className="flex flex-col justify-between gap-14 lg:py-2">
          <div className="border-t border-[#1a1a17]/12 pt-5">
            <Rise><Label>{t('label')}</Label></Rise>
            <Rise delay={0.06}>
              <h2 className={`${SERIF} mt-6 text-[32px] md:text-[40px] leading-[1.15] max-w-[16ch]`}>{t('title')}</h2>
            </Rise>
            <Rise delay={0.12}>
              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.6] font-medium text-[#1a1a17]/85 max-w-[46ch]">{t('body')}</p>
              <div className="mt-7"><Pill href="/services">{t('cta')}</Pill></div>
            </Rise>
          </div>

          <ul className="flex flex-col gap-5">
            {(['f1', 'f2'] as const).map((f, i) => (
              <li key={f}>
                <Rise delay={0.1 + i * 0.08} className="flex gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-[8px] bg-accent/10 text-accent flex items-center justify-center" aria-hidden="true">
                    {i === 0 ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4v5c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V7l8-4z" /><path d="M9 12l2 2 4-4" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6" /><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" /></svg>
                    )}
                  </span>
                  <div>
                    <p className="text-[16px] font-bold">{t(`${f}Title`)}</p>
                    <p className="mt-1 text-[15px] font-medium text-[#1a1a17]/75">{t(`${f}Text`)}</p>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
