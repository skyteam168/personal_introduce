"use server";

import { desc, eq, and, gte, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireDb } from "@/lib/db";
import {
  inquiries,
  inquiryTypes,
  inquiryStatuses,
  type InquiryStatus,
} from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-utils";
import {
  getClientIpHash,
  notifyNewInquiry,
  sendInquiryAutoReply,
} from "@/lib/email/inquiry-notify";

const inquirySchema = z.object({
  type: z.enum(inquiryTypes),
  company: z.string().trim().min(1).max(200),
  contactName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional(),
  description: z.string().trim().min(10).max(2000),
  timeline: z.string().trim().max(200).optional(),
  budgetRange: z.string().trim().max(100).optional(),
  location: z.string().trim().max(200).optional(),
  locale: z.enum(["zh", "en"]).optional(),
});

export type SubmitInquiryResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitInquiry(
  formData: FormData
): Promise<SubmitInquiryResult> {
  if (formData.get("website")) {
    return { ok: true };
  }

  const parsed = inquirySchema.safeParse({
    type: formData.get("type"),
    company: formData.get("company"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    description: formData.get("description"),
    timeline: formData.get("timeline") || undefined,
    budgetRange: formData.get("budgetRange") || undefined,
    location: formData.get("location") || undefined,
    locale: formData.get("locale") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: "INVALID_INPUT" };
  }

  const db = requireDb();
  const ipHash = await getClientIpHash();

  if (ipHash) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const [row] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(inquiries)
      .where(
        and(eq(inquiries.ipHash, ipHash), gte(inquiries.createdAt, oneHourAgo))
      );
    if ((row?.count ?? 0) >= 3) {
      return { ok: false, error: "RATE_LIMIT" };
    }
  }

  const data = parsed.data;

  const [inquiry] = await db
    .insert(inquiries)
    .values({
      type: data.type,
      company: data.company,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone || null,
      description: data.description,
      timeline: data.timeline || null,
      budgetRange: data.budgetRange || null,
      location: data.location || null,
      locale: data.locale || null,
      ipHash,
      updatedAt: new Date(),
    })
    .returning();

  void notifyNewInquiry(inquiry);
  void sendInquiryAutoReply(inquiry);

  return { ok: true };
}

export async function getInquiries() {
  await requireAdmin();
  const db = requireDb();
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await requireAdmin();
  if (!inquiryStatuses.includes(status)) {
    throw new Error("Invalid status");
  }
  const db = requireDb();
  await db
    .update(inquiries)
    .set({ status, updatedAt: new Date() })
    .where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
}

export async function updateInquiryNotes(id: string, adminNotes: string) {
  await requireAdmin();
  const db = requireDb();
  await db
    .update(inquiries)
    .set({ adminNotes: adminNotes.trim() || null, updatedAt: new Date() })
    .where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
}
