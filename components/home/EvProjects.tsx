'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';
import { GUTTER, SERIF, Label, Rise, ArrowCircle } from './ui';
import GrowText from '@/components/page/GrowText';

// Landmark projects as a row of tall photo cards: client in the top corner,
// the project and a link at the foot. On larger screens the section holds
// still while the page scrolls: the cards arrive scattered across the
// screen at loose tilts and depths, like prints dropped on a table, and
// straighten one by one into a neat row, which then travels sideways. On
// phones (and with reduced motion) it is a row you swipe.
const FEATURED = [
  'abu-dhabi-airport-chilled-water-network',
  'presidential-palace-abu-dhabi-chilled-water',
  'midfield-terminal-abu-dhabi-chilled-water-flushing',
  'jumeirah-village-triangle-district-cooling-phase-3',
  'al-shindagha-corridor-chilled-water',
  'dubai-beachfront-chilled-water-network',
];

// Where each card lies before it settles: across the screen (fraction of
// its width), how far down (fraction of its height), its turn and tilt,
// its size, its stacking and when it settles
const SCATTER = [
  { fx: 0.16, fy: 0.04, r: -9, rx: 14, ry: -18, s: 0.8, z: 3, at: 0.1 },
  { fx: 0.44, fy: -0.12, r: 6, rx: -10, ry: 12, s: 0.9, z: 5, at: 0 },
  { fx: 0.8, fy: 0.0, r: -4, rx: 18, ry: -8, s: 0.76, z: 2, at: 0.16 },
  { fx: 0.3, fy: 0.22, r: 11, rx: 8, ry: 20, s: 0.86, z: 6, at: 0.06 },
  { fx: 0.62, fy: 0.12, r: -7, rx: -14, ry: 10, s: 0.94, z: 4, at: 0.2 },
  { fx: 0.9, fy: 0.26, r: 5, rx: 10, ry: -16, s: 0.8, z: 1, at: 0.26 },
];
const SETTLE_SCREENS = 1.1;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - v, 3);

type Geo = { vw: number; vh: number; centres: number[] };

export default function EvProjects() {
  const t = useTranslations('Home2.projects');
  const locale = useLocale() as Locale;
  const rtl = locale === 'ar';
  const reduce = useReducedMotion();
  const rail = useRef<HTMLUListElement>(null);
  const wrap = useRef<HTMLElement>(null);
  const [pin, setPin] = useState(false);
  const [travel, setTravel] = useState(0);
  const [geo, setGeo] = useState<Geo>({ vw: 0, vh: 0, centres: [] });

  useEffect(() => {
    const measure = () => {
      const on = window.innerWidth >= 768 && !reduce;
      setPin(on);
      const el = rail.current;
      setTravel(on && el ? Math.max(0, el.offsetWidth - window.innerWidth) : 0);
      // Each card's centre in the settled row (layout only, transforms ignored)
      const centres = el ? Array.from(el.children).map((li) => (li as HTMLElement).offsetLeft + (li as HTMLElement).offsetWidth / 2) : [];
      setGeo({ vw: window.innerWidth, vh: window.innerHeight, centres });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rail.current) ro.observe(rail.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [reduce]);

  const { scrollYProgress: raw } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const prog = useTransform(raw, (v) => v);
  // The first part of the track settles the cards, the rest moves the row
  const settleH = SETTLE_SCREENS * geo.vh;
  const split = settleH + travel > 0 ? settleH / (settleH + travel) : 1;
  const settle = useTransform(prog, (v) => (pin ? clamp(v / split) : 1));
  const move = useTransform(prog, (v) => (pin && split < 1 ? clamp((v - split) / (1 - split)) : 0));
  const x = useTransform(move, (v) => (rtl ? 1 : -1) * v * travel);
  const list = FEATURED.map((s) => allProjects.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p)).map((p) => localizeProject(p, locale));

  const step = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('li');
    const w = (card?.clientWidth ?? 360) + 12;
    el.scrollBy({ left: (rtl ? -dir : dir) * w, behavior: 'smooth' });
  };

  return (
    <section
      ref={wrap}
      data-section="projects"
      className="relative bg-[#f4f3ea] text-[#1a1a17] overflow-x-clip"
      style={pin ? { height: `calc(${100 + SETTLE_SCREENS * 100}vh + ${travel}px)` } : undefined}
    >
     <div className={pin ? 'sticky top-0 h-screen flex flex-col justify-center pt-16' : 'pb-24'}>
      <div className={GUTTER}>
        <div className="border-t border-[#1a1a17]/12 pt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Rise><Label>{t('label')}</Label></Rise>
            <Rise delay={0.06}><h2 className={`${SERIF} mt-6 text-[32px] md:text-[48px] leading-[1.12] max-w-[16ch]`}><GrowText text={t('title')} /></h2></Rise>
          </div>
          {/* How far along the row is, in place of the arrows while it is pinned */}
          {pin && (
            <div className="w-[160px] h-px bg-[#1a1a17]/15 overflow-hidden" aria-hidden="true">
              <motion.div className="h-full bg-accent origin-left rtl:origin-right" style={{ scaleX: move }} />
            </div>
          )}
          <div className={`flex gap-2 ${pin ? 'hidden' : ''}`}>
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => step(d)}
                aria-label={d < 0 ? t('prev') : t('next')}
                className="w-11 h-11 rounded-full border border-[#1a1a17]/20 flex items-center justify-center hover:bg-[#1a1a17] hover:text-[#f4f3ea] transition-colors cursor-pointer focus-ring"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={d < 0 ? 'rotate-180 rtl:rotate-0' : 'rtl:rotate-180'} aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.ul
        ref={rail}
        style={{ x }}
        className={pin
          ? `mt-10 lg:mt-14 flex gap-3 w-max ${GUTTER}`
          : `mt-12 flex gap-3 overflow-x-auto snap-x snap-mandatory ${GUTTER} pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        {...(pin ? {} : { 'data-lenis-prevent-wheel': true })}
      >
        {list.map((p, i) => {
          const card = <CardBody p={p} view={t('view')} />;
          return pin ? (
            <ScatterCard key={p.slug} i={i} settle={settle} geo={geo}>{card}</ScatterCard>
          ) : (
            <li key={p.slug} className={LI}>
              <Rise delay={Math.min(i, 3) * 0.08}>{card}</Rise>
            </li>
          );
        })}
      </motion.ul>
     </div>
    </section>
  );
}

const LI = 'snap-start shrink-0 w-[82vw] sm:w-[46vw] md:w-[min(36vw,44vh)] lg:w-[min(26vw,44vh)] xl:w-[min(21vw,44vh)]';

// One card on the pinned stage: lies scattered (moved across the screen,
// turned, tilted back in depth, smaller) and straightens into its place in
// the row as the settle progress passes its own window
function ScatterCard({ i, settle, geo, children }: { i: number; settle: MotionValue<number>; geo: Geo; children: React.ReactNode }) {
  const sc = SCATTER[i % SCATTER.length];
  const centre = geo.centres[i] ?? 0;
  const dx = geo.vw ? sc.fx * geo.vw - centre : 0;
  const dy = sc.fy * geo.vh;
  // How far this card still has to go: 1 scattered, 0 settled
  const rem = useTransform(settle, (v) => 1 - ease(clamp((v - sc.at) / 0.62)));
  const x = useTransform(rem, (r) => dx * r);
  const y = useTransform(rem, (r) => dy * r);
  const rotate = useTransform(rem, (r) => sc.r * r);
  const rotateX = useTransform(rem, (r) => sc.rx * r);
  const rotateY = useTransform(rem, (r) => sc.ry * r);
  const scale = useTransform(rem, (r) => 1 - (1 - sc.s) * r);
  const shadow = useTransform(rem, (r) => `0 ${40 * r}px ${80 * r}px -${30 * r}px rgba(26,26,23,${0.45 * r})`);
  return (
    <motion.li
      className={`${LI} relative rounded-[10px]`}
      style={{ x, y, rotate, rotateX, rotateY, scale, transformPerspective: 1400, zIndex: sc.z, boxShadow: shadow }}
    >
      {children}
    </motion.li>
  );
}

type Card = ReturnType<typeof localizeProject>;

function CardBody({ p, view }: { p: Card; view: string }) {
  const name = p.title.split(/\s[—–-]\s/)[0];
  return (
    <Link href={`/projects/${p.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[10px] bg-[#1a1a17] text-[#f4f3ea] focus-ring">
      <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 30vw, 82vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/40" aria-hidden="true" />
      {p.client && <span className="absolute top-5 start-5 text-[20px] md:text-[17px] font-medium tracking-[-0.01em]">{p.client.replace(/\s*\(.*\)\s*/, '')}</span>}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] uppercase text-[#f4f3ea]/75">
          <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
          {p.category}
        </span>
        <h3 className="mt-3 text-[22px] md:text-[20px] leading-[1.2] font-medium">{name}</h3>
        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-[12px] text-[#f4f3ea]/70">{p.location}</span>
          <span className="inline-flex items-center gap-2 text-[14px]">
            {view}
            <ArrowCircle className="w-7 h-7 bg-accent text-white" />
          </span>
        </div>
      </div>
    </Link>
  );
}
