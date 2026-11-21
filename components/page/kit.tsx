'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HomeNav from '@/components/home/HomeNav';
import EvClosing from '@/components/home/EvClosing';
import QuoteModal from '@/components/QuoteModal';
import { EASE, GUTTER, Label, Rise, SERIF, ArrowCircle } from '@/components/home/ui';

// Shared frame for the inner pages, laid out like the reference's inner
// pages: the same floating bar, a plain title band (or a full-bleed photo
// on About), cream sections that rise in as they reach the screen, and the
// same closing photograph with the footer card on every page.

const QuoteCtx = createContext<() => void>(() => {});
export const useQuote = () => useContext(QuoteCtx);

export const CARD = 'bg-[#e6e8dd]';

export function PageShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openQuote = () => setOpen(true);
  return (
    <QuoteCtx.Provider value={openQuote}>
      <main className="bg-[#f4f3ea] text-[#1a1a17]">
        <HomeNav />
        {children}
        <EvClosing onQuote={openQuote} />
        <QuoteModal open={open} onClose={() => setOpen(false)} />
      </main>
    </QuoteCtx.Provider>
  );
}

// A heading whose words come out of a blur one after another on load
export function BlurWords({ text, delay = 0.15 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
        >
          {w}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </>
  );
}

const H1 = `${SERIF} text-[40px] leading-[44px] tracking-[-1.5px] sm:text-[52px] sm:leading-[56px] md:text-[60px] md:leading-[64px] md:tracking-[-2.5px] text-balance`;

function Enter({ children, delay, className = '' }: { children: ReactNode; delay: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Plain title band: dotted label, serif title, one line under it, actions
export function TitleHero({
  label, title, sub, children, align = 'center',
}: { label: string; title: string; sub?: string; children?: ReactNode; align?: 'center' | 'start' }) {
  const c = align === 'center';
  return (
    <section className={`${GUTTER} pt-[132px] md:pt-[168px] pb-14 md:pb-20`}>
      <div className={`flex flex-col ${c ? 'items-center text-center' : 'items-start'}`}>
        <Enter delay={0.05}><Label>{label}</Label></Enter>
        <h1 className={`${H1} mt-6 ${c ? 'max-w-[860px]' : 'max-w-[900px]'}`}><BlurWords text={title} /></h1>
        {sub && (
          <Enter delay={0.45}>
            <p className={`mt-6 text-[16px] leading-[24px] font-medium text-[#1a1a17]/80 ${c ? 'max-w-[520px] mx-auto' : 'max-w-[560px]'}`}>{sub}</p>
          </Enter>
        )}
        {children && <Enter delay={0.6} className="mt-7">{children}</Enter>}
      </div>
    </section>
  );
}

// Full-bleed photograph with the title in the lower corner (About)
export function PhotoHero({ label, title, img, alt }: { label: string; title: string; img: string; alt: string }) {
  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#1a1a17] text-[#f4f3ea]">
      <Image src={img} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a17]/80 via-[#1a1a17]/25 to-[#1a1a17]/20" aria-hidden="true" />
      <div className={`relative h-full flex flex-col justify-end ${GUTTER} pb-10 md:pb-14`}>
        <Enter delay={0.1}><Label light>{label}</Label></Enter>
        <h1 className={`${H1} mt-6 max-w-[760px]`}><BlurWords text={title} delay={0.2} /></h1>
      </div>
    </section>
  );
}

// Dotted label over a serif heading
export function Head({ label, title, light = false, className = '', size = 'md' }: { label: string; title: string; light?: boolean; className?: string; size?: 'md' | 'lg' }) {
  return (
    <div className={className}>
      <Rise><Label light={light}>{label}</Label></Rise>
      <Rise delay={0.06}>
        <h2 className={`${SERIF} mt-6 ${size === 'lg' ? 'text-[34px] md:text-[48px] leading-[1.1]' : 'text-[30px] md:text-[40px] leading-[1.15]'} max-w-[18ch] text-balance`}>{title}</h2>
      </Rise>
    </div>
  );
}

// A photograph that drifts in slightly from a larger crop as it enters
export function Photo({ src, alt, className = '', sizes = '100vw', priority = false }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden rounded-[10px] bg-[#1a1a17]/10 ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}

// Image card used for projects, case studies and articles
export function StoryCard({
  href, img, tag, title, meta, cta,
}: { href: string; img: string; tag: string; title: string; meta?: string; cta: string }) {
  return (
    <Link href={href} className={`group flex flex-col h-full rounded-[10px] ${CARD} overflow-hidden focus-ring`}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={img} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <Label>{tag}</Label>
        <h3 className="mt-4 text-[18px] md:text-[20px] leading-[1.3] font-medium tracking-[-0.01em] max-w-[36ch]">{title}</h3>
        <div className="mt-auto pt-6 flex items-center justify-between gap-4 text-[13px] font-medium">
          <span className="text-[#1a1a17]/60">{meta}</span>
          <span className="inline-flex items-center gap-2 shrink-0">
            {cta}
            <ArrowCircle className="w-6 h-6 bg-accent text-white transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Form fields in the reference's quiet style
const FIELD = 'w-full h-11 px-3.5 rounded-[6px] bg-[#f4f3ea] border border-[#1a1a17]/10 text-[14px] font-medium placeholder:text-[#1a1a17]/40 focus:outline-none focus:border-accent focus-ring';

export function Field({ id, label, name, type = 'text', required, placeholder }: { id: string; label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-[11px] tracking-[0.08em] uppercase font-medium text-[#3f403c]">{label}</label>
      <input id={id} name={name} type={type} required={required} placeholder={placeholder} className={FIELD} />
    </div>
  );
}

export function Area({ id, label, name, required, placeholder }: { id: string; label: string; name: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-[11px] tracking-[0.08em] uppercase font-medium text-[#3f403c]">{label}</label>
      <textarea id={id} name={name} required={required} placeholder={placeholder} rows={5} className={`${FIELD} h-auto py-3 resize-none`} />
    </div>
  );
}

export function Select({ id, label, name, placeholder, options }: { id: string; label: string; name: string; placeholder: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-[11px] tracking-[0.08em] uppercase font-medium text-[#3f403c]">{label}</label>
      <select id={id} name={name} defaultValue="" className={`${FIELD} cursor-pointer`}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export function SubmitButton({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button type="submit" disabled={disabled} className="inline-flex items-center h-10 px-5 rounded-full bg-accent text-white text-[14px] hover:bg-[#b91c1c] transition-colors cursor-pointer focus-ring disabled:opacity-60 disabled:cursor-not-allowed">
      {children}
    </button>
  );
}

// "Let's talk": heading and a line on the left, the project form on the right,
// and a small dark card with the direct lines (in place of the reference's
// testimonial, since we only show what is real).
export function LetsTalk({ id = 'talk' }: { id?: string }) {
  const t = useTranslations('ContactPage');
  const p = useTranslations('Pages');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  return (
    <section id={id} className={`${GUTTER} pb-24 md:pb-32 scroll-mt-28`}>
      <div className="border-t border-[#1a1a17]/12 pt-5 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <Head label={p('talkLabel')} title={p('talkTitle')} />
            <Rise delay={0.12}><p className="mt-6 text-[16px] leading-[24px] font-medium text-[#1a1a17]/80 max-w-[44ch]">{p('talkText')}</p></Rise>
          </div>
          <Rise delay={0.16}>
            <div className="w-full max-w-[280px] rounded-[10px] bg-[#1a1a17] text-[#f4f3ea] p-5">
              <Label light>{t('directContact')}</Label>
              <p className="mt-5 text-[14px] font-medium" dir="ltr"><a href="tel:+97142573677" className="hover:text-accent transition-colors focus-ring">+971 4 257 3677</a></p>
              <p className="mt-1.5 text-[14px] font-medium"><a href="mailto:info@islandtoweruae.ae" className="hover:text-accent transition-colors focus-ring">info@islandtoweruae.ae</a></p>
              <p className="mt-5 text-[12px] leading-[1.5] text-[#f4f3ea]/60">{t('dubaiLine')}</p>
            </div>
          </Rise>
        </div>

        <Rise delay={0.08}>
          <div className={`rounded-[12px] ${CARD} p-5 md:p-8`}>
            {state === 'sent' ? (
              <div className="py-16 text-center">
                <h3 className={`${SERIF} text-[28px]`}>{t('messageReceived')}</h3>
                <p className="mt-3 text-[15px] font-medium text-[#1a1a17]/70 max-w-sm mx-auto">{t('messageReceivedDesc')}</p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setState('sending');
                  const f = new FormData(e.currentTarget);
                  try {
                    const res = await fetch('/api/inquiry', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        formType: 'contact',
                        name: f.get('name'), email: f.get('email'), company: f.get('company'),
                        phone: f.get('phone'), workType: f.get('workType'), message: f.get('message'),
                      }),
                    });
                    if (!res.ok) throw new Error('failed');
                    setState('sent');
                  } catch {
                    setState('error');
                  }
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id={`${id}-name`} name="name" label={t('fullName')} required />
                  <Field id={`${id}-email`} name="email" type="email" label={t('email')} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id={`${id}-company`} name="company" label={t('companyOptional')} />
                  <Field id={`${id}-phone`} name="phone" type="tel" label={t('phoneOptional')} />
                </div>
                <Select
                  id={`${id}-work`} name="workType" label={t('workType')} placeholder={t('workTypeSelect')}
                  options={(['workNetwork', 'workFlushing', 'workEts', 'workMep', 'workMaintenance', 'workOther'] as const).map((k) => t(k))}
                />
                <Area id={`${id}-message`} name="message" label={t('message')} required />
                {state === 'error' && <p className="text-[14px] text-accent" role="alert">{t('formError')}</p>}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[12px] font-medium text-[#1a1a17]/60 max-w-[40ch]">{p('replyNote')}</p>
                  <SubmitButton disabled={state === 'sending'}>{state === 'sending' ? t('sending') : t('sendMessageBtn')}</SubmitButton>
                </div>
              </form>
            )}
          </div>
        </Rise>
      </div>
    </section>
  );
}

// Large centred quote, as the reference's "From founder" block
export function BigQuote({ label, quote, name, role, img }: { label: string; quote: string; name: string; role: string; img?: string }) {
  return (
    <section className={`${GUTTER} py-24 md:py-32`}>
      <div className="flex flex-col items-center text-center">
        <Rise><Label>{label}</Label></Rise>
        <Rise delay={0.06}>
          <blockquote className={`${SERIF} mt-7 text-[28px] md:text-[40px] leading-[1.2] max-w-[24ch] text-balance`}>&ldquo;{quote}&rdquo;</blockquote>
        </Rise>
        <Rise delay={0.12} className="mt-8 flex flex-col items-center">
          {img && (
            <span className="relative w-14 h-14 rounded-full overflow-hidden">
              <Image src={img} alt="" fill sizes="56px" className="object-cover" />
            </span>
          )}
          <span className="mt-3 text-[13px] font-medium">— {name}</span>
          <span className="text-[12px] text-[#1a1a17]/60">{role}</span>
        </Rise>
      </div>
    </section>
  );
}
