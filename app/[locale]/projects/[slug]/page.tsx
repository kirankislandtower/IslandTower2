import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, localizeProject, projects, type Locale } from '@/lib/projects';
import ProjectDetailContent from './ProjectDetailContent';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = getProjectBySlug(slug);
  if (!raw) return {};
  const project = localizeProject(raw, locale as Locale);

  const isAr = locale === 'ar';
  const title = project.title;
  const description = project.description;
  const ogImage = { url: project.image, width: 1200, height: 630, alt: project.title };
  // City from the project's own location, so Abu Dhabi work is not tagged "Dubai".
  const city = project.location.split(/[,،]/)[0].trim();
  const isCooling = ['District Cooling', 'Flushing'].includes(raw.category.en);
  const keywords = isAr
    ? [project.title, `${project.category} ${city}`, project.location, 'مقاول جزيرة البرج', ...(isCooling ? ['مشروع تبريد مركزي الإمارات'] : [])]
    : [project.title, `${project.category} ${city}`, project.location, 'Island Tower contractor', ...(isCooling ? ['district cooling project UAE'] : [])];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${title} | Island Tower`,
      description,
      url: `/projects/${project.slug}`,
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const raw = getProjectBySlug(slug);
  if (!raw) notFound();
  const project = localizeProject(raw, locale as Locale);
  return <ProjectDetailContent project={project} />;
}
