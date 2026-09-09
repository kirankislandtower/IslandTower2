import type { Metadata } from 'next';
import CareersContent from './CareersContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Careers',
};

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Build your career with Island Tower Electro Mechanical Works LLC. We hire engineers and site professionals across MEP, infrastructure, civil works, and energy & water disciplines in the UAE and Saudi Arabia.',
  alternates: { canonical: '/careers' },
  openGraph: {
    type: 'website',
    title: 'Careers | Island Tower',
    description:
      'Build your career with Island Tower — hiring engineers and site professionals across MEP, infrastructure, civil works, and energy & water disciplines.',
    url: '/careers',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | Island Tower',
    description:
      'Build your career with Island Tower — hiring engineers and site professionals across MEP, infrastructure, civil works, and energy & water disciplines.',
    images: [ogImage.url],
  },
};

export default function CareersPage() {
  return <CareersContent />;
}
