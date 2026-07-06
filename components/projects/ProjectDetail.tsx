"use client";

import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Project } from "@/lib/data";
import { pick } from "@/lib/locale";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="gradient-mesh min-h-screen">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-6">
          <a
            href="/#projects"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.projects.backToWork}
          </a>
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
          {pick(project.title, locale)}
        </h1>

        <p className="mb-16 max-w-2xl text-lg leading-relaxed text-muted">
          {pick(project.description, locale)}
        </p>

        <CaseStudyBlock label={t.projects.businessValue}>
          <p className="text-base leading-relaxed text-foreground/90">
            {pick(project.businessValue, locale)}
          </p>
        </CaseStudyBlock>

        <CaseStudyBlock label={t.projects.challenges}>
          <ul className="space-y-3">
            {project.challenges.map((c) => (
              <li
                key={pick(c, locale)}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {pick(c, locale)}
              </li>
            ))}
          </ul>
        </CaseStudyBlock>

        <CaseStudyBlock label={t.projects.solutions}>
          <ul className="space-y-3">
            {project.solutions.map((s) => (
              <li
                key={pick(s, locale)}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {pick(s, locale)}
              </li>
            ))}
          </ul>
        </CaseStudyBlock>

        <div className="mb-12">
          <ArchitectureDiagram steps={project.architecture} />
        </div>

        <CaseStudyBlock label={t.projects.result}>
          <p className="glass rounded-2xl p-6 text-base leading-relaxed text-foreground/90">
            {pick(project.result, locale)}
          </p>
        </CaseStudyBlock>

        <CaseStudyBlock label={t.projects.technologyStack}>
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
              {t.projects.viewOnGithub}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
              {t.projects.liveDemo}
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
              {t.projects.watchDemo}
            </a>
          )}
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xs font-medium tracking-[0.2em] text-muted uppercase">
              {t.projects.preview}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.screenshots.map((shot) => (
                <div
                  key={shot.src}
                  className="glass overflow-hidden rounded-2xl"
                >
                  <Image
                    src={shot.src}
                    alt={pick(shot.alt, locale)}
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
