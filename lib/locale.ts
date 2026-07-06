export type Locale = "zh" | "en" | "vi";

export const LOCALES: Locale[] = ["zh", "en", "vi"];

export type Localized = Record<Locale, string>;

export const LOCALE_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  vi: "VI",
};

export const HTML_LANG: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  vi: "vi",
};

/** Resolve localized string with en → zh fallback */
export function pick(text: Localized, locale: Locale): string {
  return text[locale] ?? text.en ?? text.zh;
}

export function pickList(items: Localized[], locale: Locale): string[] {
  return items.map((item) => pick(item, locale));
}
