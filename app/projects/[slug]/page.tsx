import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import ProjectDetailContent from './ProjectDetailContent';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = project.description;
  const ogImage = { url: project.image, width: 1200, height: 630, alt: project.title };

  return {
    title,
    description,
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

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetailContent project={project} />;
}
