'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { LIGHT } from '@/components/page/GrowText';

export type ServiceItem = { title: string; desc: string; img: string };

const OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The district cooling services as a numbered index on hairlines. A framed
// photograph stays beside the list (it sticks while the list passes) and
// shows the row under the pointer: the new photo fades in
// as it settles from a slight zoom. Every description is always visible;
// on phones each row carries its own photograph instead.
export default function ServiceIndex({ items }: { items: ServiceItem[] }) {
  const reduce = useReducedMotion();
  const [on, setOn] = useState(0);

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
      {/* The frame, beside the list on wide screens */}
      <div className="hidden lg:block lg:col-span-5">
        <div className="sticky top-28 aspect-[44/52] max-h-[70svh] rounded-[16px] bg-[#1a1a17]/[0.06] p-[13px]">
          <div className="relative w-full h-full overflow-hidden rounded-[4px] bg-[#1a1a17]/10">
            {items.map((s, i) => (
              <motion.div
                key={s.img}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === on ? 1 : 0, scale: reduce ? 1 : i === on ? 1.01 : 1.1 }}
                transition={{ opacity: { duration: 0.5, ease: 'easeInOut' }, scale: { duration: 1, ease: OUT } }}
                style={{ zIndex: i === on ? 2 : 1 }}
              >
                <Image src={s.img} alt={i === on ? s.title : ''} fill sizes="(min-width: 1024px) 38vw, 1px" className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* The list */}
      <ol className="lg:col-span-7 border-b border-[#1a1a17]/15">
        {items.map((s, i) => {
          const active = i === on;
          return (
            <li
              key={s.title}
              onMouseEnter={() => setOn(i)}
              className="group relative border-t border-[#1a1a17]/15 py-7 md:py-9"
            >
              <div className="lg:hidden relative aspect-[16/10] mb-5 overflow-hidden rounded-[10px]">
                <Image src={s.img} alt={s.title} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr] gap-x-2">
                <span className={`pt-2 font-mono text-[12px] md:text-[13px] tabular-nums transition-colors duration-300 ${active ? 'text-accent' : 'text-[#1a1a17]/45'}`} dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className={`${LIGHT} text-[28px] md:text-[clamp(30px,2.6vw,42px)] leading-[1.02] transition-colors duration-300 ${active ? 'text-[#1a1a17]' : 'text-[#1a1a17]/80'}`}>
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] md:text-[16px] leading-[1.6] font-medium text-[#1a1a17]/70 max-w-[56ch]">{s.desc}</p>
                </div>
              </div>
              {/* A short accent rule draws along the top of the active row */}
              <span
                className={`absolute top-[-1px] start-0 h-px bg-accent origin-left rtl:origin-right transition-transform duration-700 ease-out ${active ? 'scale-x-100' : 'scale-x-0'} w-full`}
                aria-hidden="true"
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
