'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE, GUTTER, Label, Rise, SERIF } from '@/components/home/ui';
import { Area, CARD, Field, Head, PageShell, Photo, SubmitButton, TitleHero } from '@/components/page/kit';

// Careers, built from the reference's about-page "open roles" and pricing
// FAQ: centred title, why work here beside a photograph, the disciplines,
// how we hire as a stacked list, how we train, questions, and the form.
export default function CareersContent() {
  const t = useTranslations('CareersPage');
  const [faq, setFaq] = useState<number | null>(0);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const values = [1, 2, 3].map((n) => ({ title: t(`value${n}Title`), desc: t(`value${n}Desc`) }));
  const disciplines = [1, 2, 3, 4, 5, 6, 7].map((n) => t(`d${n}`));
  const steps = [1, 2, 3].map((n) => ({ title: t(`process${n}Title`), desc: t(`process${n}Desc`) }));
  const training = [1, 2, 3].map((n) => ({ title: t(`training${n}Title`), desc: t(`training${n}Desc`) }));
  const faqs = [1, 2, 3].map((n) => ({ q: t(`faq${n}Q`), a: t(`faq${n}A`) }));

  const scrollToForm = () => {
    const el = document.getElementById('apply');
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageShell>
      <TitleHero label={t('eyebrow')} title={`${t('title1')} ${t('title2')}`} sub={t('subtitle')}>
        <button type="button" onClick={scrollToForm} className="inline-flex items-center h-9 px-4 rounded-full bg-accent text-white text-[14px] hover:bg-[#b91c1c] transition-colors cursor-pointer focus-ring">
          {t('expressInterest')}
        </button>
      </TitleHero>

      {/* Why Island Tower */}
      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          <div className="flex flex-col justify-between gap-12">
            <Head label={t('whyEyebrow')} title={t('whyHeadline')} />
            <ul className="flex flex-col gap-6">
              {values.map((v, i) => (
                <Rise key={v.title} delay={i * 0.05}>
                  <li className="flex gap-3.5">
                    <span className="mt-0.5 shrink-0 w-8 h-8 rounded-[8px] bg-accent/10 flex items-center justify-center" aria-hidden="true"><span className="w-2 h-2 rounded-full bg-accent" /></span>
                    <div>
                      <h3 className="text-[15px] font-semibold">{v.title}</h3>
                      <p className="mt-1 text-[14px] leading-[1.55] font-medium text-[#1a1a17]/70 max-w-[46ch]">{v.desc}</p>
                    </div>
                  </li>
                </Rise>
              ))}
            </ul>
          </div>
          <Photo src="/images/site/scaffolding-piping-install.jpg" alt="" className="aspect-[4/5] lg:aspect-auto lg:min-h-[600px]" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>

        <Rise className="mt-16 flex flex-col items-center text-center">
          <Label>{t('disciplinesEyebrow')}</Label>
          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-[860px]">
            {disciplines.map((d) => (
              <span key={d} className="h-9 px-4 inline-flex items-center rounded-full border border-[#1a1a17]/15 text-[14px]">{d}</span>
            ))}
          </div>
        </Rise>
      </section>

      {/* How we hire, stacked */}
      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="md:sticky md:top-28 flex flex-col gap-8">
            <div>
              <Rise><Label>{t('processEyebrow')}</Label></Rise>
              <Rise delay={0.04}><h2 className={`${SERIF} mt-6 text-[30px] md:text-[40px] leading-[1.15]`}>{t('processHeadline')}</h2></Rise>
            </div>
            <Photo src="/images/site/pump-room-team.jpg" alt="" className="hidden md:block aspect-[4/3] max-h-[44vh]" sizes="50vw" />
          </div>
          <div>
            <ul className="flex flex-col gap-3">
              {steps.map((s, i) => (
                <Rise key={s.title} delay={0.04}>
                  <li className={`rounded-[10px] ${CARD} p-5 md:p-6`}>
                    <span className="text-[11px] tracking-[0.08em] uppercase font-medium text-[#3f403c]">{t('processEyebrow')} · {i + 1}/{steps.length}</span>
                    <h3 className="mt-3 text-[18px] md:text-[20px] font-medium tracking-[-0.01em]">{s.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.55] font-medium text-[#1a1a17]/70">{s.desc}</p>
                  </li>
                </Rise>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How we train */}
      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="border-t border-[#1a1a17]/12 pt-5">
          <Head label={t('trainingEyebrow')} title={t('trainingHeadline')} />
          <div className="mt-12 grid sm:grid-cols-3 gap-3">
            {training.map((x, i) => (
              <Rise key={x.title} delay={i * 0.05}>
                <div className={`h-full rounded-[10px] ${CARD} p-5`}>
                  <span className="w-8 h-8 rounded-[8px] bg-accent text-white flex items-center justify-center" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></svg>
                  </span>
                  <h3 className="mt-8 text-[17px] font-semibold">{x.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] font-medium text-[#1a1a17]/70">{x.desc}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 grid lg:grid-cols-2 gap-10">
          <Head label={t('faqEyebrow')} title={t('faqHeadline')} />
          <ul>
            {faqs.map((f, i) => {
              const open = faq === i;
              return (
                <li key={f.q} className="border-b border-[#1a1a17]/12">
                  <button type="button" onClick={() => setFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-6 py-5 text-start text-[16px] font-medium cursor-pointer focus-ring">
                    {f.q}
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="shrink-0 w-7 h-7 rounded-full bg-[#1a1a17]/5 flex items-center justify-center" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                        <p className="pb-5 text-[15px] leading-[1.6] font-medium text-[#1a1a17]/70 max-w-[60ch]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className={`${GUTTER} pb-24 md:pb-32 scroll-mt-28`}>
        <div className="border-t border-[#1a1a17]/12 pt-5 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
          <div>
            <Head label={t('expressInterest')} title={t('formHeadline')} />
            <Rise delay={0.12}>
              <p className="mt-6 text-[16px] leading-[24px] font-medium text-[#1a1a17]/75 max-w-[44ch]">
                {t('formDesc')} <a href="mailto:careers@islandtoweruae.ae" className="text-accent underline underline-offset-4 focus-ring">careers@islandtoweruae.ae</a>.
              </p>
            </Rise>
          </div>
          <Rise delay={0.08}>
            <div className={`rounded-[12px] ${CARD} p-5 md:p-8`}>
              {state === 'sent' ? (
                <div className="py-16 text-center">
                  <h3 className={`${SERIF} text-[28px]`}>{t('thanksTitle')}</h3>
                  <p className="mt-3 text-[15px] font-medium text-[#1a1a17]/70 max-w-sm mx-auto">{t('thanksDesc')}</p>
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
                        body: JSON.stringify({ formType: 'careers', name: f.get('name'), email: f.get('email'), discipline: f.get('discipline'), message: f.get('experience') }),
                      });
                      if (!res.ok) throw new Error('failed');
                      setState('sent');
                    } catch {
                      setState('error');
                    }
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field id="career-name" name="name" label={t('fullName')} required />
                    <Field id="career-email" name="email" type="email" label={t('email')} required />
                  </div>
                  <Field id="career-discipline" name="discipline" label={t('disciplineRole')} placeholder={t('disciplinePlaceholder')} required />
                  <Area id="career-experience" name="experience" label={t('relevantExperience')} required />
                  {state === 'error' && <p className="text-[14px] text-accent" role="alert">{t('formError')}</p>}
                  <div className="flex justify-end">
                    <SubmitButton disabled={state === 'sending'}>{state === 'sending' ? t('sending') : t('submit')}</SubmitButton>
                  </div>
                </form>
              )}
            </div>
          </Rise>
        </div>
      </section>
    </PageShell>
  );
}
