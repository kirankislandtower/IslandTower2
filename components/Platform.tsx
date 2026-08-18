'use client';

import { useState } from 'react';

export default function Platform() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: 'QUALITY',
      description: 'We maintain the highest standards of quality control in all our electro-mechanical projects, ensuring longevity and performance.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'HSE (HEALTH & SAFETY)',
      description: 'Ensuring a safe working environment is our top priority across all sites. We strictly adhere to global HSE protocols.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'SUSTAINABILITY',
      description: 'We integrate sustainable practices to minimize environmental impact and maximize resource efficiency in every project.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'TECHNOLOGY',
      description: 'Leveraging modern construction technologies, software, and R&D for precise execution, monitoring, and delivery.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 14 10 14 10 20"></polyline>
          <polyline points="20 10 14 10 14 4"></polyline>
          <line x1="14" y1="10" x2="21" y2="3"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  return (
    <section className="bg-white py-32 w-full" id="about">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-[#94a3b8]" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-gray-800">HOW WE WORK</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-[#111] font-normal tracking-tight leading-[1.1]">
            Committed to Quality<br />& Safety
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Accordion List */}
          <div className="flex flex-col w-full max-w-lg">
            {features.map((feature, idx) => {
              const isActive = activeTab === idx;
              return (
                <div key={idx} className="border-b border-gray-200">
                  <button
                    className={`w-full flex items-center gap-6 py-6 text-left transition-colors duration-300 ${
                      isActive ? 'text-[#111]' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <div className="shrink-0">{feature.icon}</div>
                    <span className="font-mono text-sm md:text-base tracking-widest uppercase">
                      {feature.title}
                    </span>
                  </button>
                  
                  {/* Expanded Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-12 pr-4">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="mt-12">
              <a 
                href="#contact" 
                className="inline-block bg-[#94a3b8] text-white font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#64748b] transition-colors"
              >
                LEARN MORE
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Image */}
          <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-100 lg:sticky lg:top-32">
            {features.map((feature, idx) => (
              <img
                key={idx}
                src={feature.image}
                alt={feature.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
