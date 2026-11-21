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
      <div className="py-12 md:py-14">
        <p className="px-6 mx-auto max-w-[520px] text-center text-muted-foreground text-sm md:text-base leading-relaxed text-balance">{t('headline')}</p>
        {/* Running strip: the list is rendered twice so the loop never shows
            a gap; the copy is hidden from screen readers. Kept LTR in Arabic
            too, since the slide direction is set in the keyframes. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="logo-marquee mt-4 md:mt-6 overflow-hidden min-w-0"
          dir="ltr"
        >
          <div className="logo-marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center gap-x-4 md:gap-x-8 pe-4 md:pe-8"
              >
                {logos.map((logo) => (
                  <li key={logo.file} className="relative h-28 w-28 md:h-36 md:w-36 shrink-0">
                    <Image
                      src={`/images/clients/${logo.file}.jpg`}
                      alt={copy === 1 ? '' : logo.name}
                      fill
                      sizes="144px"
                      className="object-contain"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
