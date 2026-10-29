'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ITEMS = ['founded', 'rta', 'iso', 'live'] as const;

export default function ProofStrip() {
  const t = useTranslations('ProofStrip');

  return (
    <section className="bg-[#1c1f24] w-full" aria-label={t('ariaLabel')}>
      <div className="max-w-[1400px] mx-auto px-6">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {ITEMS.map((key, idx) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: 'easeOut' }}
              className={`py-8 md:py-10 lg:pe-8 border-white/10 ${idx > 0 ? 'border-t sm:border-t-0' : ''} ${idx % 2 === 1 ? 'sm:ps-8 sm:border-s' : ''} ${idx >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${idx === 2 ? 'lg:ps-8 lg:border-s' : ''}`}
            >
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/45">{t(`${key}Label`)}</span>
              <div className="text-white text-2xl md:text-[1.7rem] font-light tracking-tight mt-3" dir="auto">{t(`${key}Value`)}</div>
              <p className="text-white/55 text-sm leading-relaxed mt-2 max-w-[280px]">{t(`${key}Detail`)}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
