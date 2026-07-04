"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { BRAND } from "@/lib/brand";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-foreground">
            Xiaowei Yang
          </p>
          <p className="mt-1 text-xs text-muted">{BRAND.title}</p>
        </div>
        <p className="text-sm text-muted">
          © {year} Xiaowei Yang. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
