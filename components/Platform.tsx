'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import RevealText from './RevealText';
import { Link } from '@/i18n/navigation';

export default function Platform() {
  const t = useTranslations('Platform');

  const rows = [
    { code: 'ISO 9001:2015', scope: t('iso9001'), status: t('validTo') },
    { code: 'ISO 14001:2015', scope: t('iso14001'), status: t('validTo') },
    { code: 'ISO 45001:2018', scope: t('iso45001'), status: t('validTo') },
    { code: t('rtaCode'), scope: t('rtaScope'), status: t('rtaStatus') },
  ];

  return (
    <section data-section="quality" className="bg-[#1c1f24] text-white py-24 md:py-32 w-full" id="quality">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1fr_1.25fr] gap-14 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col justify-between gap-10"
        >
          <RevealText text={t('headline')} className="text-4xl md:text-5xl font-light tracking-[-0.01em] leading-[1.06] text-balance" />
          <div>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-md">{t('hseText')}</p>
            <Link
              href="/about#quality"
              className="inline-flex items-center gap-2 mt-8 font-mono text-xs tracking-widest uppercase text-white hover:text-accent transition-colors focus-ring"
            >
              {t('learnMore')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </motion.div>

        <div>
          <div className="hidden md:grid grid-cols-[1.1fr_1.2fr_auto] gap-6 pb-4 border-b border-white/25 font-mono text-[11px] tracking-[0.16em] uppercase text-white/45">
            <span>{t('colCertificate')}</span>
            <span>{t('colScope')}</span>
            <span>{t('colStatus')}</span>
          </div>
          <ul>
            {rows.map((row, idx) => (
              <motion.li
                key={row.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: 'easeOut' }}
                className="grid md:grid-cols-[1.1fr_1.2fr_auto] gap-1 md:gap-6 py-6 border-b border-white/10 items-baseline"
              >
                <span className="text-xl md:text-2xl tracking-tight" dir="auto">{row.code}</span>
                <span className="text-white/65 text-sm md:text-base">{row.scope}</span>
                <span className="text-white/45 text-sm md:text-end whitespace-nowrap">{row.status}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
