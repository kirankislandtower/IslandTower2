'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParallax } from '@/hooks/useParallax';

export default function Platform() {
  const t = useTranslations('Platform');
  const [activeTab, setActiveTab] = useState(0);
  const { ref: parallaxRef, y: parallaxY } = useParallax(30);

  const features = [
    {
      title: t('qualityTitle'),
      description: t('qualityDesc'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: t('hseTitle'),
      description: t('hseDesc'),
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
      title: t('sustainabilityTitle'),
      description: t('sustainabilityDesc'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: t('technologyTitle'),
      description: t('technologyDesc'),
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
    <section className="bg-card py-32 w-full" id="about">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('eyebrow')}</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-foreground font-normal tracking-tight leading-[1.1]">
            {t('headline1')}<br />{t('headline2')}
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Accordion List */}
          <div className="flex flex-col w-full max-w-lg">
            {features.map((feature, idx) => {
              const isActive = activeTab === idx;
              return (
                <div key={idx} className="border-b border-border">
                  <button
                    className={`w-full flex items-center gap-6 py-6 text-left transition-colors duration-300 cursor-pointer focus-ring ${
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
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
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed ps-12 pe-4">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="mt-12">
              <Link
                href="/services#quality"
                className="inline-block bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            ref={parallaxRef}
            className="relative w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl bg-muted lg:sticky lg:top-32"
          >
            {features.map((feature, idx) => (
              <motion.img
                key={idx}
                src={feature.image}
                alt={feature.title}
                style={{ y: parallaxY, scale: 1.15 }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
