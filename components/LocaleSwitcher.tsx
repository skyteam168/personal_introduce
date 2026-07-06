"use client";

import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  locale,
  setLocale,
  className,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-foreground/[0.08] p-0.5",
        className
      )}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            locale === code
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          )}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
