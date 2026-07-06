import { createHash } from "crypto";
import { headers } from "next/headers";
import { personalInfo } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";
import type { Inquiry } from "@/lib/db/schema";
import type { Locale } from "@/lib/locale";

const NOTIFY_EMAIL =
  process.env.INQUIRY_NOTIFY_EMAIL?.trim() || personalInfo.email;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

const AUTO_REPLY: Record<
  Locale,
  { subject: string; build: (name: string, company: string) => string }
> = {
  zh: {
    subject: "已收到您的合作咨询 — Xiaowei Yang",
    build: (name, company) => `您好 ${name}，

感谢联系。我已收到来自 ${company} 的咨询，将在 24 小时内回复。

— Xiaowei Yang
Enterprise AI Solutions Architect
${getSiteUrl()}`,
  },
  en: {
    subject: "Inquiry received — Xiaowei Yang",
    build: (name, company) => `Hi ${name},

Thank you for reaching out. I've received your inquiry from ${company} and will respond within 24 hours.

— Xiaowei Yang
Enterprise AI Solutions Architect
${getSiteUrl()}`,
  },
  vi: {
    subject: "Đã nhận yêu cầu tư vấn — Xiaowei Yang",
    build: (name, company) => `Xin chào ${name},

Cảm ơn bạn đã liên hệ. Tôi đã nhận yêu cầu từ ${company} và sẽ phản hồi trong 24 giờ.

— Xiaowei Yang
Enterprise AI Solutions Architect
${getSiteUrl()}`,
  },
};

export function hashClientIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function getClientIpHash(): Promise<string | null> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim();
  if (!ip) return null;
  return hashClientIp(ip);
}

async function sendViaResend(payload: {
  to: string | string[];
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    }),
  });

  return res.ok;
}

function formatInquiryText(inquiry: Inquiry): string {
  return [
    `Type: ${inquiry.type}`,
    `Company: ${inquiry.company}`,
    `Contact: ${inquiry.contactName}`,
    `Email: ${inquiry.email}`,
    inquiry.phone ? `Phone: ${inquiry.phone}` : null,
    inquiry.location ? `Location: ${inquiry.location}` : null,
    inquiry.timeline ? `Timeline: ${inquiry.timeline}` : null,
    inquiry.budgetRange ? `Budget: ${inquiry.budgetRange}` : null,
    inquiry.locale ? `Locale: ${inquiry.locale}` : null,
    "",
    inquiry.description,
    "",
    `Admin: ${getSiteUrl()}/admin/inquiries`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function notifyNewInquiry(inquiry: Inquiry) {
  await sendViaResend({
    to: NOTIFY_EMAIL,
    subject: `[Inquiry] ${inquiry.company} — ${inquiry.type}`,
    text: formatInquiryText(inquiry),
  });
}

export async function sendInquiryAutoReply(inquiry: Inquiry) {
  const locale: Locale =
    inquiry.locale === "zh" || inquiry.locale === "vi" ? inquiry.locale : "en";
  const template = AUTO_REPLY[locale];

  await sendViaResend({
    to: inquiry.email,
    subject: template.subject,
    text: template.build(inquiry.contactName, inquiry.company),
  });
}
