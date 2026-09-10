import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, localizeIndustry, industries, type Locale } from '@/lib/industries';
import IndustryDetailContent from './IndustryDetailContent';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = getIndustryBySlug(slug);
  if (!raw) return {};
  const industry = localizeIndustry(raw, locale as Locale);

  const isAr = locale === 'ar';
  const title = isAr ? `${industry.title} — القطاعات` : `${industry.title} — Sectors`;
  const description = industry.overview;
  const ogImage = { url: industry.image, width: 1200, height: 630, alt: industry.title };

  return {
    title,
    description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      type: 'article',
      title: `${title} | Island Tower`,
      description,
      url: `/industries/${industry.slug}`,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Island Tower`,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const raw = getIndustryBySlug(slug);
  if (!raw) notFound();
  const industry = localizeIndustry(raw, locale as Locale);
  return <IndustryDetailContent industry={industry} />;
}
