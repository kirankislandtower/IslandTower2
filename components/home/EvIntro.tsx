'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { GUTTER, Label, Rise } from './ui';

// Who we are: one centred statement in plain sans, then a row of client
// marks and the line that names them.
const MARKS = ['empower', 'emicool', 'emaar', 'rta'];

export default function EvIntro() {
  const t = useTranslations('Home2.intro');

  return (
    <section data-section="who" className={`relative z-10 bg-[#f4f3ea] text-[#1a1a17] ${GUTTER} py-24 md:py-[120px]`}>
      <div className="flex flex-col items-center text-center">
        <Rise><Label>{t('label')}</Label></Rise>
        <Rise delay={0.06}>
          <p className="mt-7 text-[22px] sm:text-[24px] md:text-[28px] leading-[1.22] font-medium tracking-[-0.02em] max-w-[620px]">
            {t('text')}
          </p>
        </Rise>
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
