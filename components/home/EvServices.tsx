'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUTTER, Rise, ArrowCircle } from './ui';

// What we do: the three services as tall photo cards, label and title in
// the top corner, an arrow in the bottom corner.
const CARDS = [
  { k: 's1', href: '/services#district-cooling', img: '/images/site/large-diameter-pipe-install.jpg' },
  { k: 's2', href: '/services#mep', img: '/images/site/fire-piping-plant-room.jpg' },
  { k: 's3', href: '/industries/infrastructure', img: '/images/projects/shindagha-pipe-trench-shoring.jpg' },
] as const;

export default function EvServices() {
  const t = useTranslations('Home2.services');
  return (
    <section data-section="services" className={`bg-[#f4f3ea] ${GUTTER} pb-24 md:pb-32`}>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {CARDS.map((c, i) => (
          <li key={c.k}>
            <Rise delay={i * 0.08}>
              <Link href={c.href} className="group relative block aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-[10px] bg-[#1a1a17] text-[#f4f3ea] focus-ring">
                <Image src={c.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/45" aria-hidden="true" />
                <div className="absolute top-0 inset-x-0 p-5 md:p-6">
                  <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] uppercase text-[#f4f3ea]/70">
                    <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
                    {t(`${c.k}Label`)}
                  </span>
                  <h3 className="mt-2 text-[22px] md:text-[24px] leading-tight font-medium">{t(`${c.k}Title`)}</h3>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 flex items-end justify-between gap-6">
                  <p className="text-[14px] leading-snug text-[#f4f3ea]/85 max-w-[30ch] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 max-md:opacity-100 max-md:translate-y-0">
                    {t(`${c.k}Text`)}
                  </p>
                  <ArrowCircle className="shrink-0 bg-white/15 backdrop-blur-sm text-white group-hover:bg-accent transition-colors" />
                </div>
              </Link>
            </Rise>
          </li>
        ))}
      </ul>
    </section>
  );
}
