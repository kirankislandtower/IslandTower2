'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { projects, localizeProject, type Locale as ProjectLocale } from '@/lib/projects';
import type { LocalizedIndustry } from '@/lib/industries';

export default function IndustryDetailContent({ industry }: { industry: LocalizedIndustry }) {
  const t = useTranslations('IndustryDetail');
  const locale = useLocale() as ProjectLocale;
  const [showDemoModal, setShowDemoModal] = useState(false);

  const relatedProjects = industry.relatedProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => localizeProject(p, locale));

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-end overflow-hidden bg-[#111]">
        <img
          src={industry.image}
          alt={industry.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/60 via-[#111]/40 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-20 pb-16"
        >
          <Link
            href="/#industries"
            className="flex w-fit items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors focus-ring mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {t('allIndustries')}
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            {industry.title}
          </h1>
        </motion.div>
      </section>

      {/* Overview / Capabilities */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('overview')}</span>
            </div>
            <p className="text-foreground text-base leading-relaxed">{industry.overview}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('capabilities')}</span>
            </div>
            <ul className="flex flex-col gap-4">
              {industry.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {capability}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-card py-24 md:py-32 w-full border-t border-border">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('relatedProjects')}</span>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg focus-ring"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 start-0 end-0 p-6">
                    <span className="font-mono text-xs tracking-widest uppercase text-white/70">{p.category}</span>
                    <h3 className="text-xl text-white font-medium mt-1">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
          <button
            onClick={() => setShowDemoModal(true)}
            className="bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
          >
            {t('getQuote')}
          </button>
        </motion.div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
