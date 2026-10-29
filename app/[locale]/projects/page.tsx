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
    'District cooling, chilled water flushing and MEP projects by Island Tower, including Abu Dhabi Airport, the Presidential Palace and Jumeirah Village networks.',
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
      'District cooling, flushing and MEP projects by Island Tower across the UAE.',
    url: '/projects',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Island Tower',
    description:
      'District cooling, flushing and MEP projects by Island Tower across the UAE.',
    images: [ogImage.url],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
