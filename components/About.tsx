"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.about.label}
          title={t.about.headline}
          subtitle={t.about.description}
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.highlights.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-surface/30 p-6 transition-colors hover:border-foreground/20 hover:bg-surface/60"
            >
              <div className="mb-3 h-px w-8 bg-foreground/30 transition-all group-hover:w-12" />
              <p className="text-sm font-medium text-foreground">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
