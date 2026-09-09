import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Expertise & Services',
};

export const metadata: Metadata = {
  title: 'Expertise & Services',
  description:
    'Island Tower delivers MEP engineering, infrastructure, civil works, chemical facilities, water treatment, energy solutions, and R&D for major projects across the UAE and Saudi Arabia.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    title: 'Expertise & Services | Island Tower',
    description:
      'MEP engineering, infrastructure, civil works, chemical facilities, water treatment, energy solutions, and R&D — delivered across the UAE and Saudi Arabia.',
    url: '/services',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expertise & Services | Island Tower',
    description:
      'MEP engineering, infrastructure, civil works, chemical facilities, water treatment, energy solutions, and R&D — delivered across the UAE and Saudi Arabia.',
    images: [ogImage.url],
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
