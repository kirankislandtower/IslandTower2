import type { Metadata } from 'next';
import AboutContent from './AboutContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — About Us',
};

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Island Tower Electro Mechanical Works LLC has spent over 15 years delivering infrastructure, MEP, and civil engineering projects across the UAE and Saudi Arabia. Learn our story, values, and track record.",
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    title: 'About Us | Island Tower',
    description:
      'Island Tower Electro Mechanical Works LLC — 15+ years delivering infrastructure, MEP, and civil engineering projects across the UAE and Saudi Arabia.',
    url: '/about',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Island Tower',
    description:
      'Island Tower Electro Mechanical Works LLC — 15+ years delivering infrastructure, MEP, and civil engineering projects across the UAE and Saudi Arabia.',
    images: [ogImage.url],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
