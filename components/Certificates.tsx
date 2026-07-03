"use client";

import { motion } from "framer-motion";
import { Award, Globe, Clock } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certificates } from "@/lib/data";
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
            <motion.div
              key={cert.name.zh}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={cn(
                "rounded-2xl border p-6 transition-colors",
                cert.status === "active"
                  ? "border-border bg-surface/30 hover:bg-surface/50"
                  : "border-dashed border-border/50 bg-transparent opacity-60"
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
                {locale === "zh" ? cert.name.zh : cert.name.en}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Globe className="h-3.5 w-3.5" />
                {locale === "zh" ? cert.issuer.zh : cert.issuer.en}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
