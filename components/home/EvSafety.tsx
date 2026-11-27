'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GUTTER, SERIF, Label, Pill, Rise } from './ui';
import GrowText from '@/components/page/GrowText';

// Quality and safety on the dark ground: the statement on the left, how we
// work on the right, then a photograph of our crew beside the four figures.
export default function EvSafety() {
  const t = useTranslations('Home2.safety');

  return (
    <section data-section="safety" className={`bg-[#1d1d1a] text-[#f4f3ea] ${GUTTER} py-28 md:py-48`}>
      <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10">
        <Rise><h2 className={`${SERIF} text-[34px] md:text-[48px] leading-[1.12] max-w-[14ch]`}><GrowText text={t('title')} /></h2></Rise>
        <div className="lg:pt-24">
          <Rise><Label light>{t('label')}</Label></Rise>
          <Rise delay={0.08}>
            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.6] font-medium text-[#f4f3ea]/90 max-w-[46ch]">{t('p1')}</p>
            <p className="mt-5 text-[15px] md:text-[16px] leading-[1.6] font-medium text-[#f4f3ea]/90 max-w-[46ch]">{t('p2')}</p>
            <div className="mt-7"><Pill href="/about" variant="accent">{t('cta')}</Pill></div>
          </Rise>
        </div>
      </div>

      <div className="mt-16 md:mt-24 grid lg:grid-cols-2 gap-10 lg:gap-14 items-end">
        <Rise className="relative aspect-[5/4] overflow-hidden rounded-[10px] bg-black/30">
          <Image src="/images/home/safety-briefing.jpg" alt={t('tag')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <span className="absolute bottom-4 start-4 px-2.5 py-1.5 rounded-[6px] bg-black/40 backdrop-blur-sm text-[10px] font-medium tracking-[0.08em] uppercase text-[#f4f3ea]">
            {t('tag')}
          </span>
        </Rise>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12">
          {(['1', '2', '3', '4'] as const).map((n, i) => (
            <li key={n} className="border-s border-accent/70 ps-5">
              <Rise delay={i * 0.08}>
                <CountUp value={t(`st${n}v`)} className={`${SERIF} block text-[40px] md:text-[48px] leading-none`} />
                <span className="mt-4 block text-[15px] md:text-[16px] font-medium text-[#f4f3ea]/80 max-w-[18ch]">{t(`st${n}l`)}</span>
              </Rise>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Counts the number up once as it comes into view, keeping its format
function CountUp({ value, className }: { value: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const target = Number(value.replace(/[^\d]/g, ''));

  useEffect(() => {
    if (!inView || reduce || !target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 1400);
      const eased = 1 - Math.pow(1 - k, 3);
      const n = Math.round(target * eased);
      setShown(value.replace(/[\d,]+/, n.toLocaleString('en-US')));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, value]);

  return <span ref={ref} className={`${className} tabular-nums`} dir="ltr">{shown}</span>;
}
