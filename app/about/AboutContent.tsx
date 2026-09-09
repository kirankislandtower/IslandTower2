'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';

const stats = [
  { value: '15+', label: 'Years in Operation' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '2', label: 'Countries Served' },
  { value: '0', label: 'Lost-Time Incidents in 2025' },
];

const values = [
  {
    title: 'Integrity',
    description: 'We deliver what we commit to, on schedule and to specification, with transparent reporting at every stage.',
  },
  {
    title: 'Precision',
    description: 'Every weld, connection, and installation is executed to exacting engineering tolerances and quality standards.',
  },
  {
    title: 'Safety First',
    description: 'No project timeline outweighs the wellbeing of our workforce. HSE protocols are non-negotiable on every site.',
  },
  {
    title: 'Partnership',
    description: 'We work as an extension of our clients\' teams, not just a contractor, from early design through handover.',
  },
];

export default function AboutContent() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { ref: storyImgRef, y: storyImgY } = useParallax(28);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[85vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2500&auto=format&fit=crop"
          alt="City skyline"
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
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">About Island Tower</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            Engineering excellence, built on trust.
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            Island Tower Electro Mechanical Works LLC has spent over a decade delivering infrastructure, MEP,
            and civil engineering projects across the UAE and Saudi Arabia, for clients who need it done right the first time.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="bg-card py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">OUR STORY</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight leading-[1.1] mb-6">
              Founded on-site, not in a boardroom.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              Island Tower started with a small electro-mechanical crew taking on the jobs larger contractors
              considered too complex or too tight on schedule. That reputation for solving hard problems on-site
              is still what our clients come back for.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Today we run full-scope EPC engagements across infrastructure, MEP, civil works, and energy &amp;
              water projects &mdash; but the standard hasn't changed: precise engineering, disciplined safety
              practice, and a crew that shows up and finishes what it starts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            ref={storyImgRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-muted"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
              alt="Island Tower site team"
              style={{ y: storyImgY, scale: 1.15 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-20 w-full border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="text-center md:text-left"
            >
              <div className="font-mono text-4xl md:text-5xl text-accent font-light mb-2">{stat.value}</div>
              <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
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
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">WHAT WE STAND FOR</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-foreground font-normal tracking-tight">
              Our Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="font-mono text-xs text-accent mb-4">0{idx + 1}</div>
                <h3 className="text-lg text-foreground font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#1c1f24] py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-3xl md:text-5xl text-white font-normal tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-white/70 text-base max-w-xl">
            Tell us what you're building and our team will follow up with next steps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setShowDemoModal(true)}
              className="bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
            >
              Get a Quote
            </button>
            <a
              href="/island-tower-company-profile.pdf"
              download
              className="inline-flex items-center gap-2 border border-white/20 text-white font-mono uppercase tracking-widest text-sm px-8 py-4 hover:border-white/40 transition-colors focus-ring"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Company Profile
            </a>
          </div>
        </motion.div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
