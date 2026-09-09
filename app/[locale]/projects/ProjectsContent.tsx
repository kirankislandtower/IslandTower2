'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';
import { projects as allProjects, localizeProject, type Locale, type LocalizedProject } from '@/lib/projects';

const CATEGORY_KEYS = ['all', 'MEP Engineering', 'Infrastructure', 'Civil Works', 'Water Treatment', 'Energy Solutions', 'Chemical Facilities'] as const;

function ProjectCard({ project, idx }: { project: LocalizedProject; idx: number }) {
  const t = useTranslations('ProjectsPage');
  const { ref: parallaxRef, y: parallaxY } = useParallax(24);
  const isEven = idx % 2 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      viewport={{ once: false, margin: '0px 0px -100px 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
    >
      <div
        ref={parallaxRef}
        className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: parallaxY, scale: 1.15 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-5 start-5 font-mono text-white text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
          0{idx + 1}
        </span>
      </div>

      <div className={isEven ? 'md:order-2' : 'md:order-1'}>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{project.category}</span>
        <h3 className="text-3xl md:text-4xl text-foreground font-normal tracking-tight mt-3 mb-3">
          {project.title}
        </h3>
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-5">
          {project.location}
        </p>
        <p className="text-muted-foreground text-base leading-relaxed max-w-md mb-6">
          {project.description}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground hover:text-accent transition-colors focus-ring"
        >
          {t('viewCaseStudy')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProjectsContent() {
  const t = useTranslations('ProjectsPage');
  const locale = useLocale() as Locale;
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_KEYS)[number]>('all');

  const localized = useMemo(() => allProjects.map((p) => localizeProject(p, locale)), [locale]);

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? localized
        : allProjects
            .filter((p) => p.category.en === activeCategory)
            .map((p) => localizeProject(p, locale)),
    [activeCategory, localized, locale]
  );

  const categoryLabel = (key: (typeof CATEGORY_KEYS)[number]) => {
    const map: Record<(typeof CATEGORY_KEYS)[number], string> = {
      all: t('categoryAll'),
      'MEP Engineering': t('categoryMep'),
      Infrastructure: t('categoryInfrastructure'),
      'Civil Works': t('categoryCivil'),
      'Water Treatment': t('categoryWater'),
      'Energy Solutions': t('categoryEnergy'),
      'Chemical Facilities': t('categoryChemical'),
    };
    return map[key];
  };

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2500&auto=format&fit=crop"
          alt="Island Tower project site"
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

      {/* Filter Bar */}
      <section className="bg-card w-full border-b border-border sticky top-0 z-30 backdrop-blur-md bg-card/95">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex gap-3 overflow-x-auto no-scrollbar">
          {CATEGORY_KEYS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 font-mono text-xs tracking-widest uppercase px-4 py-2.5 rounded-full border transition-colors cursor-pointer focus-ring ${
                activeCategory === cat
                  ? 'bg-accent text-on-accent border-accent'
                  : 'bg-transparent text-muted-foreground border-border hover:border-accent hover:text-foreground'
              }`}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>
      </section>

      {/* Projects List */}
      <section className="bg-card py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col gap-24">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} idx={idx} />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-12">{t('noProjects')}</p>
            )}
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
