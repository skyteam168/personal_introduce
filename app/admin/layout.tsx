import Link from "next/link";
import { requireAdmin } from "@/lib/auth-utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin/posts" className="text-sm font-semibold text-foreground">
              博客管理
            </Link>
            <nav className="flex gap-4 text-sm text-muted">
              <Link href="/admin/posts" className="hover:text-foreground">
                文章
              </Link>
              <Link href="/admin/categories" className="hover:text-foreground">
                分类
              </Link>
              <Link href="/admin/posts/new" className="hover:text-foreground">
                写文章
              </Link>
            </nav>
          </div>
          <Link href="/" className="text-sm text-muted hover:text-foreground">
            返回网站
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
