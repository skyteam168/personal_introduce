"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data";
import { pick } from "@/lib/locale";

export function Projects() {
  const { t, locale } = useLanguage();

  return (
    <section id="projects" className="section-padding border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.projects.label}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={project.featured ? "md:col-span-2" : ""}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface/20 p-6 transition-all hover:border-foreground/20 hover:bg-surface/40 md:p-8"
              >
                {project.featured && (
                  <span className="absolute top-6 right-6 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted">
                    {t.projects.featured}
                  </span>
                )}

                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: project.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5 fill-foreground text-foreground"
                    />
                  ))}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-foreground/80">
                  {pick(project.title, locale)}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                  {pick(project.description, locale)}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                  {t.projects.viewDetails}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
