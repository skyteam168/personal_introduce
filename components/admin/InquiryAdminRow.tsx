"use client";

import { useTransition } from "react";
import {
  updateInquiryStatus,
  updateInquiryNotes,
} from "@/lib/actions/inquiries";
import {
  inquiryStatusLabels,
  inquiryTypeLabels,
} from "@/lib/work-with-me/content";
import type { Inquiry, InquiryStatus } from "@/lib/db/schema";
import { inquiryStatuses } from "@/lib/db/schema";

export function InquiryAdminRow({ inquiry }: { inquiry: Inquiry }) {
  const [pending, startTransition] = useTransition();

  return (
    <details className="rounded-xl border border-border bg-surface/30 p-4">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-medium text-foreground">{inquiry.company}</span>
            <span className="mx-2 text-muted">·</span>
            <span className="text-sm text-muted">
              {inquiryTypeLabels[inquiry.type].zh}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{inquiryStatusLabels[inquiry.status]?.zh ?? inquiry.status}</span>
            <time>
              {new Date(inquiry.createdAt).toLocaleString("zh-CN")}
            </time>
          </div>
        </div>
        <p className="mt-2 line-clamp-1 text-sm text-muted">
          {inquiry.contactName} · {inquiry.email}
        </p>
      </summary>

      <div className="mt-4 space-y-4 border-t border-border pt-4 text-sm">
        <p className="whitespace-pre-wrap text-foreground/90">{inquiry.description}</p>

        <dl className="grid gap-2 text-muted sm:grid-cols-2">
          {inquiry.phone && (
            <>
              <dt>电话</dt>
              <dd className="text-foreground">{inquiry.phone}</dd>
            </>
          )}
          {inquiry.location && (
            <>
              <dt>地点</dt>
              <dd className="text-foreground">{inquiry.location}</dd>
            </>
          )}
          {inquiry.timeline && (
            <>
              <dt>时间线</dt>
              <dd className="text-foreground">{inquiry.timeline}</dd>
            </>
          )}
          {inquiry.budgetRange && (
            <>
              <dt>预算</dt>
              <dd className="text-foreground">{inquiry.budgetRange}</dd>
            </>
          )}
        </dl>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs text-muted">状态</label>
          <select
            defaultValue={inquiry.status}
            disabled={pending}
            onChange={(e) => {
              startTransition(() =>
                updateInquiryStatus(inquiry.id, e.target.value as InquiryStatus)
              );
            }}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
          >
            {inquiryStatuses.map((s) => (
              <option key={s} value={s}>
                {inquiryStatusLabels[s]?.zh ?? s}
              </option>
            ))}
          </select>
        </div>

        <form
          action={(fd) => {
            startTransition(async () => {
              await updateInquiryNotes(
                inquiry.id,
                (fd.get("notes") as string) ?? ""
              );
            });
          }}
        >
          <label className="mb-2 block text-xs text-muted">内部备注</label>
          <textarea
            name="notes"
            defaultValue={inquiry.adminNotes ?? ""}
            rows={3}
            className="mb-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-foreground px-4 py-1.5 text-xs font-medium text-background disabled:opacity-50"
          >
            保存备注
          </button>
        </form>
      </div>
    </details>
  );
}
