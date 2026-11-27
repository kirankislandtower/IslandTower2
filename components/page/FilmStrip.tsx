'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

export type Frame = { src: string; caption: string; wide?: boolean };

// A strip of site photographs, one height, top-aligned, each with a numbered
// caption under a thin rule. As the page moves the strip slides sideways the
// exact distance needed to bring the last frame in, and each photograph
// drifts a little inside its frame the other way, for depth.
export default function FilmStrip({ frames, dir = 'ltr' }: { frames: Frame[]; dir?: 'ltr' | 'rtl' }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!row.current || !wrap.current) return;
      setTravel(Math.max(0, row.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // The strip pins for exactly as long as it takes to slide the last frame
  // in, then the page carries on down
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const sign = dir === 'rtl' ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : sign * travel]);
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%']);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={wrap} className="relative" style={{ height: reduce ? 'auto' : `calc(100svh + ${travel}px)` }}>
      <div className={reduce ? 'overflow-x-auto' : 'sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden pt-[72px] md:pt-[88px]'}>
      <motion.div ref={row} style={{ x }} className="flex gap-3 md:gap-5 w-max px-[18px] md:px-6 lg:px-8">
        {frames.map((f, i) => (
          <FrameCard key={f.src} frame={f} i={i} drift={drift} />
        ))}
      </motion.div>
      <div className="mx-[18px] md:mx-6 lg:mx-8 mt-8 md:mt-10 h-px bg-[#f4f3ea]/15 overflow-hidden">
        <motion.div className="h-full bg-[#f4f3ea]/70 origin-left rtl:origin-right" style={{ scaleX: bar }} />
      </div>
      </div>
    </div>
  );
}

function FrameCard({ frame, i, drift }: { frame: Frame; i: number; drift: MotionValue<string> }) {
  return (
    <figure className={`shrink-0 ${frame.wide ? 'w-[82vw] sm:w-[60vw] md:w-[44vw] lg:w-[36vw]' : 'w-[62vw] sm:w-[42vw] md:w-[28vw] lg:w-[23vw]'}`}>
      <div className="relative h-[50svh] md:h-[56svh] max-h-[560px] min-h-[300px] overflow-hidden rounded-[10px] bg-[#f4f3ea]/5">
        <motion.div className="absolute inset-y-0 -inset-x-[8%]" style={{ x: drift }}>
          <Image src={frame.src} alt={frame.caption} fill sizes="(min-width: 768px) 36vw, 82vw" className="object-cover" />
        </motion.div>
      </div>
      <figcaption className="mt-4 flex items-baseline gap-3 border-t border-[#f4f3ea]/15 pt-3 text-[13px] md:text-[14px] font-medium">
        <span className="tabular-nums text-[#f4f3ea]/45" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
        <span className="text-[#f4f3ea]/85">{frame.caption}</span>
      </figcaption>
    </figure>
  );
}
