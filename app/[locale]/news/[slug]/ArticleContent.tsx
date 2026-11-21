'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUTTER, Label, Rise, SERIF } from '@/components/home/ui';
import { BlurWords, PageShell, Photo, StoryCard } from '@/components/page/kit';
import { articles, localizeArticle, type Locale, type LocalizedArticle } from '@/lib/news';

// One article, as the reference's post: date and title on the left with the
// photograph on the right, then a single reading column whose first
// paragraph is the standfirst, sharing links, and two more pieces.
const siteUrl = 'https://www.islandtoweruae.ae';

function formatDate(d: string, locale: Locale) {
  return new Date(d).toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticleContent({ article }: { article: LocalizedArticle }) {
  const t = useTranslations('ArticleDetail');
  const p = useTranslations('Pages');
  const locale = useLocale() as Locale;
  const [copied, setCopied] = useState(false);
  const more = articles.filter((a) => a.slug !== article.slug).map((a) => localizeArticle(a, locale)).slice(0, 2);
  const url = `${siteUrl}${locale === 'ar' ? '/ar' : ''}/news/${article.slug}`;
  const [lead, ...body] = article.content;

  const SHARE = 'inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#1a1a17]/15 hover:bg-[#1a1a17] hover:text-[#f4f3ea] transition-colors focus-ring cursor-pointer';

  return (
    <PageShell>
      <section className={`${GUTTER} pt-[100px] md:pt-[100px]`}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          <div className="flex flex-col justify-center pt-8 md:pt-0">
            <Link href="/news" className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-[#1a1a17]/60 hover:text-[#1a1a17] transition-colors focus-ring">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              {t('allInsights')}
            </Link>
            <div className="mt-10"><Label>{formatDate(article.date, locale)} · {article.category}</Label></div>
            <h1 className={`${SERIF} mt-6 text-[36px] leading-[40px] sm:text-[48px] sm:leading-[52px] md:text-[48px] md:leading-[52px] md:tracking-[-1.5px] max-w-[20ch] text-balance`}>
              <BlurWords text={article.title} />
            </h1>
          </div>
          <Photo src={article.image} alt={article.title} className="aspect-[4/5] md:aspect-auto md:min-h-[640px]" sizes="(min-width: 768px) 50vw, 100vw" priority />
        </div>
      </section>

      <section className={`${GUTTER} py-20 md:py-28`}>
        <div className="max-w-[640px] mx-auto">
          <Rise><Label>{p('writtenBy')} · {article.readTime}</Label></Rise>
          {lead && <Rise delay={0.04}><p className="mt-8 text-[20px] md:text-[24px] leading-[1.35] font-medium tracking-[-0.01em]">{lead}</p></Rise>}
          <div className="mt-8 flex flex-col gap-5">
            {body.map((para, i) => (
              <Rise key={i}><p className="text-[16px] leading-[26px] font-medium text-[#1a1a17]/80">{para}</p></Rise>
            ))}
          </div>

          <div className="mt-14 pt-6 border-t border-[#1a1a17]/12 flex items-center justify-between gap-4">
            <Label>{t('share')}</Label>
            <div className="flex items-center gap-2">
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={SHARE}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={SHARE}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 1 1 6.97 3.85z" /></svg>
              </a>
              <button
                type="button"
                aria-label={copied ? t('linkCopied') : t('share')}
                className={SHARE}
                onClick={async () => {
                  try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
                }}
              >
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="border-t border-[#1a1a17]/12 pt-5">
          <Rise><Label>{t('moreInsights')}</Label></Rise>
          <div className="mt-10 grid md:grid-cols-2 gap-3">
            {more.map((a) => (
              <Rise key={a.slug}>
                <StoryCard href={`/news/${a.slug}`} img={a.image} tag={formatDate(a.date, locale)} title={a.title} meta={a.category} cta={p('readArticle')} />
              </Rise>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
