'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function PortalContent() {
  const t = useTranslations('PortalPage');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const features = [
    {
      title: t('feature1Title'),
      description: t('feature1Desc'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1"></rect>
        </svg>
      ),
    },
    {
      title: t('feature2Title'),
      description: t('feature2Desc'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      ),
    },
    {
      title: t('feature3Title'),
      description: t('feature3Desc'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
    },
    {
      title: t('feature4Title'),
      description: t('feature4Desc'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[55vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2500&auto=format&fit=crop"
          alt="Project dashboard on a laptop"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
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

      {/* Features + Request Access */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20">
          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('whatsInside')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight leading-[1.1] mb-10">
              {t('builtForClients')}
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="bg-card border border-border rounded-xl p-6">
                  <div className="text-accent mb-4">{feature.icon}</div>
                  <h3 className="text-base text-foreground font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mt-10">
              {t('alreadyClient')}
            </p>
          </motion.div>

          {/* Request Access form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 md:p-10 h-fit"
          >
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-normal text-foreground mb-2">{t('requestReceived')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                  {t('requestReceivedDesc')}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl text-foreground font-normal tracking-tight mb-2">
                  {t('requestAccess')}
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  {t('requestAccessDesc')}
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label htmlFor="portal-name" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      {t('fullName')}
                    </label>
                    <input
                      id="portal-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="portal-email" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      {t('workEmail')}
                    </label>
                    <input
                      id="portal-email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="portal-company" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      {t('company')}
                    </label>
                    <input
                      id="portal-company"
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="portal-project" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      {t('projectReference')}
                    </label>
                    <input
                      id="portal-project"
                      type="text"
                      placeholder={t('projectReferencePlaceholder')}
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-6 py-4 rounded-md hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
                  >
                    {t('requestAccess')}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
