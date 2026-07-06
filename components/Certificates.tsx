"use client";

import { Award, Globe, Clock } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { certificates } from "@/lib/data";
import { pick } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function Certificates() {
  const { t, locale } = useLanguage();

  return (
    <section id="certificates" className="section-padding border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.certificates.label}
          title={t.certificates.title}
          subtitle={t.certificates.subtitle}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <FadeIn key={cert.name.en} delay={i * 0.08}>
              <GlassPanel
                className={cn(
                  "p-6 transition-colors",
                  cert.status !== "active" && "opacity-60"
                )}
              >
              <div className="mb-4 flex items-center justify-between">
                {cert.status === "active" ? (
                  <Award className="h-5 w-5 text-foreground/60" />
                ) : (
                  <Clock className="h-5 w-5 text-muted" />
                )}
                {cert.year && (
                  <span className="font-mono text-xs text-muted">{cert.year}</span>
                )}
              </div>
              <h3 className="mb-1 text-base font-semibold text-foreground">
                {pick(cert.name, locale)}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Globe className="h-3.5 w-3.5" />
                {pick(cert.issuer, locale)}
              </div>
            </GlassPanel>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
