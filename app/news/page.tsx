import type { Metadata } from 'next';
import NewsContent from './NewsContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Insights',
};

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Perspectives on MEP engineering, HSE, water treatment, and EPC delivery from the Island Tower team, covering practical lessons from major projects across the UAE and Saudi Arabia.',
  alternates: { canonical: '/news' },
  openGraph: {
    type: 'website',
    title: 'Insights | Island Tower',
    description:
      'Perspectives on MEP engineering, HSE, water treatment, and EPC delivery from the Island Tower team.',
    url: '/news',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights | Island Tower',
    description:
      'Perspectives on MEP engineering, HSE, water treatment, and EPC delivery from the Island Tower team.',
    images: [ogImage.url],
  },
};

export default function NewsPage() {
  return <NewsContent />;
}
