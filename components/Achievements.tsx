"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { achievementStats, achievementTextStat } from "@/lib/data";
import { pick } from "@/lib/locale";

export function Achievements() {
  const { t, locale } = useLanguage();

  return (
    <section id="achievements" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.achievements.label}
          title={t.achievements.title}
          subtitle={t.achievements.subtitle}
          align="center"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
          {achievementStats.map((stat, i) => (
            <FadeIn key={stat.label.en} delay={i * 0.08}>
              <GlassPanel className="flex flex-col items-center px-4 py-8 text-center md:px-6 md:py-10">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                />
                <p className="mt-3 text-xs leading-relaxed text-muted md:text-sm">
                  {pick(stat.label, locale)}
                </p>
              </GlassPanel>
            </FadeIn>
          ))}

          <FadeIn delay={0.5} className="col-span-2 md:col-span-1">
            <GlassPanel className="flex flex-col items-center px-4 py-8 text-center md:px-6 md:py-10">
              <span className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {achievementTextStat.value}
              </span>
              <p className="mt-3 text-xs leading-relaxed text-muted md:text-sm">
                {pick(achievementTextStat.label, locale)}
              </p>
            </GlassPanel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
