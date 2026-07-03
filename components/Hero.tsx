"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ParticleBackground } from "@/components/ParticleBackground";
import { personalInfo } from "@/lib/data";

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const textX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const textY = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  const avatarX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const avatarY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16">
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:gap-16 lg:text-left">
          <motion.div
            style={{ x: avatarX, y: avatarY }}
            className="relative mb-10 shrink-0 lg:mb-0"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-full border border-border/50 bg-surface md:h-40 md:w-40">
              <Image
                src="/avatar.svg"
                alt={t.hero.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -inset-4 -z-10 rounded-full bg-foreground/5 blur-2xl" />
          </motion.div>

          <motion.div style={{ x: textX, y: textY }} className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-sm font-medium tracking-widest text-muted uppercase"
            >
              {t.hero.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              {t.hero.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-xl text-lg text-muted md:text-xl lg:mx-0 lg:text-2xl"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {t.hero.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {t.hero.cta}
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.resumePdf}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                <Download className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
