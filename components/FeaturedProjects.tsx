"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { getFeaturedProjects, projects } from "@/lib/data";
import { pick } from "@/lib/locale";

export function FeaturedProjects() {
  const { t, locale } = useLanguage();
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.projects.label}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="space-y-8">
          {featured.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.1}>
              <GlassPanel hover className="group overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-5">
                  <div className="relative min-h-[200px] bg-gradient-to-br from-accent/10 via-transparent to-foreground/5 lg:col-span-2 lg:min-h-[320px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="mb-2 text-xs font-medium tracking-widest text-muted uppercase">
                          {t.projects.featured}
                        </p>
                        <p className="text-2xl font-semibold text-foreground/80 md:text-3xl">
                          {pick(project.title, locale)}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:from-transparent" />
                  </div>

                  <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-10">
                    <p className="mb-4 text-base leading-relaxed text-muted md:text-lg">
                      {pick(project.description, locale)}
                    </p>

                    <div className="mb-6 space-y-3">
                      <div>
                        <p className="mb-1 text-xs font-medium tracking-wider text-muted uppercase">
                          {t.projects.businessValue}
                        </p>
                        <p className="text-sm text-foreground/90">
                          {pick(project.businessValue, locale)}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-medium tracking-wider text-muted uppercase">
                          {t.projects.result}
                        </p>
                        <p className="text-sm text-foreground/90">
                          {pick(project.result, locale)}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                      >
                        {t.projects.viewDetails}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                        >
                          <SocialIcon name="github" className="h-4 w-4" />
                          {t.projects.github}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </FadeIn>
          ))}
        </div>

        {projects.length > featured.length && (
          <FadeIn delay={0.3} className="mt-12 text-center">
            <p className="mb-6 text-sm text-muted">
              + {projects.length - featured.length}{" "}
              {t.projects.moreProjects}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((p) => !p.featured)
                .map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group glass rounded-2xl p-6 transition-all hover:bg-foreground/[0.04]"
                  >
                    <h3 className="mb-2 font-semibold text-foreground group-hover:opacity-80">
                      {pick(project.title, locale)}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted">
                      {pick(project.description, locale)}
                    </p>
                  </Link>
                ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
