'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUTTER, Label, Pill, Rise, SERIF } from '@/components/home/ui';
import { BlurWords, PageShell, Photo, StoryCard, useQuote } from '@/components/page/kit';
import { projects, localizeProject, type Locale, type LocalizedProject } from '@/lib/projects';

// One project, set as the reference's case study: dark ground, the client
// as the label, the title, the main photograph beside the facts, the scope
// as the lead, the gallery, a small card to start a similar job, and two
// more projects on cream.
export default function ProjectDetailContent({ project }: { project: LocalizedProject }) {
  const t = useTranslations('ProjectDetail');
  const p = useTranslations('Pages');
  const locale = useLocale() as Locale;
  const openQuote = useQuote();

  const same = projects.filter((x) => x.slug !== project.slug && x.category.en === project.categoryKey);
  const more = (same.length ? same : projects.filter((x) => x.slug !== project.slug)).slice(0, 2).map((x) => localizeProject(x, locale));

  const facts = [
    { k: t('category'), v: project.category },
    { k: t('location'), v: project.location },
    project.client && { k: t('client'), v: project.client },
    project.consultant && { k: t('consultant'), v: project.consultant },
    project.contractValue && { k: t('contractValue'), v: project.contractValue },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <PageShell>
      <div className="bg-[#1a1a17] text-[#f4f3ea]">
        <section className={`${GUTTER} pt-[132px] md:pt-[160px]`}>
          <Link href="/projects" className="inline-flex items-center gap-2 text-[13px] font-medium text-[#f4f3ea]/70 hover:text-[#f4f3ea] transition-colors focus-ring">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            {t('allProjects')}
          </Link>
          <div className="mt-10"><Label light>{project.client ?? project.category}</Label></div>
          <h1 className={`${SERIF} mt-6 text-[36px] leading-[40px] sm:text-[48px] sm:leading-[52px] md:text-[56px] md:leading-[60px] md:tracking-[-2px] max-w-[18ch] text-balance`}>
            <BlurWords text={project.title} />
          </h1>

          <div className="mt-12 grid md:grid-cols-[1.1fr_1fr] lg:grid-cols-[0.9fr_1fr] gap-8 md:gap-12 items-start">
            <Photo src={project.image} alt={project.title} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" priority />
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-[11px] tracking-[0.08em] uppercase font-medium text-[#f4f3ea]/55">{f.k}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`${GUTTER} py-24 md:py-32`}>
          <div className="grid md:grid-cols-2 gap-10">
            <Rise><Label light>{t('scopeOfWork')}</Label></Rise>
            <div className="max-w-[580px]">
              <Rise delay={0.04}><p className="text-[20px] md:text-[22px] leading-[1.4] font-medium">{project.description}</p></Rise>
              <Rise delay={0.08}><p className="mt-6 text-[16px] leading-[24px] font-medium text-[#f4f3ea]/75">{project.scope}</p></Rise>
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-16 md:mt-24 grid sm:grid-cols-2 gap-3">
              {project.gallery.slice(0, 4).map((src, i) => (
                <Photo key={src + i} src={src} alt={project.title} className="aspect-[4/3]" sizes="(min-width: 640px) 50vw, 100vw" />
              ))}
            </div>
          )}

          {/* Start a similar job */}
          <Rise className="mt-16 md:mt-24 flex justify-center">
            <div className="w-full max-w-[560px] rounded-[12px] bg-[#f4f3ea]/[0.06] border border-[#f4f3ea]/10 p-4 flex gap-5 items-center">
              <span className="relative shrink-0 w-[96px] h-[120px] rounded-[8px] overflow-hidden">
                <Image src="/images/projects/hse-safety-briefing-difc.jpg" alt="" fill sizes="96px" className="object-cover" />
              </span>
              <div>
                <Label light>{p('readyLabel')}</Label>
                <p className="mt-3 text-[17px] font-medium">{t('ctaHeadline')}</p>
                <p className="mt-1 text-[13px] font-medium text-[#f4f3ea]/65">{t('ctaSubtitle')}</p>
                <div className="mt-4"><Pill onClick={openQuote} variant="accent">{t('getQuote')}</Pill></div>
              </div>
            </div>
          </Rise>
        </section>
      </div>

      {/* More projects */}
      <section className={`${GUTTER} py-24 md:py-32`}>
        <Rise><Label>{p('moreStories')}</Label></Rise>
        <Rise delay={0.06}><h2 className={`${SERIF} mt-6 text-[30px] md:text-[40px] leading-[1.15] max-w-[16ch]`}>{p('moreStoriesTitle')}</h2></Rise>
        <div className="mt-12 grid md:grid-cols-2 gap-3">
          {more.map((x) => (
            <Rise key={x.slug}>
              <StoryCard href={`/projects/${x.slug}`} img={x.image} tag={x.category} title={x.title} meta={x.client ?? x.location} cta={p('readCase')} />
            </Rise>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
