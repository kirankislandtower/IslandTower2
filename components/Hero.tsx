'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const d = (duration: number) => (shouldReduceMotion ? 0 : duration);

  // Pin spacer: gives the shrink-reveal transition scroll room without the
  // browser fighting itself over layout height (sticky + a taller spacer,
  // the standard scroll-driven-pin recipe).
  const pinRef = useRef<HTMLDivElement>(null);
  // 'end end' (not 'end start') so progress 0-1 maps exactly to the sticky
  // frame's true pin duration - with a spacer taller than the viewport,
  // 'end start' overshoots by one viewport height, since the sticky child
  // actually starts releasing once (spacer bottom - viewport height) is
  // reached, not once the spacer's bottom itself reaches the viewport top.
  const { scrollYProgress: pinProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });

  // Hold fully visible for the first ~40% of the pin range, then shrink the
  // video away from the top down, revealing the real What We Do intro
  // sitting behind it at the same screen position.
  const heroHeight = useTransform(pinProgress, [0, 0.4, 0.78], ['100%', '100%', '0%']);
  // Hero's own text/logos live in a separate, non-shrinking overlay so they
  // never reposition with the shrinking video box - they simply crossfade
  // out ahead of the reveal layer crossfading in, avoiding any overlap.
  const heroTextOpacity = useTransform(pinProgress, [0.4, 0.6], [1, 0]);
  const revealOpacity = useTransform(pinProgress, [0.55, 0.8], [0, 1]);
  // Once revealed, immediately fade the whole pinned frame to transparent.
  // Sticky positioning always needs one full viewport-height of extra
  // scroll to release the pin (there's no way to shortcut that in CSS) -
  // during that release the frame is still on-screen sliding away while
  // the real What We Do section slides up from below. Without this fade
  // that produces a visible double-exposure of the same "Our Expertise"
  // text; fading the frame out first means nothing is visible to double up.
  const frameOpacity = useTransform(pinProgress, [0.85, 1], [1, 0]);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);

  // Note: this height must stay the same regardless of shouldReduceMotion -
  // that hook returns null during SSR (no window to read the media query
  // from) and only resolves to true/false after the client mounts, so
  // branching a raw SSR'd style attribute on it causes a server/client
  // hydration mismatch. The shrink-reveal itself is scroll-linked rather
  // than autoplaying, so it's fine to leave running for reduced-motion
  // users too - it only moves in response to the user's own scroll input.
  return (
    <div ref={pinRef} className="relative w-full" style={{ height: '160vh' }}>
      <motion.div
        style={{ opacity: frameOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >

        {/* Reveal layer: the real What We Do intro, sitting behind the hero.
            Top-anchored to match where the real section's content sits once
            unpinned - the video above it recedes from the top down, not the
            bottom up, so the handoff lands at the same screen position. */}
        <motion.div style={{ opacity: revealOpacity }} className="absolute inset-0 bg-background flex items-start">
          <div className="w-full max-w-[1400px] mx-auto px-6 pt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">Our Expertise</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-foreground font-normal tracking-tight leading-[1.1] max-w-4xl">
              Island Tower delivers comprehensive engineering, procurement, and construction services for major projects.
            </h2>
          </div>
        </motion.div>

        {/* Video/background layer: bottom-anchored, recedes from the top
            down as the pin scrolls. Text-free, so its shrinking box never
            has to worry about repositioning readable content. */}
        <motion.section
          ref={sectionRef}
          style={{ height: heroHeight }}
          className="absolute bottom-0 left-0 w-full overflow-hidden bg-[#111]"
        >
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            style={{ y: videoY }}
            className="absolute -top-[60px] left-0 w-full h-[calc(100%+120px)] object-cover opacity-50"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </motion.video>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Top gradient for navbar blending */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#111]/80 to-transparent" />
        </motion.section>

        {/* Hero text overlay: fixed to the full sticky frame regardless of
            the video's shrinking height, so it only ever crossfades - it
            never has to reposition itself as the box beneath it shrinks. */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="absolute inset-0 flex flex-col justify-center pointer-events-none"
        >
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
            >
              <p className="text-white/90 text-sm md:text-base max-w-2xl font-sans font-light leading-relaxed">
                Island Tower Electro Mechanical Works LLC is a leading provider of Infrastructure,<br className="hidden md:block" />
                MEP, and Civil Engineering solutions in Dubai and Saudi Arabia.
              </p>
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
        </motion.div>

      </motion.div>
    </div>
  );
}
