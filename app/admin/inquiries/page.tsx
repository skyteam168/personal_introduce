import { db } from "@/lib/db";
import { getInquiries } from "@/lib/actions/inquiries";
import { InquiryAdminRow } from "@/components/admin/InquiryAdminRow";

export default async function AdminInquiriesPage() {
  if (!db) {
    return (
      <p className="text-muted">数据库未配置，无法加载咨询记录。</p>
    );
  }

  let inquiries: Awaited<ReturnType<typeof getInquiries>> = [];
  try {
    inquiries = await getInquiries();
  } catch {
    inquiries = [];
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold text-foreground">合作咨询</h1>
      <p className="mb-8 text-sm text-muted">
        来自 /work-with-me 的询价记录 · 共 {inquiries.length} 条
      </p>

      {inquiries.length === 0 ? (
        <p className="text-muted">暂无咨询记录。</p>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <InquiryAdminRow key={inquiry.id} inquiry={inquiry} />
          ))}
        </div>
      )}
    </div>
  );
}
