'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export interface Capability {
  title: string;
  description: string;
  image: string;
}

interface CapabilitiesCarouselProps {
  capabilities: Capability[];
}

export default function CapabilitiesCarousel({ capabilities }: CapabilitiesCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !containerRef.current) return;
      setScrollDistance(Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [capabilities.length]);

  // Pin spacer: same recipe as Hero's shrink-reveal — a sticky frame plus a
  // taller spacer gives the horizontal translation scroll room to play out,
  // driven by ordinary vertical scrolling instead of a manual drag/swipe.
  const { scrollYProgress: pinProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const x = useTransform(pinProgress, [0, 1], [0, -scrollDistance]);

  useMotionValueEvent(pinProgress, 'change', (v) => {
    const next = Math.min(capabilities.length - 1, Math.max(0, Math.round(v * (capabilities.length - 1))));
    setActiveIndex(next);
  });

  if (shouldReduceMotion) {
    return (
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {capabilities.map((capability, idx) => (
          <CapabilityCard key={capability.title} capability={capability} idx={idx} className="snap-start shrink-0 w-[82%] sm:w-[60%] lg:w-[38%]" />
        ))}
      </div>
    );
  }

  return (
    <div ref={pinRef} className="relative" style={{ height: '220vh' }}>
      <div className="sticky top-24">
        <div className="flex justify-end mb-4">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            {String(activeIndex + 1).padStart(2, '0')} / {String(capabilities.length).padStart(2, '0')}
          </span>
        </div>
        <div ref={containerRef} className="overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 w-max">
            {capabilities.map((capability, idx) => (
              <CapabilityCard key={capability.title} capability={capability} idx={idx} className="w-[82vw] sm:w-[55vw] lg:w-[36vw]" />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CapabilityCard({ capability, idx, className }: { capability: Capability; idx: number; className: string }) {
  return (
    <div className={`shrink-0 ${className}`}>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-5">
        <img src={capability.image} alt={capability.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute top-4 start-4 font-mono text-white text-xs tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
          0{idx + 1}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-lg md:text-xl text-white font-normal tracking-tight">{capability.title}</h3>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{capability.description}</p>
    </div>
  );
}
