import Link from "next/link";
import { db } from "@/lib/db";
import { getPublishedPosts, getAllCategories } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  if (!db) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <p className="text-muted">博客数据库未配置，请设置 DATABASE_URL</p>
      </div>
    );
  }

  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getAllCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="text-sm text-muted hover:text-foreground">
            ← 首页
          </Link>
          <h1 className="text-sm font-semibold text-foreground">Blog</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-foreground">
            技术博客
          </h1>
          <p className="text-muted">
            AI、基础设施、运维与开发实践
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="rounded-full border border-foreground bg-foreground px-4 py-1.5 text-xs font-medium text-background"
            >
              全部
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {posts.length === 0 && (
            <p className="text-muted">暂无文章，敬请期待。</p>
          )}
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-border bg-surface/20 p-6 transition-colors hover:border-foreground/20"
            >
              <Link href={`/blog/${post.slug}`}>
                {post.categoryName && (
                  <span className="mb-2 inline-block text-xs font-medium text-muted">
                    {post.categoryName}
                  </span>
                )}
                <h2 className="mb-2 text-xl font-semibold text-foreground group-hover:opacity-80">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mb-4 line-clamp-2 text-sm text-muted">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted">
                  {post.publishedAt && (
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString("zh-CN")}
                    </time>
                  )}
                  <span>♥ {post.likeCount}</span>
                  <span>💬 {post.commentCount}</span>
                  <span>↗ {post.shareCount}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
