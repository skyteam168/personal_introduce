"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  steps: string[];
  className?: string;
  vertical?: boolean;
}

export function ArchitectureDiagram({
  steps,
  className,
  vertical = true,
}: ArchitectureDiagramProps) {
  const { t } = useLanguage();

  return (
    <div className={cn("rounded-2xl border border-border bg-surface/20 p-6 md:p-8", className)}>
      <h3 className="mb-8 text-center text-sm font-medium tracking-wider text-muted uppercase">
        {t.architecture.title}
      </h3>

      <div
        className={cn(
          "flex items-center justify-center gap-0",
          vertical ? "flex-col" : "flex-row flex-wrap"
        )}
      >
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-xl border border-border bg-background px-5 py-3 text-center",
                i === 0 && "border-foreground/30",
                i === steps.length - 1 && "border-foreground/30 bg-foreground text-background"
              )}
            >
              <span className="text-sm font-medium">{step}</span>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="flex flex-col items-center py-2"
              >
                <div className="h-6 w-px bg-border" />
                <span className="text-xs text-muted">↓</span>
                <div className="h-6 w-px bg-border" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
