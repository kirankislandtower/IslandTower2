'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { EASE, SERIF } from '@/components/home/ui';

export type GalleryItem = { img: string; title: string; meta: string; href: string };
type Labels = { title: string; past: string; hint: string; view: string; prev: string; next: string };

// The projects hung around the inside of a round room. The section pins and
// scrolling (or dragging, or the arrows) turns the room, so the photographs
// come round the curved wall one after another; the one in front is named
// at the bottom with a link to its case study.
// Panel sizes scale with the screen height (capped), so the wall, its
// labels and the caption under it always fit between the bar and the floor
function sizes(wide: boolean, vh: number) {
  const h = wide ? Math.min(360, Math.round(vh * 0.33)) : Math.min(240, Math.round(vh * 0.28));
  const k = h / (wide ? 375 : 250);
  return wide
    ? { w: Math.round(300 * k), h, gap: Math.round(80 * k), r: Math.round(1350 * k), persp: Math.round(1000 * k) }
    : { w: Math.round(200 * k), h, gap: Math.round(44 * k), r: Math.round(820 * k), persp: Math.round(640 * k) };
}

export default function CurvedGallery({ items, labels }: { items: GalleryItem[]; labels: Labels }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const [view, setView] = useState({ wide: true, vh: 900 });
  useEffect(() => {
    const on = () => setView({ wide: window.innerWidth >= 768, vh: window.innerHeight });
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const s = sizes(view.wide, view.vh);
  const step = (s.w + s.gap) / s.r; // radians between neighbouring panels
  const n = items.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const angle = useTransform(scrollYProgress, (p) => p * (n - 1) * step);
  const ring = useTransform(angle, (a) => `translateZ(${s.r}px) rotateY(${(a * 180) / Math.PI}deg)`);

  const [active, setActive] = useState(0);
  useMotionValueEvent(angle, 'change', (a) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(a / step)));
    if (i !== active) setActive(i);
  });

  // Moves the page so the room turns: by a drag distance or to a panel
  const scrollLength = () => {
    const el = trackRef.current;
    return el ? el.offsetHeight - window.innerHeight : 0;
  };
  const scrollToY = (y: number, immediate = false) => {
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate });
    else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
  };
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + (Math.min(n - 1, Math.max(0, i)) / (n - 1)) * scrollLength());
  };
  const drag = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: window.scrollY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const arcPx = (n - 1) * (s.w + s.gap);
    const k = scrollLength() / arcPx;
    scrollToY(drag.current.y - (e.clientX - drag.current.x) * k, true);
  };
  const onUp = () => { drag.current = null; };

  const current = items[active];

  if (reduce) {
    return (
      <section className="px-[18px] md:px-6 lg:px-8 py-28 md:py-44">
        <h2 className={`${SERIF} text-[30px] md:text-[40px] leading-[1.15]`}>{labels.title}</h2>
        <ul className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {items.map((it) => (
            <li key={it.href} className="shrink-0 snap-start w-[220px]">
              <Link href={it.href} className="block focus-ring">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[6px]">
                  <Image src={it.img} alt={it.title} fill sizes="220px" className="object-cover" />
                </span>
                <span className="mt-3 block text-[15px] font-medium">{it.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section ref={trackRef} className="relative bg-[#f4f3ea]" style={{ height: `${(n - 1) * 26 + 100}svh` }}>
      <div
        className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {/* The floor of the room */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[60%] w-[180vw] h-[90vh] rounded-[50%] bg-[#e7e5da]" aria-hidden="true" />

        {/* The curved wall */}
        <div className="absolute inset-0" style={{ perspective: `${s.persp}px`, perspectiveOrigin: '50% 43%' }}>
          <motion.div className="absolute left-1/2 top-[43%]" style={{ transformStyle: 'preserve-3d', transform: ring }}>
            {items.map((it, i) => (
              <Panel key={it.href + i} item={it} i={i} step={step} angle={angle} s={s} />
            ))}
          </motion.div>
        </div>

        {/* Heading, centred in its own band above the wall */}
        <div className="absolute top-[max(90px,13.5svh)] inset-x-0 px-6 flex justify-center pointer-events-none z-10">
          <h2 className={`${SERIF} text-[26px] md:text-[34px] leading-[1.15] text-center text-balance`}>{labels.title}</h2>
        </div>

        {/* What we are walking past, bottom centre */}
        <div className="absolute inset-x-0 bottom-[84px] md:bottom-10 flex flex-col items-center text-center px-6 pointer-events-none">
          <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#1a1a17]/55">{labels.past}</span>
          <motion.span
            key={current.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`${SERIF} mt-2 text-[22px] md:text-[30px] leading-[1.15] max-w-[26ch] text-balance`}
          >
            {current.title}
          </motion.span>
          <Link href={current.href} className="pointer-events-auto mt-3 text-[12px] font-medium tracking-[0.1em] uppercase border-b border-[#1a1a17]/40 pb-0.5 hover:text-accent hover:border-accent transition-colors focus-ring">
            {labels.view} →
          </Link>
        </div>

        {/* Arrows and the hint, bottom left on every page: the WhatsApp button
            is fixed to the bottom right, in Arabic too */}
        <div className="absolute bottom-6 md:bottom-10 left-[18px] md:left-8 flex flex-col items-start gap-3">
          <div className="flex gap-2">
            <button type="button" onClick={() => goTo(active - 1)} aria-label={labels.prev} className="w-10 h-10 rounded-full border border-[#1a1a17]/20 flex items-center justify-center hover:bg-[#1a1a17] hover:text-[#f4f3ea] transition-colors cursor-pointer focus-ring">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" onClick={() => goTo(active + 1)} aria-label={labels.next} className="w-10 h-10 rounded-full border border-[#1a1a17]/20 flex items-center justify-center hover:bg-[#1a1a17] hover:text-[#f4f3ea] transition-colors cursor-pointer focus-ring">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
          <span className="hidden md:block text-[11px] font-medium tracking-[0.1em] uppercase text-[#1a1a17]/50">{labels.hint}</span>
        </div>
      </div>
    </section>
  );
}

function Panel({
  item, i, step, angle, s,
}: { item: GalleryItem; i: number; step: number; angle: MotionValue<number>; s: { w: number; h: number; r: number } }) {
  // Fade panels out as they swing round towards the viewer's shoulders
  const opacity = useTransform(angle, (a) => {
    const rel = Math.abs(i * step - a);
    return rel < 0.5 ? 1 : rel > 0.72 ? 0 : 1 - (rel - 0.5) / 0.22;
  });
  return (
    <motion.figure
      className="absolute"
      style={{
        width: s.w,
        left: -s.w / 2,
        top: -s.h / 2,
        transform: `rotateY(${(-i * step * 180) / Math.PI}deg) translateZ(${-s.r}px)`,
        opacity,
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="relative w-full bg-white p-2 md:p-2.5 shadow-[0_10px_30px_-12px_rgba(26,26,23,0.35)]" style={{ height: s.h }}>
        <div className="relative w-full h-full overflow-hidden">
          <Image src={item.img} alt={item.title} fill sizes={`${s.w}px`} className="object-cover pointer-events-none" draggable={false} />
        </div>
      </div>
      <figcaption className="mt-3 text-[11px] md:text-[12px] leading-[1.35] text-[#1a1a17]/70">
        <span className="block font-medium text-[#1a1a17]">{item.title}</span>
        {item.meta}
      </figcaption>
    </motion.figure>
  );
}
