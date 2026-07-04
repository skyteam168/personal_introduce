import { createHash } from "crypto";
import { headers } from "next/headers";
import { personalInfo } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";
import type { Inquiry } from "@/lib/db/schema";

const NOTIFY_EMAIL =
  process.env.INQUIRY_NOTIFY_EMAIL?.trim() || personalInfo.email;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

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
  const isZh = inquiry.locale === "zh";
  const subject = isZh
    ? "已收到您的合作咨询 — Xiaowei Yang"
    : "Inquiry received — Xiaowei Yang";
  const text = isZh
    ? `您好 ${inquiry.contactName}，

感谢联系。我已收到来自 ${inquiry.company} 的咨询，将在 24 小时内回复。

— Xiaowei Yang
Enterprise AI Solutions Architect
${getSiteUrl()}`
    : `Hi ${inquiry.contactName},

Thank you for reaching out. I've received your inquiry from ${inquiry.company} and will respond within 24 hours.

— Xiaowei Yang
Enterprise AI Solutions Architect
${getSiteUrl()}`;

  await sendViaResend({
    to: inquiry.email,
    subject,
    text,
  });
}
