'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { GUTTER, Label, Pill, Rise } from '@/components/home/ui';
import { LetsTalk, PageShell, StoryCard, useQuote } from '@/components/page/kit';
import ScatterHero from '@/components/page/ScatterHero';
import GrowText, { LIGHT } from '@/components/page/GrowText';
import ServiceIndex from '@/components/page/ServiceIndex';
import NetworkDiagram from '@/components/page/NetworkDiagram';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';

// Services, district cooling first and MEP behind it:
// the banner (the headline in three lines over a plant-room photograph),
// one plain statement set large, district cooling as a numbered index with
// a framed photograph beside it under a generated network diagram, MEP as
// photo cards on dark ground, our own equipment carrying its figures, the
// recent work, and the form.
const RELATED_SLUGS = [
  'jumeirah-village-triangle-district-cooling-phase-3',
  'saadiyat-chilled-water-flushing',
];

function QuoteButton({ label }: { label: string }) {
  const open = useQuote();
  return <Pill onClick={open} variant="accent">{label}</Pill>;
}

// A section heading in the light serif: label, then the line building in
function Heading({ label, title, light = false }: { label: string; title: string; light?: boolean }) {
  return (
    <div>
      <Rise><Label light={light}>{label}</Label></Rise>
      <h2 className={`${LIGHT} mt-5 text-[38px] sm:text-[48px] lg:text-[clamp(48px,4.2vw,68px)] leading-[1] max-w-[16ch] ${light ? 'text-[#f4f3ea]' : ''}`}>
        <GrowText text={title} />
      </h2>
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
      <ScatterHero
        title={t('heroBig')}
        line={t('subtitle')}
        linkLabel={t('heroScroll')}
        linkHref="#district-cooling"
        image="/images/services-banner.jpg"
        compact
      />

      {/* One plain statement, set large, and the one action */}
      <section className={`${GUTTER} py-28 md:py-44`}>
        <div className="mx-auto max-w-[900px] text-center flex flex-col items-center">
          <Rise><Label>{t('eyebrow')}</Label></Rise>
          <p className={`${LIGHT} mt-7 text-[30px] sm:text-[40px] md:text-[clamp(40px,3.6vw,58px)] leading-[1.08] max-w-[22ch]`}>
            <GrowText text={t('dcDescription')} stagger={0.012} />
          </p>
          <Rise delay={0.2} className="mt-10"><QuoteButton label={pd('getQuote')} /></Rise>
        </div>
      </section>

      {/* District cooling: the network, then the services as an index */}
      <section id="district-cooling" className={`${GUTTER} pb-28 md:pb-44 scroll-mt-28`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <Heading label={t('dcEyebrow')} title={t('dcHeadline')} />
          </div>
          <div className="lg:col-span-7">
            <NetworkDiagram labels={{ plant: t('netPlant'), mains: t('netMains'), ets: t('netEts'), buildings: t('netBuildings') }} />
          </div>
        </div>
        <div className="mt-14 md:mt-20">
          <ServiceIndex items={dc} />
        </div>
      </section>

      {/* MEP, on dark ground: photo cards */}
      <section id="mep" className="bg-[#1a1a17] text-[#f4f3ea] py-28 md:py-40 scroll-mt-0">
        <div className={`${GUTTER}`}>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <Heading label={t('mepEyebrow')} title={t('mepHeadline')} light />
            <Rise delay={0.1}><p className="text-[16px] md:text-[17px] leading-[1.6] font-medium text-[#f4f3ea]/70 max-w-[52ch]">{t('mepDescription')}</p></Rise>
          </div>
          <div className="mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {mep.map((s, i) => (
              <Rise key={s.title} delay={(i % 3) * 0.06}>
                <article className="group relative h-full min-h-[420px] md:min-h-[480px] overflow-hidden rounded-[14px] bg-[#f4f3ea]/[0.06] transition-transform duration-500 ease-out hover:-translate-y-0.5">
                  <Image src={s.img} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a17] via-[#1a1a17]/55 to-[#1a1a17]/0" aria-hidden="true" />
                  <div className="absolute inset-x-5 md:inset-x-6 bottom-5 md:bottom-6">
                    <span className="font-mono text-[12px] tabular-nums text-[#f4f3ea]/55" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={`${LIGHT} mt-2 text-[26px] md:text-[30px] leading-[1.02]`}>{s.title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.55] font-medium text-[#f4f3ea]/75">{s.desc}</p>
                  </div>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* Our own equipment */}
      <section className={`${GUTTER} py-28 md:py-44`}>
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          <Heading label={t('equipEyebrow')} title={t('equipHeadline')} />
          <Rise delay={0.1}><p className="text-[16px] md:text-[17px] leading-[1.6] font-medium text-[#1a1a17]/75 max-w-[52ch]">{t('equipDescription')}</p></Rise>
        </div>
        <div className="mt-14 md:mt-20 grid md:grid-cols-3 gap-3 md:gap-4">
          {equipment.map((e, i) => (
            <Rise key={e.label} delay={i * 0.06}>
              <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[14px] bg-[#1a1a17] text-[#f4f3ea]">
                <Image src={e.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-5 md:inset-x-6 bottom-5 md:bottom-6">
                  <span className={`${LIGHT} text-[52px] md:text-[64px] leading-none`} dir="ltr">
                    {e.value}<span className="text-[22px] ms-1.5">{e.unit}</span>
                  </span>
                  <p className="mt-3 text-[13px] md:text-[14px] font-medium text-[#f4f3ea]/85">{e.label}</p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </section>

      {/* Recent work */}
      <section className={`${GUTTER} pb-28 md:pb-44`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 flex flex-wrap items-end justify-between gap-6">
          <Heading label={p('landmarks')} title={t('relatedHeadline')} />
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
