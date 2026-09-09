import type { Metadata } from 'next';
import NewsContent from './NewsContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Insights',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'المقالات' : 'Insights';
  const description = isAr
    ? 'رؤى حول الهندسة الكهروميكانيكية والصحة والسلامة ومعالجة المياه وتنفيذ مشاريع EPC من فريق جزيرة البرج، تغطي دروساً عملية من مشاريع كبرى في الإمارات والسعودية.'
    : 'Perspectives on MEP engineering, HSE, water treatment, and EPC delivery from the Island Tower team, covering practical lessons from major projects across the UAE and Saudi Arabia.';
  const ogDescription = isAr
    ? 'رؤى حول الهندسة الكهروميكانيكية والصحة والسلامة ومعالجة المياه وتنفيذ مشاريع EPC من فريق جزيرة البرج.'
    : 'Perspectives on MEP engineering, HSE, water treatment, and EPC delivery from the Island Tower team.';

  return {
    title,
    description,
    alternates: { canonical: isAr ? '/ar/news' : '/news' },
    openGraph: {
      type: 'website',
      title: `${title} | Island Tower`,
      description: ogDescription,
      url: isAr ? '/ar/news' : '/news',
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

export default function NewsPage() {
  return <NewsContent />;
}
