'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUTTER, Label, Pill, Rise, SERIF } from '@/components/home/ui';
import { BlurWords, CARD, PageShell, Photo, StoryCard, useQuote } from '@/components/page/kit';
import { projects, localizeProject, type Locale } from '@/lib/projects';
import type { LocalizedIndustry } from '@/lib/industries';

// One sector: the title beside its photograph (as the reference's article
// head), the overview and what we do in it, and the projects behind it.
export default function IndustryDetailContent({ industry }: { industry: LocalizedIndustry }) {
  const t = useTranslations('IndustryDetail');
  const p = useTranslations('Pages');
  const locale = useLocale() as Locale;
  const openQuote = useQuote();

  const related = industry.relatedProjectSlugs
    .map((s) => projects.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((x) => localizeProject(x, locale));

  return (
    <PageShell>
      <section className={`${GUTTER} pt-[100px]`}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          <div className="flex flex-col justify-center pt-8 md:pt-0">
            <Link href="/services" className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-[#1a1a17]/60 hover:text-[#1a1a17] transition-colors focus-ring">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              {t('allIndustries')}
            </Link>
            <div className="mt-10"><Label>{industry.title}</Label></div>
            <h1 className={`${SERIF} mt-6 text-[36px] leading-[40px] sm:text-[48px] sm:leading-[52px] md:text-[56px] md:leading-[60px] md:tracking-[-2px] max-w-[16ch] text-balance`}>
              <BlurWords text={industry.headline} />
            </h1>
            <div className="mt-8"><Pill onClick={openQuote} variant="accent">{t('getQuote')}</Pill></div>
          </div>
          <Photo src={industry.image} alt={industry.title} className="aspect-[4/5] md:aspect-auto md:min-h-[600px]" sizes="(min-width: 768px) 50vw, 100vw" priority />
        </div>
      </section>

      <section className={`${GUTTER} py-28 md:py-44`}>
        <div className="grid md:grid-cols-2 gap-10">
          <Rise><Label>{t('overview')}</Label></Rise>
          <Rise delay={0.04}><p className="text-[20px] md:text-[22px] leading-[1.4] font-medium max-w-[580px]">{industry.overview}</p></Rise>
        </div>
        <div className="mt-16 border-t border-[#1a1a17]/12 pt-5">
          <Rise><Label>{t('capabilities')}</Label></Rise>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {industry.capabilities.map((c, i) => (
              <Rise key={c} delay={(i % 3) * 0.05}>
                <div className={`h-full rounded-[10px] ${CARD} p-5 flex gap-3.5`}>
                  <span className="mt-0.5 shrink-0 w-7 h-7 rounded-[8px] bg-accent text-white flex items-center justify-center" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <p className="text-[15px] leading-[1.5] font-medium">{c}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={`${GUTTER} pb-28 md:pb-44`}>
          <div className="border-t border-[#1a1a17]/12 pt-5">
            <Rise><Label>{t('relatedProjects')}</Label></Rise>
            <div className="mt-10 grid md:grid-cols-2 gap-3">
              {related.map((x) => (
                <Rise key={x.slug}>
                  <StoryCard href={`/projects/${x.slug}`} img={x.image} tag={x.category} title={x.title} meta={x.client ?? x.location} cta={p('readCase')} />
                </Rise>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
