"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { capabilityDomains, type ProficiencyLevel } from "@/lib/data";
import { cn } from "@/lib/utils";

const levelStyles: Record<ProficiencyLevel, string> = {
  expert: "bg-foreground text-background",
  advanced: "bg-foreground/10 text-foreground",
  intermediate: "bg-foreground/5 text-muted",
};

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.skills.label}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {capabilityDomains.map((domain, i) => (
            <FadeIn key={domain.id} delay={i * 0.08}>
              <GlassPanel hover className="p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-foreground md:text-lg">
                    {t.skills.domains[domain.id as keyof typeof t.skills.domains]}
                  </h3>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                      levelStyles[domain.level]
                    )}
                  >
                    {t.skills.levels[domain.level]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {domain.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-foreground/[0.04] px-3 py-1.5 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
