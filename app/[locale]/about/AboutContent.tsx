'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { GUTTER, Label, Rise, SERIF } from '@/components/home/ui';
import { CARD, PageShell, Photo } from '@/components/page/kit';
import FocusText from '@/components/page/FocusText';
import ReadText from '@/components/page/ReadText';
import ValuesStepper from '@/components/page/ValuesStepper';
import Parallax from '@/components/page/Parallax';
import ApprovalLedger from '@/components/page/ApprovalLedger';
import ApprovalSteps from '@/components/page/ApprovalSteps';
import DisciplineDrum from '@/components/page/DisciplineDrum';
import FilmStrip from '@/components/page/FilmStrip';
import ScatterHero from '@/components/page/ScatterHero';
import CurvedGallery from '@/components/page/CurvedGallery';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';

// A site photograph for each value, shown as the values step through
const VALUE_IMG = [
  '/images/values/integrity.jpg',
  '/images/values/excellence.jpg',
  '/images/values/innovation.jpg',
  '/images/values/sustainability.jpg',
  '/images/values/collaboration-crew.jpg',
  '/images/values/safety.jpg',
];

// About: the banner, the story on dark ground with a pinned film strip,
// the figures, the values stepping through, the milestones, a walk round
// the projects, the Managing Director's letter, vision and mission, and
// the approvals ledger.
const FOUNDED_YEAR = 2003;

const STRIP = [
  { src: '/images/strip/excavators.jpg', key: 'strip1' },
  { src: '/images/strip/rebar.jpg', key: 'strip2', wide: true },
  { src: '/images/strip/crane-lift.jpg', key: 'strip3' },
  { src: '/images/strip/valves.jpg', key: 'strip4', wide: true },
  { src: '/images/strip/water-line.jpg', key: 'strip5' },
  { src: '/images/strip/inspection.jpg', key: 'strip6', wide: true },
] as const;

export default function AboutContent() {
  const t = useTranslations('AboutPage');
  const p = useTranslations('Pages');
  const locale = useLocale() as Locale;
  const galleryItems = allProjects.map((pr) => {
    const l = localizeProject(pr, locale);
    return { img: l.image, title: l.title, meta: l.location, href: `/projects/${l.slug}` };
  });
  const years = new Date().getFullYear() - FOUNDED_YEAR;


  const stats = [
    { value: `${years}+`, label: t('stat1') },
    { value: '200+', label: t('stat2') },
    { value: '2', label: t('stat3') },
    { value: '3 ISO', label: t('stat4') },
  ];
  const values = [1, 2, 3, 4, 5, 6].map((n) => ({ title: t(`value${n}Title`), desc: t(`value${n}Desc`) }));
  const milestones = [1, 2, 3, 4, 5, 6].map((n) => ({ year: t(`milestone${n}Year`), label: t(`milestone${n}Label`), text: t(`milestone${n}Text`) }));
  // The chairman's letter, split into an opening line and the rest
  const sentences = t('chairmanQuote').split(/(?<=[.!?؟])\s+/);
  const letter = [sentences[0], sentences.slice(1, 3).join(' '), sentences.slice(3).join(' ')].filter(Boolean);

  // Each name in short staggered lines, after the reference's step names
  const rta = t('rtaCode');
  const rtaCut = rta.indexOf(' ');
  const approvalSteps = [
    { lines: rtaCut > 0 ? [rta.slice(0, rtaCut), rta.slice(rtaCut + 1)] : [rta], indent: [0.55, 0], desc: t('rtaDesc'), img: '/images/approvals/rta-graded.jpg' },
    { lines: ['ISO', '9001'], indent: [0, 0.66], desc: t('iso9001Desc'), img: '/images/approvals/iso9001-uae.jpg', ltr: true },
    { lines: ['ISO', '14001'], indent: [0.36, 0], desc: t('iso14001Desc'), img: '/images/approvals/iso14001-uae.jpg', ltr: true },
    { lines: ['ISO', '45001'], indent: [0, 0.5], desc: t('iso45001Desc'), img: '/images/approvals/iso45001-uae.jpg', ltr: true },
  ];
  const commitments = (['quality-system', 'hse', 'sustainability', 'technology'] as const).map((id, i) => {
    const key = ['quality', 'hse', 'sustainability', 'technology'][i];
    return { id, title: t(`${key}Title`), desc: t(`${key}Desc`) };
  });
  return (
    <PageShell>
      <ScatterHero
        title={t('heroBig')}
        line={t('heroLine')}
        linkLabel={t('heroScroll')}
        linkHref="#story"
        image="/images/about-banner-interchange.jpg"
        imagePosition="center 78%"
      />

      {/* Story on dark ground */}
      <section id="story" className="bg-[#1a1a17] text-[#f4f3ea] pt-28 md:pt-44 pb-28 md:pb-44 [overflow-x:clip] scroll-mt-0">
        <div className={`${GUTTER} grid md:grid-cols-2 gap-10`}>
          {/* The founding year, carrying the left half */}
          <div className="flex flex-col">
            <Rise><Label light>{t('storyEyebrow')}</Label></Rise>
            <Rise delay={0.06}>
              <span className={`${SERIF} block mt-8 md:mt-10 text-[96px] md:text-[160px] lg:text-[200px] leading-[0.85] tracking-[-0.04em] text-[#f4f3ea]`} dir="ltr">
                2003
              </span>
            </Rise>
            <Rise delay={0.1}>
              <p className="mt-6 text-[15px] leading-[1.55] font-medium text-[#f4f3ea]/70 max-w-[38ch]">
                <span className="text-[#f4f3ea]">{t('milestone1Label')}.</span> {t('milestone1Text')}
              </p>
            </Rise>
            <Rise delay={0.14} className="mt-8 flex flex-wrap gap-2">
              {[t('rtaCode'), 'ISO 9001 · 14001 · 45001', `${years}+ ${t('stat1')}`].map((c) => (
                <span key={c} className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full border border-[#f4f3ea]/20 text-[12px] font-medium text-[#f4f3ea]/85">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
                  {c}
                </span>
              ))}
            </Rise>
          </div>
          <div className="flex flex-col gap-6 max-w-[560px]">
            <FocusText as="h2" text={t('storyHeadline')} className={`${SERIF} text-[28px] md:text-[34px] leading-[1.2]`} />
            <ReadText text={t('storyP1')} className="text-[16px] md:text-[18px] leading-[1.6] font-medium text-[#f4f3ea]" />
            <ReadText text={t('storyP2')} className="text-[16px] md:text-[18px] leading-[1.6] font-medium text-[#f4f3ea]" />
          </div>
        </div>

        <div className="mt-8 md:mt-12">
          <FilmStrip dir={locale === 'ar' ? 'rtl' : 'ltr'} frames={STRIP.map((f) => ({ src: f.src, caption: t(f.key), wide: 'wide' in f }))} />
        </div>

        {/* Figures in ruled rows */}
        <div className={`${GUTTER} mt-24 md:mt-32`}>
          {stats.map((s, i) => (
            <Rise key={s.label} delay={i * 0.05}>
              <div className="grid grid-cols-[1fr_auto] md:grid-cols-2 items-center gap-6 border-t border-[#f4f3ea]/15 py-6 md:py-7">
                <Label light>{s.label}</Label>
                <span className={`${SERIF} text-[40px] md:text-[56px] leading-none`} dir="ltr">{s.value}</span>
              </div>
            </Rise>
          ))}
          <div className="border-t border-[#f4f3ea]/15" />
        </div>
      </section>

      {/* What we build: the disciplines rolling past on a cream card */}
      <DisciplineDrum
        label={t('buildLabel')}
        title={t('buildTitle')}
        text={t('buildText')}
        items={(['snow', 'drop', 'plug', 'building', 'shovel', 'road', 'wave', 'flask', 'bolt'] as const).map((icon, i) => ({ name: t(`disc${i + 1}`), icon }))}
      />

      {/* What we stand for: pinned, stepping through the values one at a
          time with a photograph for each */}
      <ValuesStepper
        label={t('valuesEyebrow')}
        title={t('valuesHeadline')}
        steps={values.map((v, i) => ({ title: v.title, desc: v.desc, img: VALUE_IMG[i] }))}
      />

      {/* Milestones, stacked */}
      <section className={`${GUTTER} pt-20 md:pt-32 pb-28 md:pb-44`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left column stays in view while the milestones pass */}
          <div className="md:sticky md:top-28 flex flex-col gap-8">
            <div>
              <Rise><Label>{t('timelineEyebrow')}</Label></Rise>
              <Rise delay={0.04}><h2 className={`${SERIF} mt-6 text-[30px] md:text-[40px] leading-[1.15]`}>{t('timelineHeadline')}</h2></Rise>
              <Rise delay={0.08}><p className="mt-5 text-[16px] leading-[24px] font-medium text-[#1a1a17]/75 max-w-[48ch]">{t('subtitle')}</p></Rise>
            </div>
            <Photo src="/images/about-banner-dubai.jpg" alt={t('milestone4Label')} className="hidden md:block aspect-[4/3] max-h-[52vh]" sizes="50vw" />
          </div>
          <div>
            <ul className="flex flex-col gap-3">
              {milestones.map((m, i) => (
                <Rise key={i} delay={0.04}>
                  <li className={`rounded-[10px] ${CARD} p-5 md:p-6`}>
                    <span className="text-[11px] tracking-[0.08em] uppercase font-medium text-[#3f403c]" dir="ltr">{m.year}</span>
                    <h3 className="mt-3 text-[18px] md:text-[20px] font-medium tracking-[-0.01em]">{m.label}</h3>
                    <p className="mt-2 text-[14px] leading-[1.55] font-medium text-[#1a1a17]/70 max-w-[52ch]">{m.text}</p>
                  </li>
                </Rise>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The projects on a curved wall: scroll or drag to walk round */}
      <CurvedGallery
        items={galleryItems}
        labels={{ title: t('galleryTitle'), past: t('galleryPast'), hint: t('galleryHint'), view: t('galleryView'), prev: t('galleryPrev'), next: t('galleryNext') }}
      />

      {/* Chairman: one black card, the motto and his letter on the left, his
          portrait standing in a soft spotlight on the right. The cut-out photo
          fades to transparent at the bottom, so it sits on the card's floor. */}
      <section className={`${GUTTER} pt-20 md:pt-32 pb-28 md:pb-44`}>
        <Rise>
          <Parallax scale={[0.84, 1]} y={[120, -60]} className="relative overflow-hidden rounded-[14px] md:rounded-[20px] bg-[#050505] text-[#f4f3ea] max-w-[1200px] mx-auto">
            <Parallax y={[-200, 200]} className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{ background: 'radial-gradient(ellipse 45% 60% at 72% 40%, rgba(255,255,255,0.09), transparent 70%)' }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 pointer-events-none lg:hidden"
              style={{ background: 'radial-gradient(ellipse 70% 25% at 50% 82%, rgba(255,255,255,0.09), transparent 70%)' }}
              aria-hidden="true"
            />
            </Parallax>
            <div className="relative grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:min-h-[540px]">
              <Parallax y={[140, -90]} className="p-6 sm:p-9 lg:p-12 lg:pe-2">
                <Label light>{p('fromChairman')}</Label>
                <blockquote className={`${SERIF} mt-5 text-[34px] leading-[1.05] sm:text-[42px] lg:text-[48px] tracking-[-0.02em] max-w-[14ch]`}>
                  &ldquo;{t('chairmanMotto')}&rdquo;
                </blockquote>

                {letter.map((para, i) => (
                  <p
                    key={i}
                    className={i === 0
                      ? 'mt-7 text-[17px] md:text-[18px] leading-[1.45] font-medium tracking-[-0.01em] max-w-[56ch] text-balance'
                      : 'mt-4 text-[14px] md:text-[15px] leading-[24px] text-[#f4f3ea]/65 max-w-[60ch]'}
                  >
                    {i === 0 ? para.replace(/\bI am\b/, 'I\u00A0am') : para}
                  </p>
                ))}

                <div className="mt-7 pt-6 border-t border-[#f4f3ea]/12 max-w-[60ch]">
                  <p className="text-[16px] font-medium">{t('chairmanName')}</p>
                  <p className="mt-1 text-[11px] tracking-[0.14em] uppercase font-medium text-[#f4f3ea]/50">{t('chairmanTitle')} · {t('chairmanOrg')}</p>
                  <p className="mt-3 text-[12px] leading-[1.6] text-[#f4f3ea]/45">{t('chairmanBio')}</p>
                </div>
              </Parallax>

              <div className="relative h-[280px] sm:h-[380px] lg:h-auto">
                <Parallax y={[280, -40]} scale={[1.18, 1]} className="absolute inset-0 origin-bottom">
                <Image
                  src="/images/team/sasikumar-chairman-bw.png"
                  alt={t('chairmanName')}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain object-bottom lg:pt-8"
                />
                </Parallax>
              </div>
            </div>
          </Parallax>
        </Rise>

        {/* Vision and mission */}
        {/* Vision and mission: one panel, two halves split by a hairline, each
            marked by a large outlined numeral instead of an icon */}
        <Rise>
          <div className={`mt-16 md:mt-24 max-w-[1200px] mx-auto rounded-[14px] md:rounded-[20px] ${CARD} overflow-hidden grid md:grid-cols-2`}>
            {[
              { k: t('visionTitle'), v: t('visionText') },
              { k: t('missionTitle'), v: t('missionText') },
            ].map((b, i) => (
              <div
                key={b.k}
                className={`group relative p-6 sm:p-9 lg:p-12 flex flex-col ${i === 1 ? 'border-t md:border-t-0 md:border-s border-[#1a1a17]/10' : ''}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <Label>{b.k}</Label>
                  <span
                    className={`${SERIF} text-[64px] md:text-[88px] leading-[0.8] text-transparent select-none transition-colors duration-500 group-hover:text-accent/10`}
                    style={{ WebkitTextStroke: '1px rgba(26,26,23,0.18)' }}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-8 md:mt-10">
                  <span className="block w-10 h-[2px] bg-accent transition-all duration-500 group-hover:w-16" aria-hidden="true" />
                  <p className={`${SERIF} mt-6 text-[21px] sm:text-[23px] lg:text-[26px] leading-[1.32] tracking-[-0.015em] text-[#1a1a17] max-w-[28ch]`}>{b.v}</p>
                </div>
              </div>
            ))}
          </div>
        </Rise>
      </section>

      {/* Approvals, step by step on dark ground, then the commitments
          behind them */}
      <ApprovalSteps id="quality" label={t('approvalsEyebrow')} title={t('approvalsHeadline')} steps={approvalSteps} />
      <section className={`${GUTTER} pt-20 md:pt-32 pb-28 md:pb-44`}>
        <ApprovalLedger approvals={[]} commitments={commitments} />
      </section>
    </PageShell>
  );
}
