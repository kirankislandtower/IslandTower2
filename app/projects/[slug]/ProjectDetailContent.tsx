'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';
import type { Project } from '@/lib/projects';
import { projects } from '@/lib/projects';

export default function ProjectDetailContent({ project }: { project: Project }) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { ref: heroImgRef, y: heroImgY } = useParallax(24);

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 2);
  const fallbackRelated = related.length > 0 ? related : projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-end overflow-hidden bg-[#111]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/60 via-[#111]/40 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-20 pb-16"
        >
          <Link
            href="/projects"
            className="flex w-fit items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors focus-ring mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            All Projects
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">{project.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            {project.title}
          </h1>
          <p className="font-mono text-xs tracking-widest uppercase text-white/60 mt-6">{project.location}</p>
        </motion.div>
      </section>

      {/* Challenge / Approach / Results */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {[
            { label: 'The Challenge', text: project.challenge },
            { label: 'Our Approach', text: project.approach },
          ].map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 bg-accent" />
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{block.label}</span>
              </div>
              <p className="text-foreground text-base leading-relaxed">{block.text}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">Results</span>
            </div>
            <ul className="flex flex-col gap-4">
              {project.results.map((result) => (
                <li key={result} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {result}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="bg-card py-24 md:py-32 w-full border-t border-border">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              ref={heroImgRef}
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-6"
            >
              <motion.img
                src={project.gallery[0]}
                alt={`${project.title} — site work`}
                style={{ y: heroImgY, scale: 1.15 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
            {project.gallery[1] && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img src={project.gallery[1]} alt={`${project.title} — detail`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Projects */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">More Projects</span>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {fallbackRelated.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg focus-ring"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-mono text-xs tracking-widest uppercase text-white/70">{p.category}</span>
                  <h3 className="text-xl text-white font-medium mt-1">{p.title}</h3>
                </div>
              </Link>
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
            Have a similar project in mind?
          </h2>
          <p className="text-white/70 text-base max-w-xl">
            Tell us what you&apos;re building and our team will follow up with next steps.
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
