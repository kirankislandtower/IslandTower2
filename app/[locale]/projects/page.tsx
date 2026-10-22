import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

const ogImage = {
  url: '/images/site/tunnel-piping-run.jpg',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Projects',
};

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A cross-section of the engineering, procurement, and construction projects Island Tower has delivered across the UAE and Saudi Arabia — from MEP fit-outs to water treatment expansions.',
  keywords: [
    'EPC projects UAE',
    'district cooling projects Dubai',
    'MEP case studies UAE',
    'chilled water network projects Dubai',
    'Island Tower project portfolio',
  ],
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    title: 'Projects | Island Tower',
    description:
      'A cross-section of the EPC projects Island Tower has delivered across the UAE and Saudi Arabia.',
    url: '/projects',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Island Tower',
    description:
      'A cross-section of the EPC projects Island Tower has delivered across the UAE and Saudi Arabia.',
    images: [ogImage.url],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
