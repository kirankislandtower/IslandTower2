import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, articles } from '@/lib/news';
import ArticleContent from './ArticleContent';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const ogImage = { url: article.image, width: 1200, height: 630, alt: article.title };

  return {
    title: article.title,
    description: article.excerpt,
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

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return <ArticleContent article={article} />;
}
