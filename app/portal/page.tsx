import type { Metadata } from 'next';
import PortalContent from './PortalContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Client Portal',
};

export const metadata: Metadata = {
  title: 'Client Portal',
  description:
    'Island Tower client portal — track active projects, access documents and reports, and stay in sync with your project team. Request access to get started.',
  alternates: { canonical: '/portal' },
  openGraph: {
    type: 'website',
    title: 'Client Portal | Island Tower',
    description:
      'Track active projects, access documents and reports, and stay in sync with your Island Tower project team.',
    url: '/portal',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Portal | Island Tower',
    description:
      'Track active projects, access documents and reports, and stay in sync with your Island Tower project team.',
    images: [ogImage.url],
  },
};

export default function PortalPage() {
  return <PortalContent />;
}
