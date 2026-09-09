'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

const disciplines = [
  'MEP Engineering',
  'Infrastructure',
  'Civil Works',
  'Chemical Facilities',
  'Water Treatment',
  'Energy Solutions',
  'Research & Development',
];

const values = [
  {
    title: 'Real Responsibility',
    description: 'Our engineers own their scope end to end, from design coordination through site handover.',
  },
  {
    title: 'Safety First, Always',
    description: 'HSE protocols are non-negotiable — no schedule pressure outweighs a safe site.',
  },
  {
    title: 'Room to Grow',
    description: 'A track record of promoting from within as our project pipeline across the region grows.',
  },
];

export default function CareersContent() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2500&auto=format&fit=crop"
          alt="Engineers on a construction site"
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
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">Careers</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            Build the region&apos;s
            <br />
            infrastructure with us.
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            We don&apos;t always have open roles posted — but we&apos;re always interested in hearing from
            experienced engineers and site professionals ready to work on major projects across the UAE and
            Saudi Arabia.
          </p>
        </motion.div>
      </section>

      {/* Why Island Tower */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">Why Island Tower</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-foreground font-normal tracking-tight">
              Work that matters.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 mb-24">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <div className="font-mono text-xs text-accent mb-4">0{idx + 1}</div>
                <h3 className="text-lg text-foreground font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mb-10"
          >
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Disciplines We Hire For</span>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
              {disciplines.map((d) => (
                <span
                  key={d}
                  className="font-mono text-xs tracking-widest uppercase text-foreground border border-border rounded-full px-4 py-2"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Express Interest form */}
      <section className="bg-card py-24 md:py-32 w-full border-t border-border">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-background border border-border rounded-2xl p-8 md:p-10"
          >
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-normal text-foreground mb-2">Thanks for reaching out</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                  We&apos;ll keep your details on file and reach out when a role matching your experience opens up.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent" />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">Express Interest</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-foreground font-normal tracking-tight mb-2">
                  No open role listed for you right now?
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Tell us about your background and we&apos;ll reach out when a fit comes up — or email your CV
                  directly to <a href="mailto:careers@islandtoweruae.ae" className="text-accent hover:underline">careers@islandtoweruae.ae</a>.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="careers-name" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        id="careers-name"
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="careers-email" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        Email
                      </label>
                      <input
                        id="careers-email"
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="careers-discipline" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Discipline / Role
                    </label>
                    <input
                      id="careers-discipline"
                      type="text"
                      placeholder="e.g. MEP Site Engineer"
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="careers-experience" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Relevant Experience
                    </label>
                    <textarea
                      id="careers-experience"
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground text-sm resize-none focus-ring focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-6 py-4 rounded-md hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
                  >
                    Submit
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
