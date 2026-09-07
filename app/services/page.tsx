import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Expertise & Services',
  description:
    'Island Tower delivers MEP engineering, infrastructure, civil works, chemical facilities, water treatment, energy solutions, and R&D for major projects across the UAE and Saudi Arabia.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Expertise & Services | Island Tower',
    description:
      'MEP engineering, infrastructure, civil works, chemical facilities, water treatment, energy solutions, and R&D — delivered across the UAE and Saudi Arabia.',
    url: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
