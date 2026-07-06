"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Download, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/icons/SocialIcons";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { personalInfo, availability } from "@/lib/data";
import { pick } from "@/lib/locale";

const contactLinks = [
  {
    key: "email" as const,
    icon: "mail" as const,
    href: `mailto:${personalInfo.email}`,
    value: personalInfo.email,
  },
  {
    key: "github" as const,
    icon: "github" as const,
    href: personalInfo.github,
    value: "GitHub",
  },
  {
    key: "linkedin" as const,
    icon: "linkedin" as const,
    href: personalInfo.linkedin,
    value: "LinkedIn",
  },
  {
    key: "facebook" as const,
    icon: "facebook" as const,
    href: personalInfo.facebook,
    value: "Facebook",
  },
];

const availabilityBadges = [
  { key: "openToWork" as const, active: availability.openToWork },
  { key: "remote" as const, active: availability.remote },
  { key: "relocation" as const, active: availability.relocation },
  { key: "consulting" as const, active: availability.consulting },
];

export function Contact() {
  const { t, locale } = useLanguage();

  return (
    <section id="contact" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.contact.label}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <FadeIn className="mb-10 flex flex-wrap gap-2">
          {availabilityBadges
            .filter((b) => b.active)
            .map((badge) => (
              <span
                key={badge.key}
                className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-foreground"
              >
                {t.contact[badge.key]}
              </span>
            ))}
        </FadeIn>

        <FadeIn className="mb-10">
          <Link
            href="/work-with-me"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.nav.workWithMe}
            <span aria-hidden>→</span>
          </Link>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <FadeIn>
              <div className="mb-6 flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4" />
                {pick(personalInfo.location, locale)}
              </div>
            </FadeIn>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactLinks.map((link, i) => (
                <FadeIn key={link.key} delay={i * 0.06}>
                  <motion.a
                    href={link.href}
                    target={link.key === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5">
                      {link.icon === "mail" ? (
                        <Mail className="h-5 w-5 text-foreground/70" />
                      ) : (
                        <SocialIcon name={link.icon} />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted">{t.contact[link.key]}</p>
                      <p className="text-sm font-medium text-foreground">
                        {link.value}
                      </p>
                    </div>
                  </motion.a>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <a
                href={personalInfo.resume}
                download
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground/5"
              >
                <Download className="h-4 w-4" />
                {t.contact.resume}
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <GlassPanel className="p-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col items-center text-center">
                  <MessageCircle className="mb-4 h-6 w-6 text-muted" />
                  <p className="mb-4 text-sm font-medium text-foreground">
                    {t.contact.wechat}
                  </p>
                  <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-white/10 bg-background">
                    <Image
                      src={personalInfo.wechatQr}
                      alt="WeChat QR Code"
                      fill
                      sizes="160px"
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted">{t.contact.wechatHint}</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <MessageCircle className="mb-4 h-6 w-6 text-muted" />
                  <p className="mb-4 text-sm font-medium text-foreground">
                    {t.contact.wecom}
                  </p>
                  <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-white/10 bg-background">
                    <Image
                      src={personalInfo.wecomQr}
                      alt="WeCom QR Code"
                      fill
                      sizes="160px"
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted">{t.contact.wecomHint}</p>
                </div>
              </div>
            </GlassPanel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
