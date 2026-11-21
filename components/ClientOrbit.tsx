'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Clients and approving authorities on one turn of a spiral around a very
// large line. The section holds while the spiral turns; each circle is dark
// grey at the top of its swing and comes up to white at the bottom.

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

// Where the spiral starts (top left) and how far round it runs
const START = -125;
const SWEEP = 360;

export default function ClientOrbit() {
  const t = useTranslations('ClientLogos');
  const reduceMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const progress = useTransform(raw, (v) => v);
  const spin = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [-40, 40]);
  const counter = useTransform(spin, (v) => -v);

  return (
    <section data-section="clients" aria-labelledby="client-orbit-heading" className="bg-black text-white">
      <div ref={ref} className="relative" style={{ height: '220vh' }}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          {/* The spiral, its lower edge running off the screen */}
          <div className="absolute left-1/2 top-[57%] w-[min(100vw,112vh)] lg:w-[min(60vw,100vh)] aspect-square -translate-x-1/2 -translate-y-1/2">
            <motion.ul className="absolute inset-0" style={{ rotate: spin }} aria-label={t('headline')}>
              {LOGOS.map((logo, i) => (
                <Badge key={logo.file} logo={logo} i={i} spin={spin} counter={counter} />
              ))}
            </motion.ul>
          </div>

          {/* The line: very large, a narrow column of short lines. Difference
              blending turns it dark where it crosses a white circle. */}
          <div className="absolute inset-0 flex items-center justify-center px-4 pt-10 pointer-events-none">
            <h2
              id="client-orbit-heading"
              className="text-center mix-blend-difference text-white text-[8vw] sm:text-[5.6vw] lg:text-[3.9vw] leading-[0.9] font-medium tracking-[-0.01em] max-w-[12ch] text-balance"
            >
              {t('orbitHeadline')}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ logo, i, spin, counter }: { logo: (typeof LOGOS)[number]; i: number; spin: MotionValue<number>; counter: MotionValue<number> }) {
  // One turn of a spiral: further round, a little further out, a little larger
  const f = i / (LOGOS.length - 1);
  // Evenly round the full circle, so there is no empty stretch
  const base = START + (i / LOGOS.length) * SWEEP;
  const r = 42 + f * 4;
  const rad = (base * Math.PI) / 180;
  const left = 50 + r * Math.cos(rad);
  const top = 50 + r * Math.sin(rad);
  const size = 0.78 + f * 0.3;

  // Dark grey near the top of the swing, white at the bottom right
  const shade = useTransform(spin, (s) => {
    const a = ((base + s - 25) * Math.PI) / 180;
    const light = (1 + Math.sin(a)) / 2;
    return 0.86 * (1 - light);
  });

  return (
    <li className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%`, top: `${top}%` }}>
      <motion.div
        style={{ rotate: counter, scale: size }}
        className="group relative w-[66px] h-[66px] sm:w-[104px] sm:h-[104px] lg:w-[132px] lg:h-[132px] rounded-full bg-white overflow-hidden"
      >
        <Image
          src={`/images/clients/${logo.file}.jpg`}
          alt={logo.name}
          fill
          sizes="160px"
          className="object-contain scale-[0.92] grayscale contrast-125 transition-[filter] duration-500 group-hover:grayscale-0"
        />
        {/* Dims the whole circle, logo and all, by its place on the spiral */}
        <motion.span className="absolute inset-0 bg-black transition-opacity group-hover:!opacity-0" style={{ opacity: shade }} aria-hidden="true" />
      </motion.div>
    </li>
  );
}
