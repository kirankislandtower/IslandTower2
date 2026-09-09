import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Projects',
};

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A cross-section of the engineering, procurement, and construction projects Island Tower has delivered across the UAE and Saudi Arabia — from MEP fit-outs to water treatment expansions.',
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
