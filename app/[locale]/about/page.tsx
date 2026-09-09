import type { Metadata } from 'next';
import AboutContent from './AboutContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — About Us',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'من نحن' : 'About Us';
  const description = isAr
    ? 'أمضت شركة جزيرة البرج للأعمال الكهروميكانيكية ذ.م.م أكثر من 15 عاماً في تنفيذ مشاريع البنية التحتية والأعمال الكهروميكانيكية والهندسة المدنية في الإمارات العربية المتحدة والمملكة العربية السعودية.'
    : "Island Tower Electro Mechanical Works LLC has spent over 15 years delivering infrastructure, MEP, and civil engineering projects across the UAE and Saudi Arabia. Learn our story, values, and track record.";
  const ogDescription = isAr
    ? 'جزيرة البرج للأعمال الكهروميكانيكية — أكثر من 15 عاماً في تنفيذ مشاريع البنية التحتية والأعمال الكهروميكانيكية والهندسة المدنية.'
    : 'Island Tower Electro Mechanical Works LLC — 15+ years delivering infrastructure, MEP, and civil engineering projects across the UAE and Saudi Arabia.';

  return {
    title,
    description,
    alternates: { canonical: isAr ? '/ar/about' : '/about' },
    openGraph: {
      type: 'website',
      title: `${title} | Island Tower`,
      description: ogDescription,
      url: isAr ? '/ar/about' : '/about',
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

export default function AboutPage() {
  return <AboutContent />;
}
