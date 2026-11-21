'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { GUTTER, Pill, Rise, SERIF } from '@/components/home/ui';
import { CARD, Head, LetsTalk, PageShell, Photo, StoryCard, TitleHero, useQuote } from '@/components/page/kit';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';

// Services, in the reference's service-page order: the title and one
// action, two photographs set off against each other, one plain statement,
// what we do as cards (district cooling, then MEP), our own equipment as
// photographs carrying the figure, the recent work, and the form.
const RELATED_SLUGS = [
  'jumeirah-village-triangle-district-cooling-phase-3',
  'saadiyat-chilled-water-flushing',
];

function QuoteButton({ label }: { label: string }) {
  const open = useQuote();
  return <Pill onClick={open} variant="accent">{label}</Pill>;
}

function ServiceGrid({ items }: { items: { title: string; desc: string; img: string }[] }) {
  return (
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((s, i) => (
        <Rise key={s.title} delay={(i % 3) * 0.05}>
          <article className={`h-full rounded-[10px] ${CARD} overflow-hidden flex flex-col`}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={s.img} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] font-medium text-[#1a1a17]/70">{s.desc}</p>
            </div>
          </article>
        </Rise>
      ))}
    </div>
  );
}

export default function ServicesContent() {
  const t = useTranslations('ServicesPage');
  const p = useTranslations('Pages');
  const pd = useTranslations('ProjectDetail');
  const locale = useLocale() as Locale;

  const dc = [
    { title: t('s1Title'), desc: t('s1Desc'), img: '/images/projects/jvt-tank-installation.jpg' },
    { title: t('dc2Title'), desc: t('dc2Desc'), img: '/images/projects/saadiyat-flushing-equipment.jpg' },
    { title: t('dc3Title'), desc: t('dc3Desc'), img: '/images/projects/tecom-mechanical-room.jpg' },
    { title: t('dc4Title'), desc: t('dc4Desc'), img: '/images/projects/shindagha-valve-chamber-formwork.jpg' },
    { title: t('dc5Title'), desc: t('dc5Desc'), img: '/images/site/rooftop-cooling-equipment.jpg' },
    { title: t('dc6Title'), desc: t('dc6Desc'), img: '/images/projects/weld-inspection-tecom.jpg' },
  ];
  const mep = [
    { title: t('s3Title'), desc: t('s3Desc'), img: '/images/projects/chilled-water-pump-replacement.jpg' },
    { title: t('s2Title'), desc: t('s2Desc'), img: '/images/projects/electrical-panel-works.jpg' },
    { title: t('s7Title'), desc: t('s7Desc'), img: '/images/projects/dragonmart-corridor-cabling.jpg' },
    { title: t('s5Title'), desc: t('s5Desc'), img: '/images/projects/fabrication-piping-skid.jpg' },
    { title: t('s4Title'), desc: t('s4Desc'), img: '/images/projects/green-field-storage-tank.jpg' },
    { title: t('s6Title'), desc: t('s6Desc'), img: '/images/site/mep-corridor-interior.jpg' },
  ];
  const equipment = [
    { value: '1,600', unit: 'm³/hr', label: t('equip1'), img: '/images/projects/saadiyat-pump-skid.jpg' },
    { value: '450', unit: 'mm', label: t('equip2'), img: '/images/site/large-diameter-pipe-install.jpg' },
    { value: '1,400', unit: 'mm', label: t('equip3'), img: '/images/site/tunnel-piping-run.jpg' },
  ];
  const related = RELATED_SLUGS.map((s) => allProjects.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((x) => localizeProject(x, locale));

  return (
    <PageShell>
      <TitleHero label={t('eyebrow')} title={t('title')} sub={t('subtitle')}>
        <QuoteButton label={pd('getQuote')} />
      </TitleHero>

      {/* Two photographs set off against each other */}
      <section className={`${GUTTER}`}>
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-[900px] mx-auto items-start">
          <Photo src="/images/site/steel-structure-piping.jpg" alt="" className="aspect-[4/5]" sizes="45vw" priority />
          <Photo src="/images/projects/saadiyat-chiller-units.jpg" alt="" className="aspect-[4/3] mt-16 md:mt-24" sizes="45vw" priority />
        </div>
      </section>

      {/* One plain statement */}
      <section className={`${GUTTER} py-24 md:py-32`}>
        <Rise>
          <p className="mx-auto max-w-[640px] text-center text-[20px] md:text-[24px] leading-[1.3] font-medium tracking-[-0.01em]">{t('dcDescription')}</p>
        </Rise>
      </section>

      {/* District cooling */}
      <section id="district-cooling" className={`${GUTTER} pb-24 md:pb-32 scroll-mt-28`}>
        <div className="border-t border-[#1a1a17]/12 pt-5">
          <Head label={t('dcEyebrow')} title={t('dcHeadline')} />
          <ServiceGrid items={dc} />
        </div>
      </section>

      {/* MEP */}
      <section id="mep" className={`${GUTTER} pb-24 md:pb-32 scroll-mt-28`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 grid lg:grid-cols-2 gap-6 items-end">
          <Head label={t('mepEyebrow')} title={t('mepHeadline')} />
          <Rise delay={0.1}><p className="text-[16px] leading-[24px] font-medium text-[#1a1a17]/75 max-w-[52ch]">{t('mepDescription')}</p></Rise>
        </div>
        <ServiceGrid items={mep} />
      </section>

      {/* Our own equipment */}
      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 grid lg:grid-cols-2 gap-6 items-end">
          <Head label={t('equipEyebrow')} title={t('equipHeadline')} />
          <Rise delay={0.1}><p className="text-[16px] leading-[24px] font-medium text-[#1a1a17]/75 max-w-[52ch]">{t('equipDescription')}</p></Rise>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-3">
          {equipment.map((e, i) => (
            <Rise key={e.label} delay={i * 0.06}>
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[10px] bg-[#1a1a17] text-[#f4f3ea]">
                <Image src={e.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-5 bottom-5">
                  <span className={`${SERIF} text-[44px] md:text-[52px] leading-none`} dir="ltr">
                    {e.value}<span className="text-[20px] ms-1.5">{e.unit}</span>
                  </span>
                  <p className="mt-3 text-[13px] font-medium text-[#f4f3ea]/85">{e.label}</p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </section>

      {/* Recent work */}
      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 flex flex-wrap items-end justify-between gap-6">
          <Head label={p('landmarks')} title={t('relatedHeadline')} />
          <Rise><Pill href="/projects">{t('allProjects')}</Pill></Rise>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-3">
          {related.map((r) => (
            <Rise key={r.slug}>
              <StoryCard href={`/projects/${r.slug}`} img={r.image} tag={r.category} title={r.title} meta={r.location} cta={p('readCase')} />
            </Rise>
          ))}
        </div>
      </section>

      <LetsTalk />
    </PageShell>
  );
}
