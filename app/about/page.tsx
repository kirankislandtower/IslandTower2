import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Island Tower Electro Mechanical Works LLC has spent over 15 years delivering infrastructure, MEP, and civil engineering projects across the UAE and Saudi Arabia. Learn our story, values, and track record.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Island Tower',
    description:
      'Island Tower Electro Mechanical Works LLC — 15+ years delivering infrastructure, MEP, and civil engineering projects across the UAE and Saudi Arabia.',
    url: '/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
