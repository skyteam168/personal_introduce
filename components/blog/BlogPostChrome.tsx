"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { DATE_LOCALE } from "@/lib/locale";

export function BlogBackLink() {
  const { t } = useLanguage();

  return (
    <Link
      href="/blog"
      className="mb-8 inline-block text-sm text-muted hover:text-foreground"
    >
      {t.blog.backToBlog}
    </Link>
  );
}

export function LocalizedDate({ date }: { date: Date | string }) {
  const { locale } = useLanguage();
  const value = typeof date === "string" ? new Date(date) : date;

  return (
    <time dateTime={value.toISOString()}>
      {value.toLocaleDateString(DATE_LOCALE[locale])}
    </time>
  );
}
