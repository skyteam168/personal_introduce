"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/icons/TechIcons";
import { skills, skillCategories } from "@/lib/data";
import type { Skill } from "@/lib/data";

export function Skills() {
  const { t } = useLanguage();

  const grouped = skillCategories.map((category) => ({
    category,
    label: t.skills.categories[category],
    items: skills.filter((s) => s.category === category),
  }));

  return (
    <section id="skills" className="section-padding border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.skills.label}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className="space-y-12">
          {grouped.map(({ category, label, items }, groupIndex) => (
            <div key={category}>
              <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                {label}
              </h3>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-5">
                {items.map((skill: Skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.4,
                      delay: groupIndex * 0.05 + i * 0.04,
                    }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-surface/20 p-4 transition-all hover:border-border hover:bg-surface/50 md:p-5"
                  >
                    <TechIcon
                      name={skill.icon}
                      className="h-8 w-8 transition-transform group-hover:scale-110"
                    />
                    <span className="text-center text-xs font-medium text-muted transition-colors group-hover:text-foreground">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
