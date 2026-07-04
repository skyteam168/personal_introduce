"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { CAREER_STAGES } from "@/lib/brand";

export function About() {
  const { t, locale } = useLanguage();

  return (
    <section id="about" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.about.label}
          title={t.about.title}
          subtitle={t.about.subtitle}
        />

        <FadeIn>
          <p className="mb-16 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
            {t.about.story}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h3 className="mb-8 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {t.about.journeyTitle}
          </h3>
        </FadeIn>

        <div className="relative">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-border md:block" />
          <div className="grid gap-6 md:grid-cols-5">
            {CAREER_STAGES.map((stage, i) => (
              <FadeIn key={stage.key} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  <div
                    className={`relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border ${
                      stage.future
                        ? "border-dashed border-accent/50 bg-accent/5"
                        : "border-foreground/20 bg-background"
                    }`}
                  >
                    <span className="text-xs font-semibold text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <GlassPanel
                    className={`w-full p-5 ${stage.future ? "border-dashed border-accent/20" : ""}`}
                  >
                    <p
                      className={`text-sm font-medium leading-snug ${
                        stage.future ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {locale === "zh" ? stage.label.zh : stage.label.en}
                    </p>
                    {"hint" in stage && stage.hint && (
                      <p className="mt-1.5 text-xs text-muted">
                        {locale === "zh" ? stage.hint.zh : stage.hint.en}
                      </p>
                    )}
                    {stage.future && (
                      <p className="mt-2 text-xs text-muted">
                        {locale === "zh" ? "当前方向" : "Current focus"}
                      </p>
                    )}
                  </GlassPanel>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
