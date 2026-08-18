'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import Solutions from '@/components/Solutions';
import Platform from '@/components/Platform';
import Industries from '@/components/Industries';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />
      <Hero onDemoClick={() => setShowDemoModal(true)} />
      <WhatWeDo />
      <Solutions />
      <Platform />
      <Industries />
      <Testimonials />
      <Footer onDemoClick={() => setShowDemoModal(true)} />
    </>
  );
}
