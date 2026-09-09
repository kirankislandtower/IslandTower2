'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useParallax } from '@/hooks/useParallax';
import { projects as allProjects, localizeProject, type Locale, type LocalizedProject } from '@/lib/projects';

function ProjectCard({ project, idx }: { project: LocalizedProject; idx: number }) {
  const t = useTranslations('Projects');
  const { ref: parallaxRef, y: parallaxY } = useParallax(24);
  const isEven = idx % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '0px 0px -100px 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
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

export default function Projects() {
  const t = useTranslations('Projects');
  const locale = useLocale() as Locale;
  const projects = allProjects.slice(0, 6).map((p) => localizeProject(p, locale));

  return (
    <section className="bg-card py-32 w-full" id="projects">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="flex flex-col items-center text-center mb-20">
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

        <div className="flex flex-col gap-24">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
