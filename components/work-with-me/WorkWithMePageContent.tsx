"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { InquiryForm } from "@/components/work-with-me/InquiryForm";
import {
  workWithMeServices,
  workWithMeProcess,
  workWithMeFaq,
} from "@/lib/work-with-me/content";
import { pick } from "@/lib/locale";

export function WorkWithMePageContent() {
  const { t, locale } = useLanguage();
  const w = t.workWithMe;
  const process = workWithMeProcess[locale];
  const faq = workWithMeFaq[locale];

  return (
    <div className="gradient-mesh min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {w.backHome}
        </Link>

        <SectionHeading label={w.label} title={w.title} subtitle={w.subtitle} />

        <FadeIn>
          <h2 className="mb-6 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {w.servicesTitle}
          </h2>
        </FadeIn>

        <div className="mb-20 space-y-6">
          {workWithMeServices.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.08}>
              <GlassPanel className="p-8 md:p-10">
                <h3 className="mb-4 text-xl font-semibold text-foreground">
                  {pick(service.title, locale)}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted md:text-base">
                  {pick(service.description, locale)}
                </p>
                <ul className="space-y-2">
                  {service.highlights[locale].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-foreground/85"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <h2 className="mb-8 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {w.processTitle}
          </h2>
        </FadeIn>

        <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.06}>
              <GlassPanel className="h-full p-6">
                <p className="mb-3 font-mono text-xs text-muted">{step.step}</p>
                <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </GlassPanel>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <h2 className="mb-8 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {w.faqTitle}
          </h2>
        </FadeIn>

        <div className="mb-20 space-y-4">
          {faq.map((item, i) => (
            <FadeIn key={item.q} delay={i * 0.05}>
              <GlassPanel className="p-6 md:p-8">
                <h3 className="mb-3 font-medium text-foreground">{item.q}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.a}</p>
              </GlassPanel>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <InquiryForm />
        </FadeIn>
      </div>
    </div>
  );
}
