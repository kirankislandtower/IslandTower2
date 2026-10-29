'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const logos = [
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

export default function ClientLogos() {
  const t = useTranslations('ClientLogos');

  return (
    <section className="bg-card w-full border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 py-14 md:py-16 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-center">
        <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px]">{t('headline')}</p>
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-12"
        >
          {logos.map((logo) => (
            <li key={logo.file} className="relative h-14 w-28 md:h-16 md:w-32">
              <Image
                src={`/images/clients/${logo.file}.jpg`}
                alt={logo.name}
                fill
                sizes="128px"
                className="object-contain"
              />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
