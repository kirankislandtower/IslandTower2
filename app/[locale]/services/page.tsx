import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Expertise & Services',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'خدماتنا' : 'Expertise & Services';
  const description = isAr
    ? 'تقدم جزيرة البرج خدمات الهندسة الكهروميكانيكية والبنية التحتية والأعمال المدنية والمنشآت الكيميائية ومعالجة المياه وحلول الطاقة والبحث والتطوير للمشاريع الكبرى في الإمارات والسعودية.'
    : 'Island Tower delivers MEP engineering, infrastructure, civil works, chemical facilities, water treatment, energy solutions, and R&D for major projects across the UAE and Saudi Arabia.';
  const ogDescription = isAr
    ? 'الهندسة الكهروميكانيكية والبنية التحتية والأعمال المدنية والمنشآت الكيميائية ومعالجة المياه وحلول الطاقة والبحث والتطوير — منفذة عبر الإمارات والسعودية.'
    : 'MEP engineering, infrastructure, civil works, chemical facilities, water treatment, energy solutions, and R&D — delivered across the UAE and Saudi Arabia.';

  return {
    title,
    description,
    alternates: { canonical: isAr ? '/ar/services' : '/services' },
    openGraph: {
      type: 'website',
      title: `${title} | Island Tower`,
      description: ogDescription,
      url: isAr ? '/ar/services' : '/services',
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

export default function ServicesPage() {
  return <ServicesContent />;
}
