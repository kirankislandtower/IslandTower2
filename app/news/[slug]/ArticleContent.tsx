'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import type { Article } from '@/lib/news';
import { articles } from '@/lib/news';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticleContent({ article }: { article: Article }) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[50vh] w-full flex flex-col justify-end overflow-hidden bg-[#111]">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/60 via-[#111]/40 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full max-w-3xl mx-auto px-6 mt-20 pb-16"
        >
          <Link
            href="/news"
            className="flex w-fit items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors focus-ring mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            All Insights
          </Link>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{article.category}</span>
          <h1 className="text-3xl md:text-5xl text-white font-normal tracking-tight leading-[1.1] mt-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 font-mono text-xs tracking-widest uppercase text-white/60 mt-6">
            <span>{formatDate(article.date)}</span>
            <span>&middot;</span>
            <span>{article.readTime}</span>
          </div>
        </motion.div>
      </section>

      {/* Article Body */}
      <section className="bg-background py-24 md:py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto px-6 flex flex-col gap-6"
        >
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-foreground text-base md:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </section>

      {/* More Insights */}
      <section className="bg-card py-24 md:py-32 w-full border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">More Insights</span>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {more.map((a) => (
              <Link
                key={a.slug}
                href={`/news/${a.slug}`}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg focus-ring"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-mono text-xs tracking-widest uppercase text-white/70">{a.category}</span>
                  <h3 className="text-xl text-white font-medium mt-1">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
