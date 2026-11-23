'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { EASE, Label, SERIF } from '@/components/home/ui';

export type Step = { title: string; desc: string; img: string };

// The values as a pinned walk-through: the section holds still while the
// page scrolls, the list steps down one value at a time (the current one in
// full ink with its explanation open, the rest faint), and the photograph
// beside it changes to match.
export default function ValuesStepper({ label, title, steps }: { label: string; title: string; steps: Step[] }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
    if (i !== active) setActive(i);
  });

  if (reduce) {
    return (
      <section className="px-[18px] md:px-6 lg:px-8 py-24 md:py-32">
        <Label>{label}</Label>
        <h2 className={`${SERIF} mt-6 text-[30px] md:text-[40px] leading-[1.15]`}>{title}</h2>
        <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-7">
          {steps.map((s) => (
            <li key={s.title}>
              <h3 className="text-[16px] font-semibold">{s.title}</h3>
              <p className="mt-1 text-[15px] leading-[1.55] font-medium text-[#1a1a17]/70">{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section ref={trackRef} className="relative" style={{ height: `${steps.length * 60 + 40}svh` }}>
      <div className="sticky top-0 h-[100svh] min-h-[640px] px-[18px] md:px-6 lg:px-8 pt-[88px] md:pt-[104px] pb-6 md:pb-8 grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-2 gap-6 lg:gap-14">
        {/* The list */}
        <div className="flex flex-col lg:justify-center order-2 lg:order-1">
          <Label>{label}</Label>
          <h2 className={`${SERIF} mt-4 md:mt-6 text-[28px] md:text-[40px] leading-[1.15]`}>{title}</h2>
          <ol className="mt-6 md:mt-10">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title} className="border-t border-[#1a1a17]/12 last:border-b">
                  <div className={`flex items-baseline gap-4 py-2.5 md:py-3.5 transition-colors duration-500 ${on ? 'text-[#1a1a17]' : 'text-[#1a1a17]/30'}`}>
                    <span className="text-[12px] font-medium tabular-nums" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[18px] md:text-[22px] font-medium tracking-[-0.01em]">{s.title}</h3>
                  </div>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        key="d"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden ps-8 md:ps-9 text-[14px] md:text-[15px] leading-[1.55] font-medium text-[#1a1a17]/70 max-w-[48ch]"
                      >
                        <span className="block pb-3 md:pb-4">{s.desc}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>

        {/* The photograph for the current value */}
        <div className="relative order-1 lg:order-2 min-h-[22svh] lg:min-h-0 overflow-hidden rounded-[10px] bg-[#1a1a17]/10">
          {steps.map((s, i) => (
            <motion.div
              key={s.img}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
              transition={{ duration: 0.8, ease: EASE }}
              aria-hidden={i !== active}
            >
              <Image src={s.img} alt={i === active ? s.title : ''} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          ))}
          <span className="absolute bottom-4 end-4 px-2.5 py-1 rounded-full bg-black/40 text-white text-[12px] font-medium tabular-nums" dir="ltr">
            {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
