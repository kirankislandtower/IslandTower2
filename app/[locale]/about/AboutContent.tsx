'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';

export default function AboutContent() {
  const t = useTranslations('AboutPage');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { ref: storyImgRef, y: storyImgY } = useParallax(28);

  const stats = [
    { value: '15+', label: t('stat1') },
    { value: '200+', label: t('stat2') },
    { value: '2', label: t('stat3') },
    { value: '0', label: t('stat4') },
  ];

  const values = [
    { title: t('value1Title'), description: t('value1Desc') },
    { title: t('value2Title'), description: t('value2Desc') },
    { title: t('value3Title'), description: t('value3Desc') },
    { title: t('value4Title'), description: t('value4Desc') },
  ];

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[85vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2500&auto=format&fit=crop"
          alt="City skyline"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/50 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">{t('eyebrow')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            {t('title')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="bg-card py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('storyEyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight leading-[1.1] mb-6">
              {t('storyHeadline')}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              {t('storyP1')}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t('storyP2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            ref={storyImgRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-muted"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
              alt="Island Tower site team"
              style={{ y: storyImgY, scale: 1.15 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-20 w-full border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="text-center md:text-start"
            >
              <div className="font-mono text-4xl md:text-5xl text-accent font-light mb-2">{stat.value}</div>
              <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('valuesEyebrow')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-foreground font-normal tracking-tight">
              {t('valuesHeadline')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="font-mono text-xs text-accent mb-4">0{idx + 1}</div>
                <h3 className="text-lg text-foreground font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#1c1f24] py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-3xl md:text-5xl text-white font-normal tracking-tight">
            {t('ctaHeadline')}
          </h2>
          <p className="text-white/70 text-base max-w-xl">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setShowDemoModal(true)}
              className="bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
            >
              {t('getQuote')}
            </button>
            <a
              href="/island-tower-company-profile.pdf"
              download
              className="inline-flex items-center gap-2 border border-white/20 text-white font-mono uppercase tracking-widest text-sm px-8 py-4 hover:border-white/40 transition-colors focus-ring"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {t('companyProfile')}
            </a>
          </div>
        </motion.div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
