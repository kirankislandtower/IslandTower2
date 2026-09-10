'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import Solutions from '@/components/Solutions';
import Platform from '@/components/Platform';
import Industries from '@/components/Industries';
import Projects from '@/components/Projects';
import InsightsPreview from '@/components/InsightsPreview';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />
      <Hero />
      <WhatWeDo />
      <Solutions />
      <Platform />
      <Industries />
      <Projects />
      <InsightsPreview />
      <Testimonials />
      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
