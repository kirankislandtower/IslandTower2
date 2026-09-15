'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Milestone {
  year: string;
  label: string;
  text: string;
  image: string;
}

interface MilestoneCarouselProps {
  milestones: Milestone[];
}

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 60;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function MilestoneCarousel({ milestones }: MilestoneCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const len = milestones.length;
  const currentIndex = ((step % len) + len) % len;

  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + len) % len;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    let normalized = diff;
    if (diff > len / 2) normalized -= len;
    if (diff < -len / 2) normalized += len;
    if (normalized === 0) return 'active';
    if (normalized === -1) return 'prev';
    if (normalized === 1) return 'next';
    return 'hidden';
  };

  return (
    <div className="relative overflow-hidden rounded-3xl flex flex-col lg:flex-row min-h-[560px] border border-border shadow-sm">
      {/* Chip list */}
      <div className="w-full lg:w-[36%] min-h-[440px] lg:h-auto relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-12 py-14 bg-card">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-card via-card/80 to-transparent z-40" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card via-card/80 to-transparent z-40" />
        <div className="relative w-full h-[420px] flex items-center justify-start z-20">
          {milestones.map((m, index) => {
            const isActive = index === currentIndex;
            const distance = wrap(-(len / 2), len / 2, index - currentIndex);

            return (
              <motion.div
                key={m.year + index}
                style={{ height: ITEM_HEIGHT, width: '100%' }}
                animate={{
                  y: distance * ITEM_HEIGHT,
                  opacity: 1 - Math.abs(distance) * 0.22,
                }}
                transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 1 }}
                className="absolute flex items-center justify-start"
              >
                <button
                  onClick={() => handleChipClick(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`relative flex items-center gap-4 px-6 py-3.5 rounded-full transition-all duration-500 text-left w-full border focus-ring ${
                    isActive
                      ? 'bg-accent text-on-accent border-accent z-10'
                      : 'bg-transparent text-muted-foreground border-border hover:border-accent/40 hover:text-foreground'
                  }`}
                >
                  <span className={`font-mono text-sm tracking-widest shrink-0 ${isActive ? 'text-on-accent' : 'text-muted-foreground/60'}`}>
                    {m.year}
                  </span>
                  <span className="font-normal text-sm tracking-tight leading-snug line-clamp-1">
                    {m.label}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Image + description */}
      <div className="flex-1 min-h-[420px] relative bg-card flex items-center justify-center py-14 px-6 md:px-10 overflow-hidden border-t lg:border-t-0 lg:border-s border-border">
        <div className="relative w-full max-w-[440px] aspect-[4/5] flex items-center justify-center">
          {milestones.map((m, index) => {
            const status = getCardStatus(index);
            const isActive = status === 'active';
            const isPrev = status === 'prev';
            const isNext = status === 'next';

            return (
              <motion.div
                key={m.year + index}
                initial={false}
                animate={{
                  x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                  scale: isActive ? 1 : isPrev || isNext ? 0.86 : 0.7,
                  opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                  rotate: isPrev ? -3 : isNext ? 3 : 0,
                  zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
                className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-background bg-background origin-center shadow-2xl"
              >
                <img
                  src={m.image}
                  alt={`${m.year} — ${m.text}`}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isActive ? 'grayscale-0 blur-0' : 'grayscale blur-[2px] brightness-75'
                  }`}
                />

                {isActive && (
                  <span className="absolute top-4 end-4 font-mono text-white text-xs tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {String(index + 1).padStart(2, '0')} / {String(len).padStart(2, '0')}
                  </span>
                )}

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                    >
                      <div className="bg-accent text-on-accent px-3 py-1 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase w-fit shadow-lg mb-3">
                        {m.year}
                      </div>
                      <p className="text-white font-normal text-lg md:text-xl leading-snug drop-shadow-md tracking-tight">
                        {m.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
