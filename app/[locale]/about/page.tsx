import type { Metadata } from 'next';
import AboutContent from './AboutContent';

const ogImage = {
  url: '/images/site/rooftop-piping-install.jpg',
  width: 1200,
  height: 630,
  alt: 'Island Tower — About Us',
};

const FOUNDED_YEAR = 2003;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const years = new Date().getFullYear() - FOUNDED_YEAR;

  const title = isAr ? 'من نحن' : 'About Us';
  const description = isAr
    ? `منذ 2003 تبني جزيرة البرج شبكات المياه المبردة في الإمارات. تعرف على قصتنا واعتمادنا من هيئة الطرق وشهادات ISO الثلاث.`
    : `Since 2003, Island Tower has built the UAE's chilled water networks. Our story, our RTA approval and our three ISO certificates.`;
  const ogDescription = isAr
    ? `جزيرة البرج — أكثر من ${years} عاماً في بناء شبكات المياه المبردة والأعمال الكهروميكانيكية في الإمارات.`
    : `Island Tower — ${years}+ years building chilled water networks and MEP works in the UAE.`;

  const keywords = isAr
    ? ['عن جزيرة البرج', 'مقاول كهروميكانيكي معتمد من هيئة الطرق والمواصلات', 'شركة جزيرة البرج للأعمال الكهروميكانيكية', 'مقاول معتمد من بلدية دبي', `${years} عاماً من الخبرة`, 'تاريخ شركة المقاولات', 'مقاول حاصل على شهادة الأيزو']
    : ['Island Tower Electro Mechanical Works LLC', 'RTA approved contractor Dubai', 'Dubai Municipality approved contractor', 'ISO certified MEP contractor UAE', `${years}+ years MEP contractor`, 'about Island Tower'];

  return {
    title,
    description,
    keywords,
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
