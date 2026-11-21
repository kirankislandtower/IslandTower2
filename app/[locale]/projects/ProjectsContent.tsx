'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { EASE, GUTTER, Rise } from '@/components/home/ui';
import { BigQuote, PageShell, StoryCard, TitleHero } from '@/components/page/kit';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';

// Projects, laid out as the reference's customer stories: centred title, a
// row of the clients' marks, filters, the work as two-up cards, and the
// chairman's line to close.
const CATEGORY_KEYS = ['all', 'District Cooling', 'Flushing', 'MEP Engineering', 'Infrastructure'] as const;
const MARKS = ['empower', 'emicool', 'emaar', 'rta'];

export default function ProjectsContent() {
  const t = useTranslations('ProjectsPage');
  const p = useTranslations('Pages');
  const a = useTranslations('AboutPage');
  const locale = useLocale() as Locale;
  const [cat, setCat] = useState<(typeof CATEGORY_KEYS)[number]>('all');

  const list = useMemo(
    () => allProjects.filter((x) => cat === 'all' || x.category.en === cat).map((x) => localizeProject(x, locale)),
    [cat, locale]
  );

  const label: Record<(typeof CATEGORY_KEYS)[number], string> = {
    all: t('categoryAll'),
    'District Cooling': t('categoryDistrictCooling'),
    Flushing: t('categoryFlushing'),
    'MEP Engineering': t('categoryMep'),
    Infrastructure: t('categoryInfrastructure'),
  };

  return (
    <PageShell>
      <TitleHero label={t('eyebrow')} title={t('title')} sub={t('subtitle')}>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {MARKS.map((m) => (
            <span key={m} className="relative w-[84px] h-[34px] opacity-80 mix-blend-multiply">
              <Image src={`/images/clients/${m}.jpg`} alt="" fill sizes="84px" className="object-contain grayscale" />
            </span>
          ))}
        </div>
      </TitleHero>

      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <Rise className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORY_KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setCat(k)}
              aria-pressed={cat === k}
              className={`shrink-0 h-9 px-4 rounded-full text-[14px] transition-colors cursor-pointer focus-ring ${cat === k ? 'bg-[#1a1a17] text-[#f4f3ea]' : 'border border-[#1a1a17]/20 hover:bg-[#1a1a17]/5'}`}
            >
              {label[k]}
            </button>
          ))}
        </Rise>

        <motion.div layout className="mt-8 grid md:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((x) => (
              <motion.div
                key={x.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <StoryCard href={`/projects/${x.slug}`} img={x.image} tag={x.category} title={x.title} meta={x.client ?? x.location} cta={p('readCase')} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-16 text-center text-[15px] font-medium text-[#1a1a17]/60">{t('noProjects')}</p>}
      </section>

      <div className="border-t border-[#1a1a17]/12 mx-[18px] md:mx-6 lg:mx-8" />
      <BigQuote label={p('fromChairman')} quote={a('chairmanMotto')} name={a('chairmanName')} role={a('chairmanTitle')} img="/images/team/sasikumar-chairman.png" />
    </PageShell>
  );
}
