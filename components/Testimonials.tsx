'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { ref: parallaxRef, y: parallaxY } = useParallax(25);

  const testimonials = [
    {
      quote: "Island Tower Electro Mechanical Works delivered our infrastructure on time and with exceptional quality. Their commitment to safety and engineering precision is unmatched in the region.",
      author: "EMAAR PROPERTIES",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      quote: "The civil and MEP works executed by Island Tower have set a new benchmark for our future projects. Truly a reliable partner for high-stakes construction.",
      author: "DAMAC PROPERTIES",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-background py-24 w-full">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header and Controls */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">CLIENT TESTIMONIALS</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="p-3 border border-border hover:border-accent transition-colors bg-card cursor-pointer focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="p-3 border border-border hover:border-accent transition-colors bg-card cursor-pointer focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Box */}
        <div className="bg-muted rounded-sm p-6 md:p-8 grid md:grid-cols-2 gap-12 lg:gap-24 items-stretch overflow-hidden">

          {/* Image */}
          <div ref={parallaxRef} className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden bg-card rounded-sm">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.author}
                initial={{ opacity: 0, x: direction * 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ y: parallaxY, scale: 1.15 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Quote Content */}
          <div className="flex flex-col justify-center pr-0 lg:pr-12">
            <div className="text-accent text-5xl md:text-6xl font-serif leading-none mb-6">&ldquo;</div>
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={current.quote}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-mono text-lg md:text-2xl leading-relaxed text-foreground mb-16"
              >
                {current.quote}
              </motion.p>
            </AnimatePresence>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mt-auto">
              {current.author}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
