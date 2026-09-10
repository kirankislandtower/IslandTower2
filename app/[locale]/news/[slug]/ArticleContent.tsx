'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { articles, localizeArticle, type Locale, type LocalizedArticle } from '@/lib/news';

const siteUrl = 'https://www.islandtoweruae.ae';

function formatDate(dateStr: string, locale: Locale) {
  return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticleContent({ article }: { article: LocalizedArticle }) {
  const t = useTranslations('ArticleDetail');
  const locale = useLocale() as Locale;
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const more = articles
    .filter((a) => a.slug !== article.slug)
    .map((a) => localizeArticle(a, locale))
    .slice(0, 2);

  const articleUrl = `${siteUrl}${locale === 'ar' ? '/ar' : ''}/news/${article.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // clipboard access denied - nothing to fall back to here
    }
  };

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-end overflow-hidden bg-[#111]">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/60 via-[#111]/40 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-[200px] pb-16"
        >
          <Link
            href="/news"
            className="flex w-fit items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors focus-ring mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {t('allInsights')}
          </Link>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{article.category}</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] mt-4 max-w-4xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 font-mono text-xs tracking-widest uppercase text-white/60 mt-6">
            <span>{formatDate(article.date, locale)}</span>
            <span>&middot;</span>
            <span>{article.readTime}</span>
          </div>
        </motion.div>
      </section>

      {/* Article Body */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-foreground text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-2xl p-8 lg:sticky lg:top-32 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent" />
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('articleInfo')}</span>
              </div>

              <dl className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t('category')}</dt>
                  <dd className="text-foreground text-end">{article.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t('published')}</dt>
                  <dd className="text-foreground text-end">{formatDate(article.date, locale)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t('readTime')}</dt>
                  <dd className="text-foreground text-end">{article.readTime}</dd>
                </div>
              </dl>

              <div className="pt-6 border-t border-border">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-4">{t('share')}</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="p-2.5 border border-border hover:border-accent hover:text-accent transition-colors rounded-full focus-ring"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${articleUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="p-2.5 border border-border hover:border-accent hover:text-accent transition-colors rounded-full focus-ring"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 1 1 6.97 3.85zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
                    </svg>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    aria-label={t('share')}
                    className="p-2.5 border border-border hover:border-accent hover:text-accent transition-colors rounded-full cursor-pointer focus-ring"
                  >
                    {linkCopied ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Insights */}
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
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('moreInsights')}</span>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {more.map((a) => (
              <Link
                key={a.slug}
                href={`/news/${a.slug}`}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg focus-ring"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 start-0 end-0 p-6">
                  <span className="font-mono text-xs tracking-widest uppercase text-white/70">{a.category}</span>
                  <h3 className="text-xl text-white font-medium mt-1">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
