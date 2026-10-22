import type { Metadata } from 'next';
import ContactContent from './ContactContent';

const ogImage = {
  url: '/images/site/rebar-formwork-crew.jpg',
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

  const keywords = isAr
    ? ['تواصل مع جزيرة البرج', 'مقاول كهروميكانيكي دبي', 'مكتب جزيرة البرج الرياض', 'طلب عرض سعر مقاولات']
    : ['contact Island Tower', 'MEP contractor Dubai office', 'Island Tower Riyadh office', 'get a quote MEP contractor UAE'];

  return {
    title,
    description,
    keywords,
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
