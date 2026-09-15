'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const logos = [
  { file: 'empower', name: 'Empower' },
  { file: 'rta', name: 'RTA' },
  { file: 'emaar', name: 'Emaar' },
  { file: 'dubai-municipality', name: 'Dubai Municipality' },
  { file: 'nakheel', name: 'Nakheel' },
  { file: 'tabreed', name: 'Tabreed' },
  { file: 'emicool', name: 'Emicool' },
  { file: 'pdc', name: 'PDC' },
  { file: 'wasl', name: 'Wasl' },
  { file: 'expo-2020-dubai', name: 'Expo 2020 Dubai' },
  { file: 'neom', name: 'NEOM' },
];

export default function ClientLogos() {
  const t = useTranslations('ClientLogos');

  return (
    <section className="bg-background py-20 md:py-24 w-full border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('eyebrow')}</span>
          </div>
          <h2 className="text-2xl md:text-3xl text-foreground font-normal tracking-tight">
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 md:gap-10 items-center">
          {logos.map((logo, idx) => (
            <motion.div
              key={logo.file}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.4, delay: (idx % 6) * 0.05, ease: 'easeOut' }}
              className="flex items-center justify-center h-24"
            >
              <img
                src={`/images/clients/${logo.file}.jpg`}
                alt={logo.name}
                className="max-h-20 max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
