import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

const ogImage = {
  url: '/images/site/steel-structure-piping.jpg',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Services',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'خدماتنا' : 'Services';
  const description = isAr
    ? 'شبكات المياه المبردة وغسيلها والتنظيف الكيميائي ومحطات نقل الطاقة والتوصيل على الخطوط العاملة وأعمال حرم الطرق، إلى جانب الخدمات الكهروميكانيكية الكاملة للمباني.'
    : 'Chilled water networks, flushing and chemical cleaning, ETS and hot tapping, and RTA right-of-way works, plus full MEP services for buildings.';
  const ogDescription = isAr
    ? 'التبريد المركزي وشبكات المياه المبردة أولاً، مع خدمات كهروميكانيكية متكاملة للمباني.'
    : 'District cooling and chilled water networks first, with full MEP services for buildings.';

  const keywords = isAr
    ? ['خدمات الهندسة الكهروميكانيكية دبي', 'تنظيف خطوط المياه المبردة', 'مقاول تبريد مركزي دبي', 'خدمات الأعمال المدنية الإمارات', 'الجودة والصحة والسلامة في المقاولات', 'لحام مواسير HDPE دبي', 'تمديد مواسير GRP الإمارات']
    : ['MEP services Dubai', 'chilled water flushing services UAE', 'district cooling piping installation', 'civil engineering services UAE', 'HSE compliant contractor Dubai', 'sustainable MEP contractor UAE', 'HDPE pipe welding Dubai', 'GRP pipe installation UAE', 'chilled water pump installation Dubai'];

  return {
    title,
    description,
    keywords,
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
