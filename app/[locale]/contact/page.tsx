import type { Metadata } from 'next';
import ContactContent from './ContactContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Contact',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'تواصل معنا' : 'Contact';
  const description = isAr
    ? 'تواصل مع شركة جزيرة البرج للأعمال الكهروميكانيكية ذ.م.م — مكاتبنا في دبي والرياض. تواصل مع فريقنا لمشاريع الأعمال الكهروميكانيكية والبنية التحتية والهندسة المدنية.'
    : 'Get in touch with Island Tower Electro Mechanical Works LLC — offices in Dubai, UAE and Riyadh, Saudi Arabia. Reach our team for MEP, infrastructure, and civil engineering projects.';
  const ogDescription = isAr
    ? 'تواصل مع شركة جزيرة البرج للأعمال الكهروميكانيكية ذ.م.م — مكاتبنا في دبي والرياض.'
    : 'Get in touch with Island Tower Electro Mechanical Works LLC — offices in Dubai, UAE and Riyadh, Saudi Arabia.';

  return {
    title,
    description,
    alternates: { canonical: isAr ? '/ar/contact' : '/contact' },
    openGraph: {
      type: 'website',
      title: `${title} | Island Tower`,
      description: ogDescription,
      url: isAr ? '/ar/contact' : '/contact',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Island Tower`,
      description: ogDescription,
      images: [ogImage.url],
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
