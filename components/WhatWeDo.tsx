'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      title: 'MEP Engineering',
      desc: 'Full mechanical, electrical, and plumbing engineering execution with precise quality control.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Infrastructure',
      desc: 'Building robust utilities and transport infrastructure networks to power the future.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Civil Works',
      desc: 'From foundation to finishing, delivering structural integrity and excellence on every site.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Energy & Water',
      desc: 'Specialized solutions for the chemical, water treatment, and renewable energy sectors.',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  return (
    <section className="bg-white py-24 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-[#94a3b8]" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-gray-800">Our Expertise</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#111] font-normal tracking-tight leading-[1.1] max-w-4xl">
            Island Tower delivers comprehensive engineering, procurement, and construction services for major projects.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative w-full h-[600px] rounded-xl overflow-hidden bg-black shadow-2xl"
        >
          {tabs.map((tab) => (
            <img
              key={tab.id}
              src={tab.image}
              alt={tab.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                activeTab === tab.id ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />

          <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10 pointer-events-none">
            <div className="font-mono text-white/90 text-sm md:text-lg tracking-widest uppercase max-w-[200px] leading-relaxed">
              Delivering Excellence
            </div>
            <div className="font-mono text-white/90 text-4xl md:text-5xl font-light">
              0{activeTab}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 z-10 hidden md:grid grid-cols-4 gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col justify-end text-left h-full group outline-none"
              >
                <div className="flex flex-col justify-end min-h-[120px] mb-4">
                  <h3 
                    className={`text-lg transition-colors duration-300 ${
                      activeTab === tab.id ? 'text-white font-medium' : 'text-white/50 group-hover:text-white/80'
                    }`}
                  >
                    {tab.title}
                  </h3>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeTab === tab.id ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-white/70 text-sm leading-relaxed">
                      {tab.desc}
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`h-[2px] w-full transition-colors duration-300 ${
                    activeTab === tab.id ? 'bg-white' : 'bg-white/20 group-hover:bg-white/40'
                  }`} 
                />
              </button>
            ))}
          </div>
          
          {/* Mobile Tabs */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10 md:hidden flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="text-left w-full outline-none"
              >
                <div className="flex items-center justify-between">
                  <h3 
                    className={`text-base transition-colors duration-300 ${
                      activeTab === tab.id ? 'text-white font-medium' : 'text-white/50'
                    }`}
                  >
                    {tab.title}
                  </h3>
                  {activeTab !== tab.id && (
                    <div className="w-4 h-[1px] bg-white/30" />
                  )}
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeTab === tab.id ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/70 text-xs leading-relaxed">
                    {tab.desc}
                  </p>
                </div>
                
                <div 
                  className={`h-[1px] w-full mt-3 transition-colors duration-300 ${
                    activeTab === tab.id ? 'bg-white' : 'bg-white/20'
                  }`} 
                />
              </button>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
