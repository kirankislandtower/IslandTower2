'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Tag = 'h1' | 'h2' | 'h3' | 'p';

interface RevealTextProps {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  // 'mount' plays once on page load (hero); 'view' plays when scrolled into view.
  trigger?: 'mount' | 'view';
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RevealText({ text, as = 'h2', className = '', delay = 0, trigger = 'view' }: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion) return <Tag className={className}>{text}</Tag>;

  const words = text.split(' ');
  const play = trigger === 'mount'
    ? { animate: { y: '0%' } }
    : { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -12% 0px' } };

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              {...play}
              transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
