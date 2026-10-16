import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, localizeArticle, articles, type Locale } from '@/lib/news';
import ArticleContent from './ArticleContent';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = getArticleBySlug(slug);
  if (!raw) return {};
  const article = localizeArticle(raw, locale as Locale);
  const isAr = locale === 'ar';

  const ogImage = { url: article.image, width: 1200, height: 630, alt: article.title };
  const keywords = isAr
    ? [article.title, `${article.category} الإمارات`, 'رؤى جزيرة البرج', 'مقالات هندسة كهروميكانيكية']
    : [article.title, `${article.category} UAE`, 'Island Tower insights', 'MEP industry news'];

  return {
    title: article.title,
    description: article.excerpt,
    keywords,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: 'article',
      title: `${article.title} | Island Tower`,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      images: [ogImage],
      publishedTime: article.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Island Tower`,
      description: article.excerpt,
      images: [ogImage.url],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const raw = getArticleBySlug(slug);
  if (!raw) notFound();
  const article = localizeArticle(raw, locale as Locale);
  return <ArticleContent article={article} />;
}
