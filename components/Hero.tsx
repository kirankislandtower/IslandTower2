'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface HeroProps {
  onDemoClick: () => void;
}

export default function Hero({ onDemoClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const d = (duration: number) => (shouldReduceMotion ? 0 : duration);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[#111]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Top gradient for navbar blending */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#111]/80 to-transparent" />

      {/* Smooth glass blur fade at the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] backdrop-blur-xl pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' 
        }}
      />

      {/* Solid color fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#111] via-[#111]/60 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d(1), ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.2 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-20"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-mono uppercase tracking-tight">
            Excellence in Electro-Mechanical Engineering
          </h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: d(1), delay: shouldReduceMotion ? 0 : 0.8, ease: "easeInOut" }}
          className="w-full h-[1px] bg-white/40 my-6 origin-left"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: d(1), delay: shouldReduceMotion ? 0 : 1.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <p className="text-white/90 text-sm md:text-base max-w-2xl font-sans font-light leading-relaxed">
            Island Tower Electro Mechanical Works LLC is a leading provider of Infrastructure,<br className="hidden md:block" />
            MEP, and Civil Engineering solutions in Dubai and Saudi Arabia.
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-white/80 font-mono text-sm tracking-widest">
              25.2048°N 55.2708°E
            </div>
            <button
              onClick={onDemoClick}
              className="bg-accent text-on-accent hover:bg-accent/90 transition-colors px-6 py-3 rounded-[6px] text-xs font-mono font-medium tracking-widest uppercase cursor-pointer focus-ring whitespace-nowrap"
            >
              Get a Quote
            </button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d(1), delay: shouldReduceMotion ? 0 : 1.5, ease: "easeOut" }}
        className="absolute bottom-10 left-0 right-0 z-10 w-full max-w-6xl mx-auto px-6"
      >
        <div className="flex flex-wrap justify-between items-center opacity-70 gap-6 md:gap-8">
          {/* EMPOWER */}
          <div className="flex flex-col items-center">
            <span className="text-white text-lg font-bold tracking-widest uppercase">Empower</span>
            <span className="text-white/70 text-[10px] tracking-widest uppercase mt-1">Energy Solutions</span>
          </div>

          {/* EMICOOL */}
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <span className="text-white text-xl font-black italic tracking-widest uppercase">Emicool</span>
          </div>

          {/* RTA */}
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center relative overflow-hidden">
            <span className="text-black text-xl font-black italic z-10 relative top-1">RTA</span>
            <div className="absolute top-1/2 left-0 right-0 h-4 bg-black/10 -rotate-12 translate-y-[-50%]"></div>
          </div>

          {/* EMAAR */}
          <div className="text-white text-2xl font-serif tracking-widest uppercase">
            EMAAR
          </div>

          {/* DUBAI MUNICIPALITY */}
          <div className="flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="mb-1"><path d="M12 2L2 22h20L12 2z"/></svg>
            <span className="text-white text-sm font-semibold tracking-wide">Dubai Municipality</span>
          </div>

          {/* NAKHEEL */}
          <div className="flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4"/></svg>
            <span className="text-white text-lg font-bold tracking-widest uppercase mt-1">Nakheel</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
