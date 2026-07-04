"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AuthButton } from "@/components/auth/AuthButton";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "about" as const, href: "/#about" },
  { key: "projects" as const, href: "/#projects" },
  { key: "architecture" as const, href: "/#architecture" },
  { key: "experience" as const, href: "/#experience" },
  { key: "skills" as const, href: "/#skills" },
  { key: "blog" as const, href: "/#blog", fallback: "/blog" },
  { key: "contact" as const, href: "/#contact" },
];

/** Scroll range for navbar surface fade-in */
const SCROLL_START = 0;
const SCROLL_END = 64;

export function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const surfaceOpacity = useTransform(
    scrollY,
    [SCROLL_START, SCROLL_END],
    [0, 1]
  );
  const borderOpacity = useTransform(
    scrollY,
    [SCROLL_START, SCROLL_END],
    [0, 0.12]
  );

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      {/* Background + blur — opacity driven by scroll, no hard toggle */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background/85 backdrop-blur-2xl backdrop-saturate-150"
        style={{ opacity: surfaceOpacity }}
      />

      {/* Bottom hairline — foreground color adapts to theme; opacity driven by scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px origin-bottom bg-foreground"
        style={{ opacity: borderOpacity }}
      />

      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          XY
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-foreground/[0.08] p-0.5 sm:flex">
            <button
              onClick={() => setLocale("zh")}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                locale === "zh"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              )}
            >
              中文
            </button>
            <button
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                locale === "en"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}

          <AuthButton />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-background/95 backdrop-blur-2xl lg:hidden"
        >
          <div className="absolute top-0 right-0 left-0 h-px bg-foreground/10" />
          <div className="flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
