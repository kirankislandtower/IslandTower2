'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useParallax } from '@/hooks/useParallax';
import { articles, localizeArticle, type Locale } from '@/lib/news';

const AUTO_ROTATE_MS = 6000;

function formatDate(dateStr: string, locale: Locale) {
  return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function InsightsPreview() {
  const t = useTranslations('InsightsPreview');
  const locale = useLocale() as Locale;
  const featured = articles.slice(0, 5).map((a) => localizeArticle(a, locale));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { ref: parallaxRef, y: parallaxY } = useParallax(25);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === featured.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  };

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === featured.length - 1 ? 0 : prev + 1));
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [featured.length]);

  const current = featured[currentIndex];

  return (
    <section className="bg-background py-24 w-full">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header and Controls */}
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('eyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight mb-3">
              {t('headline')}
            </h2>
            <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              aria-label={t('previous')}
              className="p-3 border border-border hover:border-accent transition-colors bg-card cursor-pointer focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label={t('next')}
              className="p-3 border border-border hover:border-accent transition-colors bg-card cursor-pointer focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Article Slide */}
        <div className="bg-muted rounded-sm p-6 md:p-8 grid md:grid-cols-2 gap-12 lg:gap-24 items-stretch overflow-hidden">

          {/* Image */}
          <div ref={parallaxRef} className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden bg-card rounded-sm">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, x: direction * 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ y: parallaxY, scale: 1.15 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Article Content */}
          <div className="flex flex-col justify-center pe-0 lg:pe-12">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-accent mb-5">
                  <span>{current.category}</span>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="text-muted-foreground">{formatDate(current.date, locale)}</span>
                </div>
                <h3 className="text-xl md:text-2xl leading-snug text-foreground font-normal mb-5">
                  {current.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-10 line-clamp-3">
                  {current.excerpt}
                </p>
                <Link
                  href={`/news/${current.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground hover:text-accent transition-colors focus-ring w-fit"
                >
                  {t('readArticle')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors focus-ring"
          >
            {t('viewAll')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
