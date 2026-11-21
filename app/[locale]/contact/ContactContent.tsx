'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowCircle, GUTTER, Label, Rise, SERIF } from '@/components/home/ui';
import { CARD, LetsTalk, PageShell, TitleHero } from '@/components/page/kit';

// Contact, as the reference's: centred title, two small cards for the two
// inboxes, the office beside a large photograph, then the form.
const MAP = 'https://www.google.com/maps/search/?api=1&query=Island+Tower+Electromechanical+Works+Damascus+Street+Dubai';

function Inbox({ label, value, href, text, icon }: { label: string; value: string; href: string; text: string; icon: React.ReactNode }) {
  return (
    <a href={href} className={`group flex flex-col justify-between min-h-[200px] rounded-[10px] ${CARD} p-5 focus-ring`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Label>{label}</Label>
          <p className="mt-4 text-[18px] font-medium tracking-[-0.01em] group-hover:text-accent transition-colors break-all" dir="ltr">{value}</p>
        </div>
        <span className="shrink-0 w-9 h-9 rounded-[8px] bg-accent text-white flex items-center justify-center" aria-hidden="true">{icon}</span>
      </div>
      <p className="mt-8 text-[13px] leading-[1.5] font-medium text-[#1a1a17]/65 max-w-[30ch]">{text}</p>
    </a>
  );
}

export default function ContactContent() {
  const t = useTranslations('ContactPage');
  const p = useTranslations('Pages');

  return (
    <PageShell>
      <TitleHero label={t('eyebrow')} title={t('title')} sub={t('subtitle')} />

      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <Rise className="grid sm:grid-cols-3 gap-3 max-w-[960px] mx-auto">
          <Inbox
            label={p('generalLabel')} value="info@islandtoweruae.ae" href="mailto:info@islandtoweruae.ae" text={p('generalText')}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
          />
          <Inbox
            label={t('callUs')} value="+971 4 257 3677" href="tel:+97142573677" text={t('dubaiLine')}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
          />
          <Inbox
            label={p('careersLabel')} value="careers@islandtoweruae.ae" href="mailto:careers@islandtoweruae.ae" text={p('careersText')}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
          />
        </Rise>
      </section>

      {/* Offices beside a large photograph */}
      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-3 min-h-[520px]">
          <Rise className="h-full">
            <div className="relative h-full min-h-[420px] rounded-[10px] overflow-hidden bg-[#1a1a17]">
              <Image src="/images/site/rebar-formwork-crew.jpg" alt="" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover opacity-30" />
              <div className="relative h-full flex flex-col justify-between p-6 text-[#f4f3ea]">
                <div>
                  <Label light>{p('hqLabel')}</Label>
                  <h2 className={`${SERIF} mt-6 text-[26px] md:text-[30px] leading-[1.2] max-w-[18ch]`}>{p('hqTitle')}</h2>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[11px] tracking-[0.08em] uppercase font-medium text-[#f4f3ea]/60">{t('headOffice')} · {t('dubaiCity')}</p>
                    <p className="mt-2 text-[18px] leading-[1.35] font-medium max-w-[26ch]">{t('dubaiLine')}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.08em] uppercase font-medium text-[#f4f3ea]/60">{t('regionalOffice')}</p>
                    <p className="mt-2 text-[16px] font-medium">{t('riyadhLine')}</p>
                  </div>
                  <a href={MAP} target="_blank" rel="noopener noreferrer" className="group inline-flex w-fit items-center gap-2 text-[13px] font-medium focus-ring">
                    {p('showMap')}<ArrowCircle className="w-7 h-7 bg-accent text-white transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </Rise>
          <Rise delay={0.06} className="h-full">
            <div className="relative h-full min-h-[320px] rounded-[10px] overflow-hidden">
              <Image src="/images/site/utility-tunnel-corridor.jpg" alt="" fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
            </div>
          </Rise>
        </div>
      </section>

      <LetsTalk id="contact-form" />
    </PageShell>
  );
}
