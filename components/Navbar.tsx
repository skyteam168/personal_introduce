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
  { key: "skills" as const, href: "/#skills" },
  { key: "experience" as const, href: "/#experience" },
  { key: "projects" as const, href: "/#projects" },
  { key: "blog" as const, href: "/blog", isRoute: true },
  { key: "certificates" as const, href: "/#certificates" },
  { key: "contact" as const, href: "/#contact" },
];

export function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      style={{ opacity: navOpacity }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-18">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          XY
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-border p-0.5 sm:flex">
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
