'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  const shouldReduceMotion = useReducedMotion();
  const d = (duration: number) => (shouldReduceMotion ? 0 : duration);

  // Slide cycling
  const slides = [
    { title: t('title'), subtitle: t('subtitle') },
    { title: t('slide2Title'), subtitle: t('slide2Subtitle') },
    { title: t('slide3Title'), subtitle: t('slide3Subtitle') },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, slides.length]);

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
  // out before the reveal layer starts crossfading in. These ranges must
  // not overlap (0.4-0.6 vs 0.6-0.85): with the reveal layer's tall
  // multi-line heading spanning much of the same vertical band as the
  // hero's own centered headline, any shared progress window where both
  // are simultaneously above 0 opacity produces a visible double-exposure
  // ghosting effect - the outgoing headline/logos show through the
  // incoming text. Ending one exactly where the other begins keeps the
  // handoff a clean sequential fade instead of a cross-fade.
  const heroTextOpacity = useTransform(pinProgress, [0.4, 0.6], [1, 0]);
  const revealOpacity = useTransform(pinProgress, [0.6, 0.85], [0, 1]);
  // Once revealed, fade the whole pinned frame to transparent right before
  // release. Sticky positioning always needs one full viewport-height of
  // extra scroll to release the pin (there's no way to shortcut that in
  // CSS) - during that release the frame is still on-screen sliding away
  // while the real What We Do section slides up from below. Without this
  // fade that produces a visible double-exposure of the same "Our
  // Expertise" text; fading the frame out first means nothing is visible
  // to double up. Held off until 0.95 (not 0.85) so the frame stays solid
  // for as much of the pin as possible, shrinking the blank stretch between
  // the frame disappearing and the real section scrolling into view -
  // that stretch is fixed at one viewport height by CSS sticky regardless,
  // but starting the fade later means less of it is spent looking blank
  // before release even begins.
  const frameOpacity = useTransform(pinProgress, [0.95, 1], [1, 0]);

  // Defensive belt-and-suspenders on top of heroTextOpacity: on this
  // project's framer-motion version, derived useTransform values driven by
  // rapid scroll updates were observed to occasionally settle on a stale
  // intermediate reading well past where they should be fully clamped to 0
  // (reproduced directly via getComputedStyle against the DOM, independent
  // of any test-harness artifact) - which reads as the outgoing headline
  // and client-logo row faintly ghosting through the incoming content.
  // Actually unmounting the hero text past the fade-out point removes any
  // possibility of that, regardless of what the opacity transform reports.
  const [showHeroText, setShowHeroText] = useState(true);
  useMotionValueEvent(pinProgress, 'change', (v) => {
    if (v > 0.62 && showHeroText) setShowHeroText(false);
    else if (v < 0.58 && !showHeroText) setShowHeroText(true);
  });

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
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
      >

        {/* Reveal layer: the real What We Do intro, sitting behind the hero.
            Vertically centered in the frame. */}
        <motion.div style={{ opacity: revealOpacity }} className="absolute inset-0 bg-background flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('eyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-foreground font-normal tracking-tight leading-[1.1] max-w-4xl">
              {t('revealHeadline')}
            </h2>
          </div>
        </motion.div>

        {/* Video/background layer: top-anchored, recedes bottom-up as the
            pin scrolls. Text-free, so its shrinking box never has to worry
            about repositioning readable content. */}
        <motion.section
          ref={sectionRef}
          style={{ height: heroHeight }}
          className="absolute top-0 left-0 w-full overflow-hidden bg-[#111]"
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
            never has to reposition itself as the box beneath it shrinks.
            Conditionally rendered (see showHeroText above) so it's fully
            removed from the DOM once faded out, not just transparent. */}
        {showHeroText && (
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Centered title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeSlide}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/80 font-sans font-thin uppercase leading-[1.1] max-w-4xl mx-auto"
                  style={{ wordSpacing: '0.3em' }}
                >
                  {slides[activeSlide].title}
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom subtitle + slide dots */}
          <div className="absolute bottom-12 md:bottom-20 w-full px-6 flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="text-white/90 text-base md:text-lg lg:text-xl max-w-3xl text-center font-sans font-light leading-relaxed"
              >
                {slides[activeSlide].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Slide indicator dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`pointer-events-auto transition-all duration-500 rounded-full ${
                    i === activeSlide
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        )}

      </motion.div>
    </div>
  );
}

