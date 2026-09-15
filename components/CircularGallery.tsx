'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export interface CircularGalleryItem {
  slug: string;
  image: string;
  title: string;
  category: string;
  location: string;
}

interface CircularGalleryProps {
  items: CircularGalleryItem[];
  activeIndex: number;
}

const RADIUS = 460;

export default function CircularGallery({ items, activeIndex }: CircularGalleryProps) {
  const t = useTranslations('Projects');
  const anglePerItem = 360 / items.length;
  const rotation = -activeIndex * anglePerItem;

  return (
    <div
      className="relative mx-auto hidden h-[460px] w-full max-w-[1100px] lg:block"
      style={{ perspective: '1800px' }}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;
          const relative = (((itemAngle + rotation) % 360) + 360) % 360;
          const normalized = relative > 180 ? 360 - relative : relative;
          const isActive = normalized < anglePerItem / 2;
          // Fade fully out well before 90deg so the CSS-mirrored backface of a
          // rotated card is never actually visible to the viewer.
          const visible = normalized < 95;
          const opacity = visible ? Math.max(0, 1 - normalized / 95) : 0;
          const scale = isActive ? 1 : 0.86;

          return (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className="absolute left-1/2 top-1/2 -ml-[135px] -mt-[190px] block h-[380px] w-[270px] rounded-2xl focus-ring [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${RADIUS}px) scale(${scale})`,
                opacity,
                transition: 'opacity 0.6s ease, transform 0.7s ease',
                pointerEvents: isActive ? 'auto' : 'none',
                visibility: visible ? 'visible' : 'hidden',
              }}
            >
              <div className="group relative h-full w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl mb-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 start-4 font-mono text-white text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    0{i + 1}
                  </span>
                </div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{item.category}</span>
                <h3 className="text-lg text-foreground font-normal tracking-tight mt-2 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
                  {item.location}
                </p>
                {isActive && (
                  <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground group-hover:text-accent transition-colors">
                    {t('viewCaseStudy')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
