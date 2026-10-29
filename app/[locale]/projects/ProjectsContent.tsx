'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { projects as allProjects, localizeProject, type Locale, type LocalizedProject } from '@/lib/projects';

const CATEGORY_KEYS = ['all', 'District Cooling', 'Flushing', 'MEP Engineering', 'Infrastructure'] as const;

const LANDMARK_SLUGS = [
  'abu-dhabi-airport-chilled-water-network',
  'presidential-palace-abu-dhabi-chilled-water',
  'midfield-terminal-abu-dhabi-chilled-water-flushing',
];

function ProjectCard({ project }: { project: LocalizedProject }) {
  const t = useTranslations('ProjectsPage');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link href={`/projects/${project.slug}`} className="group flex flex-col h-full bg-background border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-colors focus-ring">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col gap-3 flex-1">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{project.category}</span>
          <h3 className="text-xl text-foreground font-normal tracking-tight leading-snug group-hover:text-accent transition-colors">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {project.client && (
              <span className="text-xs bg-muted text-foreground/80 rounded-full px-3 py-1">{t('client')}: {project.client}</span>
            )}
            <span className="text-xs bg-muted text-foreground/80 rounded-full px-3 py-1">{project.location}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function LandmarkCard({ project, large = false }: { project: LocalizedProject; large?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex items-end overflow-hidden rounded-2xl focus-ring ${large ? 'min-h-[420px] lg:min-h-[560px]' : 'min-h-[260px]'}`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className={`relative z-10 ${large ? 'p-8 md:p-10' : 'p-6 md:p-7'}`}>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-red-300">{project.category}</span>
        <h3 className={`text-white font-normal tracking-tight leading-tight mt-3 ${large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{project.title}</h3>
        {large && <p className="text-white/80 text-base leading-relaxed mt-4 max-w-xl">{project.description}</p>}
      </div>
    </Link>
  );
}

export default function ProjectsContent() {
  const t = useTranslations('ProjectsPage');
  const locale = useLocale() as Locale;
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_KEYS)[number]>('all');

  const localized = useMemo(() => allProjects.map((p) => localizeProject(p, locale)), [locale]);
  const landmarks = useMemo(
    () => LANDMARK_SLUGS.map((slug) => localized.find((p) => p.slug === slug)).filter((p): p is LocalizedProject => Boolean(p)),
    [localized]
  );

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
      'District Cooling': t('categoryDistrictCooling'),
      Flushing: t('categoryFlushing'),
      'MEP Engineering': t('categoryMep'),
      Infrastructure: t('categoryInfrastructure'),
    };
    return map[key];
  };

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <Image
          src="/images/site/tunnel-piping-run.jpg"
          alt="Island Tower project site"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/50 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full px-6 md:px-10 mt-24"
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
      <section className="bg-card w-full border-b border-border sticky top-24 z-30 backdrop-blur-md bg-card/95">
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

      {/* Landmark projects */}
      {activeCategory === 'all' && landmarks.length === 3 && (
        <section className="bg-background pt-20 md:pt-24 w-full">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('landmarksEyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight leading-[1.1] mb-10">{t('landmarksHeadline')}</h2>
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
              <LandmarkCard project={landmarks[0]} large />
              <div className="grid gap-6">
                <LandmarkCard project={landmarks[1]} />
                <LandmarkCard project={landmarks[2]} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All projects */}
      <section className="bg-background py-20 md:py-24 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered
              .filter((project) => activeCategory !== 'all' || !LANDMARK_SLUGS.includes(project.slug))
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">{t('noProjects')}</p>
          )}
        </div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
