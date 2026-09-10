'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function ContactContent() {
  const t = useTranslations('ContactPage');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const offices = [
    {
      city: t('dubaiCity'),
      label: t('headOffice'),
      lines: [t('companyName'), t('dubaiLine')],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1M6 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16"></path>
        </svg>
      ),
    },
    {
      city: t('riyadhCity'),
      label: t('regionalOffice'),
      lines: [t('companyName'), t('riyadhLine')],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21c-4.5-4.5-7-8.09-7-11.5A7 7 0 0 1 19 9.5C19 12.91 16.5 16.5 12 21z"></path>
          <circle cx="12" cy="9.5" r="2.5"></circle>
        </svg>
      ),
    },
  ];

  const channels = [
    {
      label: t('callUs'),
      value: '+971 4 257 3677',
      href: 'tel:+97142573677',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
    },
    {
      label: t('emailUs'),
      value: 'info@islandtoweruae.ae',
      href: 'mailto:info@islandtoweruae.ae',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'Island Tower Electromechanical Works',
      href: 'https://www.linkedin.com/company/island-tower-electromechanical-works/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop"
          alt="Engineering team reviewing plans"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/50 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">{t('eyebrow')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            {t('title')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Form + Offices */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-card border border-border rounded-2xl p-8 md:p-10"
          >
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-normal text-foreground mb-2">{t('messageReceived')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                  {t('messageReceivedDesc')}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent" />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('sendMessage')}</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-foreground font-normal tracking-tight mb-8">
                  {t('formHeadline')}
                </h2>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    setError(false);
                    const formData = new FormData(e.currentTarget);
                    try {
                      const res = await fetch('/api/inquiry', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          formType: 'contact',
                          name: formData.get('name'),
                          email: formData.get('email'),
                          company: formData.get('company'),
                          phone: formData.get('phone'),
                          message: formData.get('message'),
                        }),
                      });
                      if (!res.ok) throw new Error('Request failed');
                      setSubmitted(true);
                    } catch {
                      setError(true);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        {t('fullName')}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        {t('email')}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        {t('companyOptional')}
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        {t('phoneOptional')}
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      {t('message')}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm resize-none focus-ring focus:border-accent"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {t('formError')}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full sm:w-fit bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 rounded-md hover:bg-accent/90 transition-colors cursor-pointer focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? t('sending') : t('sendMessageBtn')}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Offices + Channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {offices.map((office) => (
              <div key={office.city} className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="text-accent shrink-0 mt-0.5">{office.icon}</div>
                  <div>
                    <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">{office.label}</div>
                    <h3 className="text-lg text-foreground font-medium mb-2">{office.city}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {office.lines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < office.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#1c1f24] rounded-2xl p-6 md:p-8 flex flex-col gap-5">
              <span className="font-mono text-xs tracking-widest uppercase text-white/40">{t('directContact')}</span>
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 text-white/80 hover:text-accent transition-colors focus-ring rounded-md -mx-2 px-2 py-1"
                >
                  <span className="shrink-0">{channel.icon}</span>
                  <span className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">{channel.label}</span>
                    <span className="text-sm">{channel.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
