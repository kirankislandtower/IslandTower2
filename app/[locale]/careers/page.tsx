import type { Metadata } from 'next';
import CareersContent from './CareersContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Careers',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'الوظائف' : 'Careers';
  const description = isAr
    ? 'ابنِ مسيرتك المهنية مع شركة جزيرة البرج للأعمال الكهروميكانيكية ذ.م.م. نوظف مهندسين ومختصين ميدانيين في تخصصات الأعمال الكهروميكانيكية والبنية التحتية والأعمال المدنية والطاقة والمياه في الإمارات والسعودية.'
    : 'Build your career with Island Tower Electro Mechanical Works LLC. We hire engineers and site professionals across MEP, infrastructure, civil works, and energy & water disciplines in the UAE and Saudi Arabia.';
  const ogDescription = isAr
    ? 'ابنِ مسيرتك المهنية مع جزيرة البرج — نوظف مهندسين ومختصين ميدانيين في تخصصات متعددة.'
    : 'Build your career with Island Tower — hiring engineers and site professionals across MEP, infrastructure, civil works, and energy & water disciplines.';

  return {
    title,
    description,
    alternates: { canonical: isAr ? '/ar/careers' : '/careers' },
    openGraph: {
      type: 'website',
      title: `${title} | Island Tower`,
      description: ogDescription,
      url: isAr ? '/ar/careers' : '/careers',
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

export default function CareersPage() {
  return <CareersContent />;
}
