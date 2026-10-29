'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import RevealText from './RevealText';
import { Link } from '@/i18n/navigation';

// Only sectors with real projects behind them are featured on Home.
const featuredSectors = [
  { key: 'i1', slug: 'infrastructure', ref: 'refInfrastructure' },
  { key: 'i4', slug: 'commercial', ref: 'refCommercial' },
  { key: 'i5', slug: 'residential', ref: 'refResidential' },
  { key: 'i7', slug: 'aviation', ref: 'refAviation' },
  { key: 'i6', slug: 'industrial', ref: 'refIndustrial' },
] as const;

export default function Industries() {
  const t = useTranslations('Industries');

  return (
    <section id="industries" className="bg-background py-24 md:py-32 w-full scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-16 items-end mb-12"
        >
          <RevealText text={t('headline')} className="text-4xl md:text-6xl text-foreground font-light tracking-[-0.03em] leading-[1.04] text-balance" />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md lg:justify-self-end">{t('description')}</p>
        </motion.div>

        <ul className="border-t border-foreground/80">
          {featuredSectors.map((sector) => (
            <li key={sector.slug}>
              <Link
                href={`/industries/${sector.slug}`}
                className="group grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] items-center gap-4 md:gap-10 py-6 md:py-7 border-b border-border focus-ring"
              >
                <span className="text-2xl md:text-4xl text-foreground font-light tracking-[-0.02em] group-hover:text-accent transition-colors">{t(sector.key)}</span>
                <span className="hidden md:block text-muted-foreground text-sm md:text-base">{t(sector.ref)}</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
