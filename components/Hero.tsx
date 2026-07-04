"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import {
  ArrowDown,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { personalInfo } from "@/lib/data";

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const glowX = useTransform(springX, [-0.5, 0.5], [-60, 60]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-40, 40]);

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
      className="gradient-mesh relative flex min-h-screen items-center overflow-hidden"
    >
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="hero-glow -top-32 left-1/4 h-[500px] w-[500px] bg-accent/20 dark:bg-accent/10"
        aria-hidden
      />
      <motion.div
        style={{ x: useTransform(springX, [-0.5, 0.5], [30, -30]) }}
        className="hero-glow top-1/3 right-0 h-[400px] w-[400px] bg-foreground/5"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-xs font-medium tracking-[0.25em] text-muted uppercase"
            >
              {t.hero.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
            >
              <span className="text-gradient">{t.hero.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mb-4 max-w-xl text-xl leading-snug font-medium text-foreground md:text-2xl lg:text-3xl"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mb-10 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
              >
                {t.hero.ctaProjects}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.resume}
                download
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground/5"
              >
                <Download className="h-4 w-4" />
                {t.hero.ctaResume}
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted transition-all hover:text-foreground"
                aria-label="GitHub"
              >
                <SocialIcon name="github" className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted transition-all hover:text-foreground"
                aria-label="LinkedIn"
              >
                <SocialIcon name="linkedin" className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto shrink-0"
          >
            <div className="relative h-56 w-56 overflow-hidden rounded-full md:h-72 md:w-72">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/30 via-transparent to-foreground/10" />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-surface">
                <Image
                  src={personalInfo.photo}
                  alt={t.hero.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 224px, 288px"
                />
              </div>
            </div>
            <div className="absolute -inset-8 -z-10 rounded-full bg-accent/10 blur-3xl" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest text-muted uppercase">
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
