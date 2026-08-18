'use client';

import { useState } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-white py-24 w-full">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header and Controls */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#94a3b8]" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-gray-800">CLIENT TESTIMONIALS</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="p-3 border border-gray-300 hover:border-gray-500 transition-colors bg-white outline-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 border border-gray-300 hover:border-gray-500 transition-colors bg-white outline-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Box */}
        <div className="bg-[#f7f7f7] rounded-sm p-6 md:p-8 grid md:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          
          {/* Image */}
          <div className="w-full aspect-[4/3] md:aspect-square overflow-hidden bg-gray-200 rounded-sm">
            <img 
              src={current.image} 
              alt={current.author} 
              className="w-full h-full object-cover transition-opacity duration-500"
              key={current.image}
            />
          </div>

          {/* Quote Content */}
          <div className="flex flex-col justify-center pr-0 lg:pr-12">
            <div className="text-[#94a3b8] text-5xl md:text-6xl font-serif leading-none mb-6">"</div>
            <p 
              key={current.quote}
              className="font-mono text-lg md:text-2xl leading-relaxed text-[#111] mb-16 animate-fade-in"
            >
              {current.quote}
            </p>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-gray-800 mt-auto">
              {current.author}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
