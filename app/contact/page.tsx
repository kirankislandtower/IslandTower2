import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Island Tower Electro Mechanical Works LLC — offices in Dubai, UAE and Riyadh, Saudi Arabia. Reach our team for MEP, infrastructure, and civil engineering projects.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Island Tower',
    description:
      'Get in touch with Island Tower Electro Mechanical Works LLC — offices in Dubai, UAE and Riyadh, Saudi Arabia.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
