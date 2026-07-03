import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getPublishedPosts } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  if (!db) notFound();

  const posts = await getPublishedPosts(slug);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-6">
          <Link href="/blog" className="text-sm text-muted hover:text-foreground">
            ← 博客
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-8 text-2xl font-semibold capitalize text-foreground">
          {slug}
        </h1>

        <div className="space-y-6">
          {posts.length === 0 && (
            <p className="text-muted">该分类下暂无文章。</p>
          )}
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-border p-6 transition-colors hover:border-foreground/20"
            >
              <h2 className="text-lg font-semibold text-foreground">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
