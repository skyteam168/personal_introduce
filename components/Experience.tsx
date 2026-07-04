"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState(0);
  const item = experience[active];

  const tabs = [
    { key: "achievements" as const, items: item.achievements },
    { key: "businessImpact" as const, items: item.businessImpact },
    { key: "leadership" as const, items: item.leadership },
    { key: "techEvolution" as const, items: item.techEvolution },
  ].filter((tab) => tab.items.length > 0);

  return (
    <section id="experience" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.experience.label}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            {experience.map((exp, i) => (
              <FadeIn key={exp.year} delay={i * 0.08}>
                <button
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full rounded-2xl px-5 py-4 text-left transition-all duration-300",
                    active === i
                      ? "bg-foreground text-background"
                      : "glass text-muted hover:text-foreground"
                  )}
                >
                  <p className="text-xs tracking-wider uppercase opacity-70">
                    {exp.year}
                  </p>
                  <p className="mt-1 font-semibold">{exp.role}</p>
                  <p className="mt-0.5 text-xs opacity-70">{exp.company}</p>
                </button>
              </FadeIn>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
            >
              <GlassPanel className="p-8 md:p-10">
                <p className="mb-8 text-lg leading-relaxed text-foreground/90 md:text-xl">
                  {locale === "zh" ? item.story.zh : item.story.en}
                </p>

                <div className="space-y-8">
                  {tabs.map((tab) => (
                    <div key={tab.key}>
                      <h4 className="mb-4 text-xs font-medium tracking-[0.15em] text-muted uppercase">
                        {t.experience[tab.key]}
                      </h4>
                      <ul className="space-y-3">
                        {tab.items.map((entry) => (
                          <li
                            key={entry.en}
                            className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {locale === "zh" ? entry.zh : entry.en}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
