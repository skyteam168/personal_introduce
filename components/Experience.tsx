"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

export function Experience() {
  const { t, locale } = useLanguage();

  return (
    <section id="experience" className="section-padding border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.experience.label}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experience.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative mb-12 flex items-start gap-8 md:mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden flex-1 md:block" />

              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
              </div>

              <div className="flex-1 rounded-2xl border border-border bg-surface/30 p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-xs font-medium tracking-wider text-muted uppercase">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                </div>
                <p className="mb-6 text-sm text-muted">{item.company}</p>

                <div className="space-y-0">
                  {item.milestones.map((milestone, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + j * 0.1 }}
                      className="relative flex items-center gap-4 py-3"
                    >
                      {j < item.milestones.length - 1 && (
                        <div className="absolute top-full left-[7px] h-full w-px bg-border" />
                      )}
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                      <span className="text-sm text-foreground/80">
                        {locale === "zh" ? milestone.zh : milestone.en}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
