'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { GUTTER, Label, Rise } from './ui';

// Clients and approving authorities: a quiet row of marks on the cream
// ground, softened to grey and brought to colour on hover.
const LOGOS = [
  { file: 'empower', name: 'Empower' },
  { file: 'emicool', name: 'Emicool' },
  { file: 'rta', name: 'RTA' },
  { file: 'emaar', name: 'Emaar' },
  { file: 'tabreed', name: 'Tabreed' },
  { file: 'dubai-municipality', name: 'Dubai Municipality' },
  { file: 'nakheel', name: 'Nakheel' },
  { file: 'pdc', name: 'PDC' },
  { file: 'wasl', name: 'Wasl' },
  { file: 'expo-2020-dubai', name: 'Expo 2020 Dubai' },
  { file: 'neom', name: 'NEOM' },
];

export default function EvClients() {
  const t = useTranslations('Home2.clients');
  return (
    <section data-section="clients" className={`bg-[#f4f3ea] ${GUTTER} pb-24 md:pb-36`}>
      <div className="flex flex-col items-center">
        <Rise><Label>{t('label')}</Label></Rise>
        <Rise delay={0.08} className="w-full">
          <ul className="mt-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-x-6 gap-y-6 items-center justify-items-center max-w-[1200px] mx-auto">
            {LOGOS.map((l) => (
              <li key={l.file} className="relative w-[92px] h-[56px] md:w-[104px] md:h-[64px]">
                <Image
                  src={`/images/clients/${l.file}.jpg`}
                  alt={l.name}
                  fill
                  sizes="104px"
                  className="object-contain mix-blend-multiply grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-500"
                />
              </li>
            ))}
          </ul>
        </Rise>
      </div>
    </section>
  );
}
