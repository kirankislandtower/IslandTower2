'use client';

import { useId, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { EASE, SERIF } from '@/components/home/ui';

export type Approval = { kind?: string; title: string; year?: string; desc: string; seal: string; ltr?: boolean };
export type Commitment = { id: string; title: string; desc: string };

// Approvals as a ledger: one ruled row per approval, each with a round seal
// whose lettering turns as the page moves. The rule above a row draws in as
// the row arrives; on hover the seal fills with the accent. Under it, the
// commitments behind the certificates as a numbered list on hairlines.
export default function ApprovalLedger({ approvals, commitments }: { approvals: Approval[]; commitments: Commitment[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const spin = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);

  return (
    <div ref={ref}>
      {approvals.length > 0 && (
        <>
          <ol className="mt-12 md:mt-16">
            {approvals.map((a, i) => (
              <Row key={a.title} a={a} i={i} spin={spin} reduce={!!reduce} />
            ))}
          </ol>
          <Rule reduce={!!reduce} />
        </>
      )}

      <ul className={`${approvals.length > 0 ? 'mt-16 md:mt-24' : ''} grid md:grid-cols-2 gap-x-10 lg:gap-x-16`}>
        {commitments.map((c, i) => (
          <motion.li
            key={c.id}
            id={c.id}
            className="relative pt-6 pb-8 md:pb-10 scroll-mt-28"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
          >
            <Rule reduce={!!reduce} className="absolute inset-x-0 top-0" />
            <div className="flex items-baseline gap-4">
              <span className="text-[12px] font-medium tabular-nums text-accent" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={`${SERIF} text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.01em]`}>{c.title}</h3>
            </div>
            <p className="mt-3 ps-8 text-[15px] leading-[1.65] font-medium text-[#1a1a17]/70 max-w-[58ch]">{c.desc}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Rule({ reduce, className = '' }: { reduce: boolean; className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px bg-[#1a1a17]/15 origin-left rtl:origin-right ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

function Row({ a, i, spin, reduce }: { a: Approval; i: number; spin: MotionValue<number>; reduce: boolean }) {
  return (
    <li className="group relative">
      <Rule reduce={reduce} />
      <motion.div
        className="grid grid-cols-[72px_1fr] md:grid-cols-[112px_minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-x-5 md:gap-x-10 gap-y-3 py-7 md:py-9"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.8, delay: 0.15 + i * 0.04, ease: EASE }}
      >
        <Seal text={a.seal} spin={spin} />
        <div>
          {a.kind && <span className="block mb-2 text-[11px] tracking-[0.12em] uppercase font-medium text-[#1a1a17]/55">{a.kind}</span>}
          <h3 className={`${SERIF} text-[30px] md:text-[44px] lg:text-[52px] leading-[1] tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent`}>
            <span dir={a.ltr ? 'ltr' : undefined} className="inline-flex items-start gap-3">
              {a.title}
              {a.year && <span className="mt-1 text-[13px] md:text-[14px] font-sans font-medium tracking-normal text-[#1a1a17]/45">{a.year}</span>}
            </span>
          </h3>
        </div>
        <p className="col-span-2 md:col-span-1 text-[15px] md:text-[16px] leading-[1.6] font-medium text-[#1a1a17]/70 max-w-[42ch]">{a.desc}</p>
      </motion.div>
    </li>
  );
}

// A round seal: a ring of lettering that turns with the page, a tick in the
// middle. Fills with the accent on hover of its row.
function Seal({ text, spin }: { text: string; spin: MotionValue<number> }) {
  const id = useId().replace(/:/g, '');
  // Repeat the words round the whole ring at their natural spacing
  const unit = `${text} · `;
  const ring = unit.repeat(Math.max(2, Math.round(30 / unit.length)));
  return (
    <span className="relative block w-[72px] h-[72px] md:w-[104px] md:h-[104px]" aria-hidden="true">
      <span className="absolute inset-[18%] rounded-full border border-[#1a1a17]/20 bg-transparent transition-colors duration-500 group-hover:bg-accent group-hover:border-accent flex items-center justify-center">
        <svg className="w-[38%] h-[38%] text-accent transition-colors duration-500 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </span>
      <motion.svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ rotate: spin }} direction="ltr">
        <defs>
          <path id={`seal-${id}`} d="M50,50 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" />
        </defs>
        <text className="fill-[#1a1a17]/60 text-[8px] font-medium uppercase" style={{ letterSpacing: '0.12em', direction: 'ltr', unicodeBidi: 'bidi-override' }}>
          <textPath href={`#seal-${id}`} textLength="252" lengthAdjust="spacing">{ring}</textPath>
        </text>
      </motion.svg>
    </span>
  );
}
