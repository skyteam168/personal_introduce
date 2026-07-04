import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { getProjectBySlug, projects } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title.en,
    description: project.description.en,
  };
}

function CaseStudyBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-xs font-medium tracking-[0.2em] text-muted uppercase">
        {label}
      </h2>
      {children}
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="gradient-mesh min-h-screen">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-6">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Work
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-3xl font-semibold tracking-tight md:text-5xl">
          {project.title.en}
        </h1>

        <p className="mb-16 max-w-2xl text-lg leading-relaxed text-muted">
          {project.description.en}
        </p>

        <CaseStudyBlock label="Business Value">
          <p className="text-base leading-relaxed text-foreground/90">
            {project.businessValue.en}
          </p>
        </CaseStudyBlock>

        <CaseStudyBlock label="Challenges">
          <ul className="space-y-3">
            {project.challenges.map((c) => (
              <li
                key={c.en}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {c.en}
              </li>
            ))}
          </ul>
        </CaseStudyBlock>

        <CaseStudyBlock label="Solutions">
          <ul className="space-y-3">
            {project.solutions.map((s) => (
              <li
                key={s.en}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {s.en}
              </li>
            ))}
          </ul>
        </CaseStudyBlock>

        <div className="mb-12">
          <ArchitectureDiagram steps={project.architecture} />
        </div>

        <CaseStudyBlock label="Result">
          <p className="glass rounded-2xl p-6 text-base leading-relaxed text-foreground/90">
            {project.result.en}
          </p>
        </CaseStudyBlock>

        <CaseStudyBlock label="Technology Stack">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-foreground/5 px-4 py-2 text-sm text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </CaseStudyBlock>

        <div className="flex flex-wrap gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <SocialIcon name="github" className="h-4 w-4" />
              View on GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Watch Demo
            </a>
          )}
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xs font-medium tracking-[0.2em] text-muted uppercase">
              Preview
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.screenshots.map((shot) => (
                <div
                  key={shot.src}
                  className="glass overflow-hidden rounded-2xl"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt.en}
                    width={1280}
                    height={720}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
