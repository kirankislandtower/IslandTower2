'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProofStrip from '@/components/ProofStrip';
import ClientLogos from '@/components/ClientLogos';
import WhatWeDo from '@/components/WhatWeDo';
import Solutions from '@/components/Solutions';
import Projects from '@/components/Projects';
import Platform from '@/components/Platform';
import Industries from '@/components/Industries';
import InsightsPreview from '@/components/InsightsPreview';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />
      <Hero onQuoteClick={() => setShowDemoModal(true)} />
      <ProofStrip />
      <ClientLogos />
      <WhatWeDo />
      <Solutions />
      <Projects />
      <Platform />
      <Industries />
      <InsightsPreview />
      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
