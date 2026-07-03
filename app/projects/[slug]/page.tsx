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
    title: `${project.title.en} — Xiaowei Yang`,
    description: project.description.en,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-6">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {project.title.en}
        </h1>

        <p className="mb-12 text-lg leading-relaxed text-muted">
          {project.description.en}
        </p>

        <div className="mb-12">
          <ArchitectureDiagram steps={project.architecture} />
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-border bg-surface/30 px-4 py-2 text-sm font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

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
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              <ExternalLink className="h-4 w-4" />
              Watch Demo
            </a>
          )}
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-16 rounded-2xl border border-border bg-surface/20 p-8">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Project Screenshots
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.screenshots.map((shot) => (
                <div
                  key={shot.src}
                  className="overflow-hidden rounded-xl border border-border bg-background"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt.en}
                    width={1280}
                    height={720}
                    className="h-auto w-full object-cover"
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
