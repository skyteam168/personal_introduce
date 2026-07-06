"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { nowItems } from "@/lib/data";
import { pick } from "@/lib/locale";

export function Now() {
  const { t, locale } = useLanguage();

  const sections = [
    { key: "focus" as const, items: nowItems.focus },
    { key: "learning" as const, items: nowItems.learning },
    { key: "openTo" as const, items: nowItems.openTo },
  ];

  return (
    <section id="now" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.now.label}
          title={t.now.title}
          subtitle={t.now.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {sections.map(({ key, items }, i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <GlassPanel className="h-full p-8">
                <h3 className="mb-6 text-xs font-medium tracking-[0.2em] text-muted uppercase">
                  {t.now[key]}
                </h3>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={pick(item, locale)}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {pick(item, locale)}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
