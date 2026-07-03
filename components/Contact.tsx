"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { SocialIcon } from "@/components/icons/SocialIcons";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalInfo } from "@/lib/data";

const contactLinks = [
  {
    key: "email" as const,
    icon: "mail" as const,
    href: `mailto:${personalInfo.email}`,
    value: personalInfo.email,
  },
  {
    key: "phone" as const,
    icon: "phone" as const,
    href: `tel:${personalInfo.phone}`,
    value: personalInfo.phone,
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
];

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.contact.label}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                target={link.key === "email" || link.key === "phone" ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/20 p-5 transition-all hover:border-foreground/20 hover:bg-surface/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-foreground/70">
                  {link.icon === "mail" && <Mail className="h-5 w-5" />}
                  {link.icon === "phone" && <Phone className="h-5 w-5" />}
                  {link.icon === "github" && <SocialIcon name="github" />}
                  {link.icon === "linkedin" && <SocialIcon name="linkedin" />}
                </div>
                <div>
                  <p className="text-xs text-muted">{t.contact[link.key]}</p>
                  <p className="text-sm font-medium text-foreground">
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface/20 p-8"
          >
            <MessageCircle className="mb-4 h-6 w-6 text-muted" />
            <p className="mb-4 text-sm font-medium text-foreground">
              {t.contact.wechat}
            </p>
            <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-border bg-background">
              <Image
                src={personalInfo.wechatQr}
                alt="WeChat QR Code"
                fill
                sizes="160px"
                className="object-contain p-2"
                unoptimized
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              Scan to connect
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
