'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import RevealText from './RevealText';
import { Link } from '@/i18n/navigation';

const ITEMS = ['item1', 'item2', 'item3', 'item4', 'item5'] as const;

export default function Solutions() {
  const t = useTranslations('Solutions');

  return (
    <section className="bg-card py-24 md:py-32 w-full scroll-mt-24" id="mep">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-16 items-end mb-14"
        >
          <RevealText text={t('headline')} className="text-4xl md:text-6xl text-foreground font-light tracking-[-0.03em] leading-[1.04] text-balance" />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md lg:justify-self-end">{t('description')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/images/site/fire-piping-plant-room.jpg"
              alt={t('imageAlt')}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <ul className="border-t border-foreground/80">
              {ITEMS.map((key, idx) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                  className="grid sm:grid-cols-[1fr_auto] gap-1 sm:gap-8 py-6 border-b border-border"
                >
                  <span className="text-foreground text-xl md:text-2xl tracking-tight">{t(key)}</span>
                  <span className="text-muted-foreground text-sm sm:text-end sm:pt-2">{t(`${key}Ref`)}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/services#mep"
              className="inline-flex items-center gap-2 mt-10 font-mono text-xs tracking-widest uppercase text-foreground hover:text-accent transition-colors focus-ring"
            >
              {t('cta')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
