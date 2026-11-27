'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GUTTER, Label, Rise, SERIF } from './ui';
import GrowText from '@/components/page/GrowText';
import FlowLine from '@/components/page/FlowLine';

// Who we are: one centred statement set large in the light serif, building
// in letter by letter, with a line flowing down round it from the banner, then a row of client
// marks and the line that names them.
const MARKS = ['empower', 'emicool', 'emaar', 'rta'];

export default function EvIntro() {
  const t = useTranslations('Home2.intro');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // The line carries on down from the banner's card, round the statement
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} data-section="who" className={`relative z-10 bg-[#f4f3ea] text-[#1a1a17] ${GUTTER} py-28 md:py-[120px]`}>
      {!reduce && (
        <FlowLine
          d="M50 0 C50 14 88 10 88 34 C88 60 12 46 12 74 C12 92 44 92 50 100"
          progress={draw}
        />
      )}
      <div className="relative z-10 flex flex-col items-center text-center">
        <Rise><Label>{t('label')}</Label></Rise>
        <p className={`${SERIF} mt-8 text-[26px] sm:text-[34px] md:text-[clamp(34px,2.9vw,46px)] leading-[1.1] max-w-[26ch]`}>
          <GrowText text={t('text')} stagger={0.01} />
        </p>
        <Rise delay={0.1} className="mt-12 flex flex-col items-center">
          <div className="flex -space-x-2.5 rtl:space-x-reverse">
            {MARKS.map((m) => (
              <span key={m} className="relative w-11 h-11 rounded-full bg-white ring-[3px] ring-[#f4f3ea] overflow-hidden">
                <Image src={`/images/clients/${m}.jpg`} alt="" fill sizes="44px" className="object-contain scale-[1.15]" />
              </span>
            ))}
            <span className="relative w-11 h-11 rounded-full bg-accent ring-[3px] ring-[#f4f3ea] flex items-center justify-center text-white" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" /></svg>
            </span>
          </div>
          <p className="mt-4 text-[13px] font-medium">{t('trusted')}</p>
        </Rise>
      </div>
    </section>
  );
}
