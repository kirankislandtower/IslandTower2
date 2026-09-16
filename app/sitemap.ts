import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { articles } from '@/lib/news';
import { industries } from '@/lib/industries';

const siteUrl = 'https://www.islandtoweruae.ae';

function withLocales(path: string) {
  const en = `${siteUrl}${path}`;
  const ar = `${siteUrl}/ar${path}`;
  return { en, ar };
}

function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
  lastModified: Date | string = new Date()
): MetadataRoute.Sitemap[number] {
  const { en, ar } = withLocales(path);
  return {
    url: en,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: { en, ar } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    entry('/', 'weekly', 1, now),
    entry('/about', 'monthly', 0.8, now),
    entry('/services', 'monthly', 0.9, now),
    entry('/projects', 'weekly', 0.9, now),
    ...projects.map((p) => entry(`/projects/${p.slug}`, 'monthly', 0.6, now)),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 'monthly', 0.6, now)),
    entry('/news', 'weekly', 0.7, now),
    ...articles.map((a) => entry(`/news/${a.slug}`, 'yearly', 0.5, a.date)),
    entry('/contact', 'monthly', 0.7, now),
    entry('/careers', 'monthly', 0.5, now),
    entry('/portal', 'yearly', 0.4, now),
  ];
}
