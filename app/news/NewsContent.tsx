'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { articles } from '@/lib/news';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function NewsContent() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [featured, ...rest] = articles;

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[50vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2500&auto=format&fit=crop"
          alt="Engineering documents and blueprints"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/50 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            Perspectives from the field.
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            Practical lessons on MEP engineering, HSE, and EPC delivery from projects across the UAE and
            Saudi Arabia.
          </p>
        </motion.div>
      </section>

      {/* Featured Article */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link href={`/news/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 md:gap-16 items-center focus-ring rounded-2xl">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{featured.category}</span>
                <h2 className="text-3xl md:text-4xl text-foreground font-normal tracking-tight mt-3 mb-4 group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed max-w-lg mb-5">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  <span>{formatDate(featured.date)}</span>
                  <span>&middot;</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="bg-card py-24 md:py-32 w-full border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
              >
                <Link href={`/news/${article.slug}`} className="group flex flex-col h-full bg-background border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-colors focus-ring">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-mono text-xs tracking-widest uppercase text-accent mb-3">{article.category}</span>
                    <h3 className="text-lg text-foreground font-medium mb-3 leading-snug group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{article.excerpt}</p>
                    <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                      <span>{formatDate(article.date)}</span>
                      <span>&middot;</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
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
