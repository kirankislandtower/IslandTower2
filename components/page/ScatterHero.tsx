'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { EASE, SERIF } from '@/components/home/ui';

// Split a title into three lines of roughly equal length, by words
function threeLines(text: string): string[] {
  const words = text.split(' ');
  const total = text.length;
  const lines: string[][] = [[], [], []];
  let line = 0;
  let count = 0;
  words.forEach((w) => {
    if (line < 2 && count >= ((line + 1) * total) / 3) line += 1;
    lines[line].push(w);
    count += w.length + 1;
  });
  return lines.map((l) => l.join(' ')).filter(Boolean);
}

// The About banner: our crew footage in a rounded frame on a dark margin,
// the title broken into three large lines set at different places across
// it (start, end, start), a short line and a link to the story below. On
// load the lines come out of a blur one after another; as the page moves
// each drifts at its own speed while the footage slowly settles.
export default function ScatterHero({
  title, line, linkLabel, linkHref, video, poster, image, imagePosition = 'center', compact = false,
}: { title: string; line: string; linkLabel: string; linkHref: string; video?: string; poster?: string; image?: string; imagePosition?: string; compact?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -240]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1]);
  // Lines can be given with '|' between them; otherwise split evenly
  const lines = title.includes('|') ? title.split('|').map((l) => l.trim()) : threeLines(title);
  const ys = [y1, y2, y3];
  // Spread down the whole frame: in from the start, over at the end, then
  // in from the start again a little further across
  const place = [
    'self-start ms-[4%] md:ms-[9%]',
    'self-end me-[2%] md:me-[7%]',
    'self-start ms-[6%] md:ms-[12%]',
  ];
  const ink = 'text-[#c4dcf0]';

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] w-full bg-[#1a1a17] p-2 md:p-3">
      <div className="relative h-full w-full overflow-hidden rounded-[14px] md:rounded-[20px] text-[#f4f3ea]">
        <motion.div className="absolute inset-0" style={{ scale: mediaScale }}>
          {image ? (
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: imagePosition }} />
          ) : (
            <video autoPlay muted loop playsInline poster={poster} className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
              <source src={video} type="video/mp4" />
            </video>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-[#1a1a17]/45" aria-hidden="true" />

        <h1 className={`${SERIF} ${ink} relative h-full flex flex-col justify-between px-4 md:px-8 pt-[15svh] pb-[31svh] md:pt-[15svh] md:pb-[9svh] ${compact ? 'text-[11.5vw] sm:text-[10vw] lg:text-[8vw]' : 'text-[19vw] sm:text-[15vw] lg:text-[11.5vw]'} leading-[0.95] tracking-[-0.03em]`}>
          {lines.map((l, i) => (
            <motion.span key={i} className={`block whitespace-nowrap ${place[i] ?? ''}`} style={{ y: ys[i] }}>
              <motion.span
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.2, ease: EASE }}
              >
                {l}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        {/* The short line, set in the serif under the second line */}
        <motion.p
          className={`${SERIF} ${ink} absolute end-[5%] bottom-[13%] max-w-[62%] md:max-w-[24ch] md:end-auto md:start-[62%] md:bottom-[17%] ${compact ? 'text-[15px] sm:text-[18px] lg:text-[clamp(17px,1.3vw,22px)] md:max-w-[30ch]' : 'text-[16px] sm:text-[21px] lg:text-[clamp(20px,1.7vw,30px)]'} leading-[1.22] tracking-[-0.01em]`}
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
        >
          {line}
        </motion.p>

        {/* Down to the story: a label over a line that runs to the bottom edge */}
        <motion.a
          href={linkHref}
          className="group absolute bottom-0 start-[10%] md:start-[4%] flex flex-col items-center gap-3 text-[12px] md:text-[13px] font-medium tracking-[0.14em] uppercase text-[#f4f3ea]/90 hover:text-[#f4f3ea] focus-ring"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        >
          {linkLabel}
          <span className="relative block w-px h-[7svh] md:h-[9svh] bg-[#f4f3ea]/30 overflow-hidden" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-[#f4f3ea] animate-[scrollcue_2.2s_ease-in-out_infinite]" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
