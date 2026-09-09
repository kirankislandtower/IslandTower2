import type { Metadata } from 'next';
import ContactContent from './ContactContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Contact',
};

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Island Tower Electro Mechanical Works LLC — offices in Dubai, UAE and Riyadh, Saudi Arabia. Reach our team for MEP, infrastructure, and civil engineering projects.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact | Island Tower',
    description:
      'Get in touch with Island Tower Electro Mechanical Works LLC — offices in Dubai, UAE and Riyadh, Saudi Arabia.',
    url: '/contact',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Island Tower',
    description:
      'Get in touch with Island Tower Electro Mechanical Works LLC — offices in Dubai, UAE and Riyadh, Saudi Arabia.',
    images: [ogImage.url],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
