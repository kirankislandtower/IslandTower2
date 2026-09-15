'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';
import { projects, localizeProject, type Locale, type LocalizedProject } from '@/lib/projects';

export default function ProjectDetailContent({ project }: { project: LocalizedProject }) {
  const t = useTranslations('ProjectDetail');
  const locale = useLocale() as Locale;
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { ref: heroImgRef, y: heroImgY } = useParallax(24);

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category.en === project.categoryKey)
    .map((p) => localizeProject(p, locale))
    .slice(0, 2);
  const fallbackRelated =
    related.length > 0
      ? related
      : projects
          .filter((p) => p.slug !== project.slug)
          .map((p) => localizeProject(p, locale))
          .slice(0, 2);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Intro band */}
      <section className="relative min-h-[48vh] w-full flex flex-col justify-end overflow-hidden bg-[#111]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/70 via-[#111]/40 to-[#111]" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-28 pb-12 md:pb-16">
          <Link
            href="/projects"
            className="flex w-fit items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors focus-ring mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {t('allProjects')}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
              {project.title}
            </h1>
            <p className="font-mono text-xs tracking-widest uppercase text-white/60 mt-6">{project.location}</p>
          </motion.div>
        </div>
      </section>

      {/* Story + sticky project spec */}
      <section className="bg-background py-16 md:py-24 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1fr_320px] gap-12 items-start">
          <div className="flex flex-col gap-14 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              ref={heroImgRef}
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                style={{ y: heroImgY, scale: 1.15 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 bg-accent" />
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('scopeOfWork')}</span>
              </div>
              <p className="text-foreground text-base leading-relaxed">{project.scope}</p>
            </motion.div>

            {project.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -100px 0px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 bg-accent" />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('gallery')}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.gallery.map((src, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                      <img src={src} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="order-first lg:order-2 lg:sticky lg:top-28 bg-card border border-border rounded-2xl p-8 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('projectDetails')}</span>
            </div>
            <dl className="flex flex-col gap-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t('category')}</dt>
                <dd className="text-foreground text-end">{project.category}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t('location')}</dt>
                <dd className="text-foreground text-end">{project.location}</dd>
              </div>
              {project.client && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t('client')}</dt>
                  <dd className="text-foreground text-end">{project.client}</dd>
                </div>
              )}
              {project.consultant && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t('consultant')}</dt>
                  <dd className="text-foreground text-end">{project.consultant}</dd>
                </div>
              )}
              {project.contractValue && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t('contractValue')}</dt>
                  <dd className="text-foreground text-end">{project.contractValue}</dd>
                </div>
              )}
            </dl>
            <button
              onClick={() => setShowDemoModal(true)}
              className="mt-2 w-full bg-accent text-on-accent font-mono uppercase tracking-widest text-xs px-6 py-3.5 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
            >
              {t('getQuote')}
            </button>
          </motion.aside>
        </div>
      </section>

      {/* Related Projects */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('moreProjects')}</span>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {fallbackRelated.map((p) => (
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
