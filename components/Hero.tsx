'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import RevealText from './RevealText';

const DISCIPLINES = [
  { key: 'cooling', href: '/services#district-cooling' },
  { key: 'mep', href: '/services#mep' },
  { key: 'infra', href: '/industries/infrastructure' },
] as const;

export default function Hero({ onQuoteClick }: { onQuoteClick: () => void }) {
  const t = useTranslations('Hero');
  const shouldReduceMotion = useReducedMotion();

  // Pin spacer: gives the shrink-reveal transition scroll room without the
  // browser fighting itself over layout height (sticky + a taller spacer,
  // the standard scroll-driven-pin recipe).
  const pinRef = useRef<HTMLDivElement>(null);
  // 'end end' (not 'end start') so progress 0-1 maps exactly to the sticky
  // frame's true pin duration - with a spacer taller than the viewport,
  // 'end start' overshoots by one viewport height, since the sticky child
  // actually starts releasing once (spacer bottom - viewport height) is
  // reached, not once the spacer's bottom itself reaches the viewport top.
  const { scrollYProgress: rawPinProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  // Function pass-through keeps framer-motion computing these transforms
  // itself; its native ScrollTimeline path mistimed the reveal fade.
  const pinProgress = useTransform(rawPinProgress, (v) => v);

  // The What we do panel rises over the still video like a dome (Sobha
  // style): narrow and round-topped as it enters, widening and flattening
  // until it fills the frame.
  const heroTextY = useTransform(pinProgress, [0, 0.4], ['0vh', '-100vh']);
  const DOME_AT = [0.3, 0.55, 0.8];
  const domeTop = useTransform(pinProgress, DOME_AT, [100, 42, 0]);
  const domeSide = useTransform(pinProgress, DOME_AT, [16, 9, 0]);
  const domeRound = useTransform(pinProgress, DOME_AT, [42, 30, 0]);
  const domeClip = useTransform([domeTop, domeSide, domeRound], ([t, sd, r]) =>
    `inset(${t}% ${sd}% 0% ${sd}% round ${r}vw ${r}vw 0px 0px)`,
  );
  // The panel's content rides up with it, then settles
  const domeContentY = useTransform(pinProgress, DOME_AT, ['34vh', '12vh', '0vh']);
  // Text stays inside the dome's curved edges while it is narrow
  const domePad = useTransform(domeSide, (sd) => `calc(${(sd * 1.35).toFixed(2)}vw + 32px)`);
  // The video sinks back a little as it is covered
  const videoDim = useTransform(pinProgress, [0.3, 0.8], [1, 0.55]);
  // The revealed What we do frame stays solid and scrolls away with the
  // pin, so the proof strip follows straight after it with no blank gap.

  // Unmount the hero text once it has scrolled out, so a stale transform
  // reading can never leave it showing over the reveal layer.
  const [showHeroText, setShowHeroText] = useState(true);
  useMotionValueEvent(pinProgress, 'change', (v) => {
    if (v > 0.42 && showHeroText) setShowHeroText(false);
    else if (v < 0.38 && !showHeroText) setShowHeroText(true);
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
    // Taller spacer than the pin strictly needs to release (160vh) so the
    // same 0-1 scroll-linked progress is spread over more physical scroll
    // distance - the shrink/reveal plays out at a gentler pace per pixel
    // scrolled instead of rushing through on a quick flick.
    <div ref={pinRef} data-section={showHeroText ? 'home' : 'whatwedo'} className="relative w-full" style={{ height: '220vh' }}>
      <motion.div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* Video/background layer: top-anchored, recedes bottom-up as the
            pin scrolls. Text-free, so its shrinking box never has to worry
            about repositioning readable content. */}
        <motion.section
          ref={sectionRef}
          style={{ opacity: videoDim }}
          className="absolute inset-0 w-full overflow-hidden bg-[#111]"
        >
          <motion.video
            poster="/hero-welding-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            style={{ y: videoY }}
            className="absolute -top-[60px] left-0 w-full h-[calc(100%+120px)] object-cover object-[70%_50%] opacity-50"
          >
            <source src="/hero-welding.mp4" type="video/mp4" />
          </motion.video>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Bottom-up shade so the left-aligned headline reads over any frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111]/85 via-[#111]/20 to-transparent" />

          {/* Top gradient for navbar blending */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#111]/80 to-transparent" />
        </motion.section>

        {/* Reveal layer: the real What We Do intro, rising over the video as a
            dome. Vertically centered in the frame once it fills it. */}
        <motion.div
          style={{ clipPath: domeClip }}
          className="absolute inset-0 z-[1] bg-background flex items-center"
        >
          <motion.div className="w-full px-[22px] md:px-8" style={shouldReduceMotion ? undefined : { y: domeContentY, paddingLeft: domePad, paddingRight: domePad }}>
            <span className="font-mono text-[14px] leading-[1.25] tracking-[0.09em] uppercase text-muted-foreground">{t('eyebrow')}</span>
            <h2 className="mt-6 text-[34px] md:text-[56px] leading-[1.02] text-foreground font-medium tracking-[-0.01em] max-w-[22ch]">
              {t('revealHeadline')}
            </h2>
            <ul className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6 border-t border-foreground/80 pt-5" aria-label={t('disciplinesLabel')}>
              {DISCIPLINES.map((d) => (
                <li key={d.key}>
                  <Link href={d.href} className="group block focus-ring">
                    <span className="block font-mono text-[14px] leading-[1.25] tracking-[0.09em] uppercase text-foreground group-hover:text-accent transition-colors">
                      {t(`${d.key}Name`)} <span className="inline-block rtl:-scale-x-100" aria-hidden="true">→</span>
                    </span>
                    <span className="block mt-2 text-[15px] md:text-base leading-snug text-muted-foreground max-w-[36ch]">{t(`${d.key}Desc`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Hero text overlay: fixed to the full sticky frame regardless of
            the video's shrinking height, so it only ever crossfades - it
            never has to reposition itself as the box beneath it shrinks.
            Conditionally rendered (see showHeroText above) so it's fully
            removed from the DOM once faded out, not just transparent. */}
        {showHeroText && (
          <motion.div
            style={{ y: heroTextY }}
            className="absolute inset-0 z-[2] pointer-events-none"
          >
            <div className="absolute inset-0 flex flex-col px-[22px] md:px-8 pt-28 lg:pt-40 pb-6 md:pb-7">
              <div className="flex-1 flex items-center">
                <div className="w-full grid grid-cols-12 gap-x-6 gap-y-6 items-start">
                  <RevealText
                    as="h1"
                    trigger="mount"
                    delay={0.2}
                    text={t('title')}
                    className="col-span-12 lg:col-span-8 text-[42px] md:text-[62px] leading-[0.95] text-white font-medium tracking-[-0.01em] max-w-[14ch]"
                  />
                  <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="col-span-12 sm:col-span-8 lg:col-span-3 lg:col-start-9 lg:pt-1 font-mono text-[14px] leading-[1.25] tracking-[0.09em] uppercase text-white max-w-[330px]"
                  >
                    {t('subtitle')}
                  </motion.p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-x-6 items-end font-mono text-[14px] leading-[1.25] tracking-[0.09em] uppercase text-white">
                <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-start sm:flex-row sm:flex-wrap sm:items-center lg:justify-start gap-x-8 gap-y-3 pointer-events-auto">
                  <Link href="/projects" className="text-white hover:text-white/60 transition-colors focus-ring">
                    {t('ctaProjects')} <span className="inline-block rtl:-scale-x-100" aria-hidden="true">→</span>
                  </Link>
                  <button onClick={onQuoteClick} className="text-start uppercase tracking-[0.09em] text-white hover:text-white/60 transition-colors cursor-pointer focus-ring">
                    {t('ctaQuote')} <span className="inline-block rtl:-scale-x-100" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}

