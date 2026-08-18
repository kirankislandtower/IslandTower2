'use client';

import { motion } from 'framer-motion';
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
];

function ProjectCard({ project, idx }: { project: (typeof projects)[number]; idx: number }) {
  const { ref: parallaxRef, y: parallaxY } = useParallax(24);
  const isEven = idx % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
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

export default function Projects() {
  return (
    <section className="bg-card py-32 w-full" id="projects">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">FEATURED WORK</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl md:text-7xl text-foreground font-normal tracking-tight mb-6"
          >
            Selected Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed"
          >
            A cross-section of the engineering, procurement, and construction work Island Tower has delivered across the UAE and Saudi Arabia.
          </motion.p>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
