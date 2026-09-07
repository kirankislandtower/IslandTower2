import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A cross-section of the engineering, procurement, and construction projects Island Tower has delivered across the UAE and Saudi Arabia — from MEP fit-outs to water treatment expansions.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Island Tower',
    description:
      'A cross-section of the EPC projects Island Tower has delivered across the UAE and Saudi Arabia.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
