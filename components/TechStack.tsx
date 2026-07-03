"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techProficiency } from "@/lib/data";

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="section-padding border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.techStack.label}
          title={t.techStack.title}
        />

        <div className="space-y-5">
          {techProficiency.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
                <span className="font-mono text-xs text-muted">{item.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                  className="h-full rounded-full bg-foreground"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
