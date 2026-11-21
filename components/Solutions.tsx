'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Five building services laid out like a gallery wall: tall photographs in
// a row, every other one set lower, each with its name and one plain line
// underneath, hung from a thin rule.
const ITEMS = [
  { key: 'item1', photo: '/images/site/rooftop-piping-install.jpg' },
  { key: 'item2', photo: '/images/site/fire-piping-plant-room.jpg' },
  { key: 'item3', photo: '/images/projects/chilled-water-pump-replacement.jpg' },
  { key: 'item4', photo: '/images/projects/fabrication-piping-skid.jpg' },
  { key: 'item5', photo: '/images/projects/tecom-mechanical-room.jpg' },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Solutions() {
  const t = useTranslations('Solutions');
  const reduceMotion = useReducedMotion();

  return (
    <section data-section="mep" className="relative bg-muted py-24 md:py-36 w-full scroll-mt-24 overflow-hidden" id="mep">
      {/* Giant background letterform */}
      <span
        className="pointer-events-none select-none absolute -top-[4vw] -end-[6vw] text-[34vw] leading-none font-medium tracking-[-0.06em] text-foreground/[0.035]"
        aria-hidden="true"
      >
        MEP
      </span>
      <div className="relative px-[22px] md:px-8 lg:px-[6vw]">
        {/* Centred title between two thin rules */}
        <div className="flex items-center gap-6 md:gap-10">
          <span className="hidden md:block flex-1 h-px bg-foreground/15" aria-hidden="true" />
          <motion.h2
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center text-[30px] md:text-[44px] leading-[1.05] font-medium tracking-[-0.01em] text-foreground"
          >
            {t('headline')}
          </motion.h2>
          <span className="hidden md:block flex-1 h-px bg-foreground/15" aria-hidden="true" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-5 text-center text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto"
        >
          {t('description')}
        </motion.p>

        <ul className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 lg:gap-x-5 gap-y-14">
          {ITEMS.map((item, idx) => (
            <motion.li
              key={item.key}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.9, delay: idx * 0.08, ease: EASE }}
              className={idx % 2 === 1 ? 'lg:mt-[110px]' : ''}
            >
              <Link href="/services#mep" className="group block focus-ring">
                <div className="relative aspect-[5/6] overflow-hidden rounded-[6px] bg-card">
                  <Image
                    src={item.photo}
                    alt={t(`${item.key}Ref`)}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                {/* Thin rule dropping from the photo to its caption */}
                <span className="block ms-[18%] w-px h-10 bg-foreground/20" aria-hidden="true" />
                <div className="ps-[18%] pe-2">
                  <h3 className="text-[19px] md:text-[21px] leading-tight tracking-[-0.01em] text-foreground group-hover:text-accent transition-colors">
                    {t(item.key)}
                  </h3>
                  <p className="mt-2 text-[14px] md:text-[15px] leading-snug text-muted-foreground">{t(`${item.key}Desc`)}</p>
                  <p className="mt-3 text-[13px] leading-snug text-foreground/70">{t(`${item.key}Ref`)}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-16 md:mt-20 flex justify-center">
          <Link
            href="/services#mep"
            className="group inline-flex items-center gap-3 h-12 px-7 rounded-full border border-foreground/30 text-foreground text-[15px] font-medium hover:bg-foreground hover:text-background transition-colors focus-ring"
          >
            {t('cta')}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
