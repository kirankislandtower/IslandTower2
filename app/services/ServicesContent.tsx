'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';

const services = [
  {
    num: '01',
    title: 'Infrastructure',
    description:
      'Site-wide utilities and transport infrastructure networks engineered for scale — from logistics hubs to corporate campuses, delivered on compressed schedules without cutting corners.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '02',
    title: 'MEP Engineering',
    description:
      'Full mechanical, electrical, and plumbing engineering and execution across residential, commercial, and industrial towers, with precise quality control at every fit-out stage.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '03',
    title: 'Civil Works',
    description:
      'From foundation to finishing, we deliver structural integrity and architectural precision, holding every pour and connection to exacting engineering tolerances.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '04',
    title: 'Chemical Facilities',
    description:
      'Specialized construction and MEP integration for chemical processing plants, built to strict process-safety requirements and commissioned by engineers who understand the stakes.',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '05',
    title: 'Water Treatment',
    description:
      'Capacity expansions and new-build works for regional water treatment facilities, including clarifier basins, filtration lines, and full commissioning support.',
    image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '06',
    title: 'Energy Solutions',
    description:
      'Electro-mechanical works for industrial power facilities — switchgear installation, cabling, and commissioning — built for renewable and conventional energy sectors alike.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '07',
    title: 'Research & Development',
    description:
      'We pilot new materials, methods, and process technologies at small scale before committing them to a live project, so innovation never comes at the cost of reliability.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop',
  },
];

const pillars = [
  {
    id: 'quality',
    title: 'Quality',
    description:
      'We maintain the highest standards of quality control across every electro-mechanical and civil scope, with documented inspection at each project milestone to ensure longevity and performance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
  },
  {
    id: 'hse',
    title: 'HSE — Health & Safety',
    description:
      'A safe working environment is our top priority on every site. We enforce global HSE protocols without exception, with zero lost-time incidents as the standard we hold ourselves to.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    ),
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description:
      'We integrate sustainable materials and construction practices wherever the project allows, minimizing environmental impact while maximizing resource and energy efficiency.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
  {
    id: 'technology',
    title: 'Technology',
    description:
      'Modern construction technology, project software, and continuous R&D drive precise execution, real-time monitoring, and reliable delivery across every engagement.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 14 10 14 10 20"></polyline>
        <polyline points="20 10 14 10 14 4"></polyline>
        <line x1="14" y1="10" x2="21" y2="3"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
      </svg>
    ),
  },
];

function ServiceCard({ service, idx }: { service: (typeof services)[number]; idx: number }) {
  const { ref: parallaxRef, y: parallaxY } = useParallax(20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
      className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-colors"
    >
      <div ref={parallaxRef} className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          style={{ y: parallaxY, scale: 1.15 }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-4 left-4 font-mono text-white text-xs tracking-widest">{service.num}</span>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl text-foreground font-medium tracking-tight mb-3">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesContent() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[70vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2500&auto=format&fit=crop"
          alt="MEP engineering works on site"
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
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">Expertise</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            Seven disciplines. One standard of execution.
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            Island Tower delivers comprehensive engineering, procurement, and construction services for major
            projects across infrastructure, MEP, civil, energy, water, and chemical sectors.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={service.num} service={service} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-card py-24 md:py-32 w-full">
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
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">HOW WE WORK</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-foreground font-normal tracking-tight">
              Committed to Quality &amp; Safety
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: 'easeOut' }}
                className="scroll-mt-32 bg-background border border-border rounded-2xl p-8"
              >
                <div className="text-accent mb-5">{pillar.icon}</div>
                <h3 className="text-lg text-foreground font-medium mb-3 font-mono uppercase tracking-widest">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
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
            Need a specialist EPC partner?
          </h2>
          <p className="text-white/70 text-base max-w-xl">
            Tell us which discipline your project needs and our engineering team will follow up with next steps.
          </p>
          <button
            onClick={() => setShowDemoModal(true)}
            className="bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
          >
            Get a Quote
          </button>
        </motion.div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
