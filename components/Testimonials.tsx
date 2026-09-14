'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('TrackRecord');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  return (
    <section className="bg-background py-24 w-full">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('eyebrow')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight max-w-2xl">
            {t('headline')}
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="bg-muted rounded-sm p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="font-mono text-3xl md:text-4xl text-accent font-light mb-2 whitespace-nowrap">{stat.value}</div>
              <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
