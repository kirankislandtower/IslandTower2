'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUTTER, SERIF, Rise, ArrowCircle } from './ui';

// What we do: the section pins and the service cards slide sideways as the
// page is scrolled down, with a progress bar under them. The pin lasts
// exactly as long as the row needs to travel, then releases.
const CARDS = [
  { k: 's1', href: '/services#district-cooling', img: '/images/site/large-diameter-pipe-install.jpg' },
  { k: 's2', href: '/services#mep', img: '/images/site/fire-piping-plant-room.jpg' },
  { k: 's3', href: '/industries/infrastructure', img: '/images/projects/shindagha-pipe-trench-shoring.jpg' },
] as const;

export default function EvServices() {
  const t = useTranslations('Home2.services');
  const rtl = useLocale() === 'ar';
  const reduce = useReducedMotion();

  const trackRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  // How far the row has to move to show its last card
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const el = rowRef.current;
      if (!el) return;
      const cs = getComputedStyle(el);
      const items = Array.from(el.children) as HTMLElement[];
      const gap = parseFloat(cs.columnGap) || 0;
      const content = items.reduce((sum, c) => sum + c.offsetWidth, 0) + gap * Math.max(0, items.length - 1);
      const total = content + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      setTravel(Math.max(0, Math.round(total - el.clientWidth)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (p) => (rtl ? 1 : -1) * p * travel);
  const bar = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const pinned = !reduce && travel > 0;

  const cards = CARDS.map((c, i) => (
    <li key={c.k} className="shrink-0 snap-start">
      <Link
        href={c.href}
        className="group relative block w-[82vw] sm:w-[64vw] md:w-[56vw] lg:w-[46vw] h-[58svh] min-h-[380px] max-h-[620px] overflow-hidden rounded-[10px] bg-[#1a1a17] text-[#f4f3ea] focus-ring"
      >
        <Image src={c.img} alt="" fill sizes="(min-width: 1024px) 46vw, (min-width: 768px) 56vw, 82vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60" aria-hidden="true" />
        <div className="absolute top-0 inset-x-0 p-5 md:p-7">
          <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] uppercase text-[#f4f3ea]/70">
            <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
            {t(`${c.k}Label`)}
          </span>
          <h3 className="mt-2 text-[24px] md:text-[30px] leading-tight font-medium tracking-[-0.01em]">{t(`${c.k}Title`)}</h3>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-5 md:p-7 flex items-end justify-between gap-6">
          <p className="text-[15px] leading-snug text-[#f4f3ea]/90 max-w-[34ch]">{t(`${c.k}Text`)}</p>
          <ArrowCircle className="shrink-0 bg-white/15 backdrop-blur-sm text-white group-hover:bg-accent transition-colors" />
        </div>
        <span className="absolute top-5 end-5 md:top-7 md:end-7 text-[12px] font-medium text-[#f4f3ea]/70" aria-hidden="true">
          {String(i + 1).padStart(2, '0')} / {String(CARDS.length).padStart(2, '0')}
        </span>
      </Link>
    </li>
  ));

  return (
    <section
      ref={trackRef}
      data-section="services"
      className="relative bg-[#f4f3ea]"
      // The pin lasts as long as the row's travel, so the scroll speed matches the slide
      style={pinned ? { height: `calc(100svh + ${travel}px)` } : undefined}
    >
      <div className={`${pinned ? 'sticky top-0 h-[100svh] min-h-[600px]' : ''} flex flex-col justify-center overflow-hidden pt-24 pb-10 md:pb-14`}>
        <div className={`${GUTTER} flex items-end justify-between gap-6`}>
          <Rise>
            <h2 className={`${SERIF} text-[34px] md:text-[48px] leading-[1.1]`}>{t('title')}</h2>
          </Rise>
        </div>

        {pinned ? (
          <motion.ul ref={rowRef} style={{ x }} className={`${GUTTER} mt-8 md:mt-10 flex gap-3 md:gap-4 will-change-transform`}>
            {cards}
          </motion.ul>
        ) : (
          <ul ref={rowRef} className={`${GUTTER} mt-8 md:mt-10 flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-px-[18px] md:scroll-px-6 lg:scroll-px-8`}>
            {cards}
          </ul>
        )}

        {/* Progress under the row */}
        {pinned && (
          <div className={`${GUTTER} mt-8`} aria-hidden="true">
            <div className="relative h-[2px] max-w-[420px] bg-[#1a1a17]/12 overflow-hidden rounded-full">
              <motion.div className="absolute inset-y-0 start-0 w-full bg-accent rounded-full" style={{ scaleX: bar, transformOrigin: rtl ? 'right' : 'left' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
