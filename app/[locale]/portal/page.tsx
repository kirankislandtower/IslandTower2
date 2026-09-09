import type { Metadata } from 'next';
import PortalContent from './PortalContent';

const ogImage = {
  url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  width: 1200,
  height: 630,
  alt: 'Island Tower — Client Portal',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'بوابة العملاء' : 'Client Portal';
  const description = isAr
    ? 'بوابة عملاء جزيرة البرج — تتبع المشاريع النشطة، والوصول إلى الوثائق والتقارير، والبقاء على تواصل مع فريق مشروعك. اطلب الوصول للبدء.'
    : 'Island Tower client portal — track active projects, access documents and reports, and stay in sync with your project team. Request access to get started.';
  const ogDescription = isAr
    ? 'تتبع المشاريع النشطة والوصول إلى الوثائق والتقارير والبقاء على تواصل مع فريق مشروعك في جزيرة البرج.'
    : 'Track active projects, access documents and reports, and stay in sync with your Island Tower project team.';

  return {
    title,
    description,
    alternates: { canonical: isAr ? '/ar/portal' : '/portal' },
    openGraph: {
      type: 'website',
      title: `${title} | Island Tower`,
      description: ogDescription,
      url: isAr ? '/ar/portal' : '/portal',
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

export default function PortalPage() {
  return <PortalContent />;
}
