"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { submitInquiry } from "@/lib/actions/inquiries";
import { inquiryTypes } from "@/lib/db/schema";
import {
  inquiryTypeLabels,
  budgetRangeOptions,
} from "@/lib/work-with-me/content";
import { pick } from "@/lib/locale";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-foreground/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground/25";

export function InquiryForm() {
  const { t, locale } = useLanguage();
  const w = t.workWithMe;
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setStatus("idle");
    setErrorKey(null);

    const formData = new FormData(e.currentTarget);
    formData.set("locale", locale);

    const result = await submitInquiry(formData);
    setPending(false);

    if (result.ok) {
      setStatus("success");
      e.currentTarget.reset();
      return;
    }

    setStatus("error");
    setErrorKey(result.error);
  }

  const budgets = budgetRangeOptions[locale];

  return (
    <div id="inquiry">
    <GlassPanel className="p-8 md:p-10">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
        {w.formTitle}
      </h2>
      <p className="mb-8 text-sm text-muted">{w.formSubtitle}</p>

      {status === "success" && (
        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          {w.success}
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700">
          {errorKey === "RATE_LIMIT"
            ? w.errorRateLimit
            : errorKey === "INVALID_INPUT"
              ? w.errorInvalid
              : w.errorGeneric}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.type}
            </label>
            <select name="type" required className={inputClass} defaultValue="development">
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {pick(inquiryTypeLabels[type], locale)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.company}
            </label>
            <input
              name="company"
              required
              maxLength={200}
              placeholder={w.placeholders.company}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.contactName}
            </label>
            <input
              name="contactName"
              required
              maxLength={120}
              placeholder={w.placeholders.contactName}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.email}
            </label>
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder={w.placeholders.email}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.phone}
            </label>
            <input
              name="phone"
              maxLength={50}
              placeholder={w.placeholders.phone}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.location}
            </label>
            <input
              name="location"
              maxLength={200}
              placeholder={w.placeholders.location}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.timeline}
            </label>
            <input
              name="timeline"
              maxLength={200}
              placeholder={w.placeholders.timeline}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">
              {w.fields.budget}
            </label>
            <select name="budgetRange" className={inputClass} defaultValue="">
              {budgets.map((b) => (
                <option key={b.value || "none"} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-muted">
            {w.fields.description}
          </label>
          <textarea
            name="description"
            required
            minLength={10}
            maxLength={2000}
            rows={6}
            placeholder={w.placeholders.description}
            className={cn(inputClass, "resize-y")}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "…" : w.cta}
        </button>
      </form>
    </GlassPanel>
    </div>
  );
}
