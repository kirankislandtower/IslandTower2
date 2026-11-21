'use client';

import { useState } from 'react';
import HomeNav from '@/components/home/HomeNav';
import EvHero from '@/components/home/EvHero';
import EvIntro from '@/components/home/EvIntro';
import EvServices from '@/components/home/EvServices';
import EvClients from '@/components/home/EvClients';
import EvApproach from '@/components/home/EvApproach';
import EvDeliver from '@/components/home/EvDeliver';
import EvSafety from '@/components/home/EvSafety';
import EvProjects from '@/components/home/EvProjects';
import EvInsights from '@/components/home/EvInsights';
import EvClosing from '@/components/home/EvClosing';
import QuoteModal from '@/components/QuoteModal';
import SectionIndicator from '@/components/SectionIndicator';

// Home page, in the order a client asks: who you are, what you do, who
// trusts you, how you work, what you deliver, how safely, where you have
// done it, what you know, and how to start.
export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => setQuoteOpen(true);

  return (
    <main className="bg-[#f4f3ea]">
      <HomeNav />
      <EvHero onQuote={openQuote} />
      <EvIntro />
      <EvServices />
      <EvClients />
      <EvApproach />
      <EvDeliver />
      <EvSafety />
      <div className="h-24 md:h-36 bg-[#f4f3ea]" aria-hidden="true" />
      <EvProjects />
      <EvInsights />
      <EvClosing onQuote={openQuote} />
      <SectionIndicator />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}
