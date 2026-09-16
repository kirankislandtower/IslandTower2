'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CareersTeaser() {
  const t = useTranslations('CareersTeaser');

  return (
    <section className="relative min-h-[60vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
      <img
        src="/images/site/pump-room-team.jpg"
        alt="Island Tower site team"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111]/70 via-[#111]/60 to-[#111]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 md:py-32 flex flex-col items-start"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">{t('eyebrow')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1] max-w-3xl">
          {t('headline')}
        </h2>
        <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mt-6">
          {t('subtitle')}
        </p>
        <Link
          href="/careers"
          className="mt-8 inline-flex items-center gap-2 bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
        >
          {t('cta')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
