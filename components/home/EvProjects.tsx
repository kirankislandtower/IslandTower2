'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';
import { GUTTER, SERIF, Label, Rise, ArrowCircle } from './ui';

// Landmark projects as a row of tall photo cards: client in the top corner,
// the project and a link at the foot. On larger screens the section holds
// still while the page scrolls and the row travels sideways with it; on
// phones (and with reduced motion) it is a row you swipe.
const FEATURED = [
  'abu-dhabi-airport-chilled-water-network',
  'presidential-palace-abu-dhabi-chilled-water',
  'midfield-terminal-abu-dhabi-chilled-water-flushing',
  'jumeirah-village-triangle-district-cooling-phase-3',
  'al-shindagha-corridor-chilled-water',
  'dubai-beachfront-chilled-water-network',
];

export default function EvProjects() {
  const t = useTranslations('Home2.projects');
  const locale = useLocale() as Locale;
  const rtl = locale === 'ar';
  const reduce = useReducedMotion();
  const rail = useRef<HTMLUListElement>(null);
  const wrap = useRef<HTMLElement>(null);
  const [pin, setPin] = useState(false);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const on = window.innerWidth >= 768 && !reduce;
      setPin(on);
      const el = rail.current;
      setTravel(on && el ? Math.max(0, el.offsetWidth - window.innerWidth) : 0);
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
  const x = useTransform(prog, (v) => (pin ? (rtl ? 1 : -1) * v * travel : 0));
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
      style={pin ? { height: `calc(100vh + ${travel}px)` } : undefined}
    >
     <div className={pin ? 'sticky top-0 h-screen flex flex-col justify-center pt-16' : 'pb-24'}>
      <div className={GUTTER}>
        <div className="border-t border-[#1a1a17]/12 pt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Rise><Label>{t('label')}</Label></Rise>
            <Rise delay={0.06}><h2 className={`${SERIF} mt-6 text-[32px] md:text-[48px] leading-[1.12] max-w-[16ch]`}>{t('title')}</h2></Rise>
          </div>
          {/* How far along the row is, in place of the arrows while it is pinned */}
          {pin && (
            <div className="w-[160px] h-px bg-[#1a1a17]/15 overflow-hidden" aria-hidden="true">
              <motion.div className="h-full bg-accent origin-left rtl:origin-right" style={{ scaleX: prog }} />
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
          const name = p.title.split(/\s[—–-]\s/)[0];
          return (
            <li key={p.slug} className="snap-start shrink-0 w-[82vw] sm:w-[46vw] md:w-[min(42vw,52vh)] lg:w-[min(30vw,52vh)] xl:w-[min(25vw,52vh)]">
              <Rise delay={Math.min(i, 3) * 0.08}>
                <Link href={`/projects/${p.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[10px] bg-[#1a1a17] text-[#f4f3ea] focus-ring">
                  <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 30vw, 82vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/40" aria-hidden="true" />
                  {p.client && <span className="absolute top-5 start-5 text-[20px] font-medium tracking-[-0.01em]">{p.client.replace(/\s*\(.*\)\s*/, '')}</span>}
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] uppercase text-[#f4f3ea]/75">
                      <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
                      {p.category}
                    </span>
                    <h3 className="mt-3 text-[22px] md:text-[24px] leading-[1.2] font-medium">{name}</h3>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="text-[12px] text-[#f4f3ea]/70">{p.location}</span>
                      <span className="inline-flex items-center gap-2 text-[14px]">
                        {t('view')}
                        <ArrowCircle className="w-7 h-7 bg-accent text-white" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Rise>
            </li>
          );
        })}
      </motion.ul>
     </div>
    </section>
  );
}
