'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects as allProjects, localizeProject, type Locale, type LocalizedProject } from '@/lib/projects';

// Landmark work first, then the strongest district cooling networks.
const FEATURED_SLUGS = [
  'abu-dhabi-airport-chilled-water-network',
  'presidential-palace-abu-dhabi-chilled-water',
  'midfield-terminal-abu-dhabi-chilled-water-flushing',
  'jumeirah-village-triangle-district-cooling-phase-3',
  'al-shindagha-corridor-chilled-water',
  'dubai-beachfront-chilled-water-network',
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectTile({ project, reduceMotion }: { project: LocalizedProject; reduceMotion: boolean }) {
  // Short name: drop the trailing "— Chilled Water …" part the full titles carry
  const name = project.title.split(/\s[—–-]\s/)[0];
  // Client (without any partner list in brackets) and city; skip the client
  // when the project is already named after it, e.g. Abu Dhabi Airport.
  const client = project.client?.replace(/\s*\(.*\)\s*/, '');
  const city = project.location.split(/[,،]/)[0];
  const meta = [client && !name.includes(client) ? client : null, city].filter(Boolean).join(' · ');

  return (
    <Link href={`/projects/${project.slug}`} className="group block focus-ring">
      {/* The photo opens upward as it enters, settling from a slight zoom */}
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative aspect-[16/10] overflow-hidden bg-muted"
      >
        <motion.div
          initial={reduceMotion ? false : { scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
      </motion.div>
      <div className="mt-3 flex items-baseline justify-between gap-6 text-[15px] md:text-base">
        <span className="text-foreground bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] group-hover:bg-[length:100%_1px] transition-[background-size] duration-500">
          {name}
        </span>
        <span className="shrink-0 text-muted-foreground text-end">{meta}</span>
      </div>
    </Link>
  );
}

export default function Projects() {
  const t = useTranslations('Projects');
  const locale = useLocale() as Locale;
  const reduceMotion = !!useReducedMotion();
  const projects = FEATURED_SLUGS.map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => localizeProject(p, locale));

  // Two columns, the second set lower and drifting at its own pace
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: gridRef, offset: ['start end', 'end start'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const progress = useTransform(raw, (v) => v);
  const driftRight = useTransform(progress, [0, 1], [120, -120]);

  return (
    // Slides up over the last screen of the numbers chapter, like a card laid on top
    <section data-section="projects" className="relative z-10 -mt-[100vh] rounded-t-[48px] md:rounded-t-[110px] bg-card py-24 md:py-36 w-full px-[22px] md:px-8" id="projects">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[46px] md:text-[88px] leading-[0.92] font-medium tracking-[-0.01em] text-foreground max-w-[12ch]">
          {t('headline')}
          <sup className="ms-2 align-super text-[20px] md:text-[32px] font-normal tracking-normal text-muted-foreground">({allProjects.length})</sup>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm">{t('description')}</p>
      </div>

      <div ref={gridRef} className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-x-[8vw] gap-y-16">
        <div className="flex flex-col gap-16 md:gap-28">
          {left.map((p) => (
            <ProjectTile key={p.slug} project={p} reduceMotion={reduceMotion} />
          ))}
        </div>
        <motion.div
          className="flex flex-col gap-16 md:gap-28 lg:pt-[22vw]"
          style={reduceMotion ? undefined : { y: driftRight }}
        >
          {right.map((p) => (
            <ProjectTile key={p.slug} project={p} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </div>

      <div className="mt-20 md:mt-28 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 h-12 px-7 rounded-full bg-[#1c1f24] text-white text-[15px] font-medium hover:bg-accent active:scale-[0.98] transition-[background-color,transform] duration-200 focus-ring"
        >
          {t('viewAll')}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
