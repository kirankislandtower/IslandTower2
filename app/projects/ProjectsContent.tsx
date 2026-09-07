'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';

const projects = [
  {
    title: 'Marina Business Bay Tower',
    location: 'Dubai, UAE',
    category: 'MEP Engineering',
    description: 'Full mechanical, electrical, and plumbing fit-out for a 42-storey mixed-use tower, coordinated across a compressed 18-month construction schedule.',
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Jebel Ali Water Treatment Expansion',
    location: 'Dubai, UAE',
    category: 'Water Treatment',
    description: 'Capacity expansion of a regional water treatment facility, including new clarifier basins and an upgraded filtration line.',
    image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Riyadh Industrial Energy Plant',
    location: 'Riyadh, KSA',
    category: 'Energy Solutions',
    description: 'Electro-mechanical works for an industrial power facility, from switchgear installation through to commissioning and handover.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'King Abdullah Logistics Hub',
    location: 'Jeddah, KSA',
    category: 'Infrastructure',
    description: 'Site-wide utilities and infrastructure works for a large-scale logistics and distribution hub serving the western region.',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Abu Dhabi Corporate Campus',
    location: 'Abu Dhabi, UAE',
    category: 'Civil Works',
    description: 'Structural and civil works for a low-rise corporate campus, delivered to exacting quality and HSE standards from foundation to finishing.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Sharjah Chemical Processing Facility',
    location: 'Sharjah, UAE',
    category: 'Chemical Facilities',
    description: 'Specialized construction and MEP integration for a chemical processing plant, built to strict process-safety requirements.',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Dubai South Aviation Support Facility',
    location: 'Dubai, UAE',
    category: 'Infrastructure',
    description: 'Civil and MEP works for an aviation logistics support facility, coordinated tightly with airside safety and access restrictions.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'NEOM Regional Substation',
    location: 'Riyadh, KSA',
    category: 'Energy Solutions',
    description: 'Electro-mechanical build-out of a regional power substation supporting renewable energy integration for the surrounding grid.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
  },
];

const categories = ['All', 'MEP Engineering', 'Infrastructure', 'Civil Works', 'Water Treatment', 'Energy Solutions', 'Chemical Facilities'];

function ProjectCard({ project, idx }: { project: (typeof projects)[number]; idx: number }) {
  const { ref: parallaxRef, y: parallaxY } = useParallax(24);
  const isEven = idx % 2 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
    >
      <div
        ref={parallaxRef}
        className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: parallaxY, scale: 1.15 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-5 left-5 font-mono text-white text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
          0{idx + 1}
        </span>
      </div>

      <div className={isEven ? 'md:order-2' : 'md:order-1'}>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{project.category}</span>
        <h3 className="text-3xl md:text-4xl text-foreground font-normal tracking-tight mt-3 mb-3">
          {project.title}
        </h3>
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-5">
          {project.location}
        </p>
        <p className="text-muted-foreground text-base leading-relaxed max-w-md">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProjectsContent() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => (activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2500&auto=format&fit=crop"
          alt="Island Tower project site"
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
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">Featured Work</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            Selected Projects
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            A cross-section of the engineering, procurement, and construction work Island Tower has delivered
            across the UAE and Saudi Arabia.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="bg-card w-full border-b border-border sticky top-0 z-30 backdrop-blur-md bg-card/95">
        <div className="max-w-6xl mx-auto px-6 py-5 flex gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 font-mono text-xs tracking-widest uppercase px-4 py-2.5 rounded-full border transition-colors cursor-pointer focus-ring ${
                activeCategory === cat
                  ? 'bg-accent text-on-accent border-accent'
                  : 'bg-transparent text-muted-foreground border-border hover:border-accent hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects List */}
      <section className="bg-card py-24 md:py-32 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-24">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.title} project={project} idx={idx} />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-12">No projects in this category yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#1c1f24] py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-3xl md:text-5xl text-white font-normal tracking-tight">
            Ready to start your next project?
          </h2>
          <p className="text-white/70 text-base max-w-xl">
            Tell us what you're building and our team will follow up with next steps.
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
