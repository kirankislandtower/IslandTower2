'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects as allProjects, localizeProject, type Locale, type LocalizedProject } from '@/lib/projects';

function ProjectCard({ project, idx }: { project: LocalizedProject; idx: number }) {
  const t = useTranslations('Projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
      className="snap-start shrink-0 w-[300px] md:w-[380px]"
    >
      <Link href={`/projects/${project.slug}`} className="group block focus-ring rounded-2xl">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-5">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-5 start-5 font-mono text-white text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            0{idx + 1}
          </span>
        </div>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{project.category}</span>
        <h3 className="text-xl md:text-2xl text-foreground font-normal tracking-tight mt-2 mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
          {project.location}
        </p>
        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground group-hover:text-accent transition-colors">
          {t('viewCaseStudy')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const t = useTranslations('Projects');
  const locale = useLocale() as Locale;
  const isRtl = locale === 'ar';
  const projects = allProjects.slice(0, 6).map((p) => localizeProject(p, locale));
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (forward: boolean) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = (card?.offsetWidth ?? 380) + 32;
    const sign = forward ? 1 : -1;
    const rtlAdjusted = isRtl ? -sign : sign;
    el.scrollBy({ left: rtlAdjusted * amount, behavior: 'smooth' });
  };

  return (
    <section className="bg-card py-32 w-full" id="projects">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="flex justify-between items-end mb-16 gap-6 flex-wrap">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('eyebrow')}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-5xl md:text-7xl text-foreground font-normal tracking-tight mb-6"
            >
              {t('headline')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed"
            >
              {t('description')}
            </motion.p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scrollByCard(false)}
              aria-label={t('previous')}
              className="p-3 border border-border hover:border-accent transition-colors bg-background cursor-pointer focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollByCard(true)}
              aria-label={t('next')}
              className="p-3 border border-border hover:border-accent transition-colors bg-background cursor-pointer focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, idx) => (
            <div key={project.slug} data-card>
              <ProjectCard project={project} idx={idx} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
