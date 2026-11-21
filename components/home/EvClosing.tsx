'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUTTER, SERIF, Label, Pill, Rise } from './ui';

// The close: one full-bleed site photograph carrying the last question and
// the two actions, with the footer laid over its lower half as a card.
export default function EvClosing({ onQuote }: { onQuote: () => void }) {
  const t = useTranslations('Home2.closing');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const p = useTransform(raw, (v) => v);
  const bgY = useTransform(p, [0, 1], ['-10%', reduce ? '-10%' : '0%']);
  const LINK = 'w-fit hover:text-accent transition-colors focus-ring';

  return (
    <section ref={ref} data-section="contact" className="relative overflow-hidden bg-[#1a1a17] text-[#f4f3ea]">
      <motion.div className="absolute inset-[-12%_0_0_0]" style={{ y: bgY }} aria-hidden="true">
        <Image src="/images/site/rooftop-cooling-equipment.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className={`relative ${GUTTER} pt-28 md:pt-40`}>
        <Rise><Label light>{t('label')}</Label></Rise>
        <Rise delay={0.06}><h2 className={`${SERIF} mt-6 text-[34px] md:text-[48px] leading-[1.12] max-w-[18ch]`}>{t('title')}</h2></Rise>
        <Rise delay={0.12} className="mt-7 flex flex-wrap gap-2.5">
          <Pill onClick={onQuote} variant="accent">{t('primary')}</Pill>
          <Pill href="/contact" variant="ghost-light">{t('secondary')}</Pill>
        </Rise>

        {/* Footer card */}
        <footer className="mt-28 md:mt-40 mb-3 md:mb-4 rounded-[14px] bg-[#f4f3ea]/95 backdrop-blur-md text-[#1a1a17] p-6 md:p-8">
          <div className="grid lg:grid-cols-[1.2fr_2fr] gap-10">
            <div>
              <Image src="/images/logo/island-tower-logo-dark.png" alt="Island Tower" width={267} height={39} className="h-[20px] w-auto" />
              <p className="mt-6 text-[14px] leading-[1.6] font-medium text-[#1a1a17]/75 max-w-[44ch]">{t('blurb')}</p>
              <p className="mt-5 text-[14px] font-medium text-[#1a1a17]/75">{t('address')}</p>
              <p className="mt-1 text-[14px] font-medium" dir="ltr"><a href="tel:+97142573677" className={LINK}>+971 4 257 3677</a></p>
              <p className="mt-1 text-[14px] font-medium"><a href="mailto:info@islandtoweruae.ae" className={LINK}>info@islandtoweruae.ae</a></p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[15px] font-medium">
              <div className="flex flex-col gap-2.5">
                <span className="mb-1 text-[12px] tracking-[0.06em] uppercase text-[#1a1a17]/60 font-normal">{t('colMain')}</span>
                <Link href="/" className={LINK}>{t('home')}</Link>
                <Link href="/about" className={LINK}>{t('about')}</Link>
                <Link href="/projects" className={LINK}>{t('projects')}</Link>
                <Link href="/contact" className={LINK}>{t('contact')}</Link>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="mb-1 text-[12px] tracking-[0.06em] uppercase text-[#1a1a17]/60 font-normal">{t('colServices')}</span>
                <Link href="/services#district-cooling" className={LINK}>{t('svc1')}</Link>
                <Link href="/services#district-cooling" className={LINK}>{t('svc2')}</Link>
                <Link href="/services#district-cooling" className={LINK}>{t('svc3')}</Link>
                <Link href="/services#mep" className={LINK}>{t('svc4')}</Link>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="mb-1 text-[12px] tracking-[0.06em] uppercase text-[#1a1a17]/60 font-normal">{t('colMore')}</span>
                <Link href="/careers" className={LINK}>{t('careers')}</Link>
                <Link href="/news" className={LINK}>{t('insights')}</Link>
                <Link href="/about#quality" className={LINK}>{t('quality')}</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-5 border-t border-[#1a1a17]/12 flex flex-wrap items-center justify-between gap-4 text-[12px] font-medium text-[#1a1a17]/60">
            <span>© {new Date().getFullYear()} Island Tower Electromechanical Works LLC</span>
            <a href="https://www.linkedin.com/company/island-tower-electromech/posts/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#1a1a17]/70 hover:text-accent transition-colors focus-ring">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
