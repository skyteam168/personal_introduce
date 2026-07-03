import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDbError } from "@/lib/db/retry";
import { getCategoryBySlug, getPublishedPosts } from "@/lib/blog/queries";
import { blogPostHref, resolveRouteSlug } from "@/lib/blog/paths";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  if (!db) notFound();

  const slug = resolveRouteSlug(rawSlug);
  let category: Awaited<ReturnType<typeof getCategoryBySlug>> | null = null;
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let loadError: string | null = null;

  try {
    category = await getCategoryBySlug(slug);
    if (!category) notFound();
    posts = await getPublishedPosts(slug);
  } catch (error) {
    loadError = formatDbError(error);
  }

  if (!category && !loadError) notFound();

  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-muted hover:text-foreground"
        >
          ← 博客
        </Link>

        {loadError ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700">
            <p>{loadError}</p>
            <a
              href={`/blog/category/${rawSlug}`}
              className="mt-2 inline-block font-medium underline hover:opacity-80"
            >
              点击刷新
            </a>
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-2xl font-semibold text-foreground">
              {category!.name}
            </h1>
            {category!.description && (
              <p className="mb-8 text-sm text-muted">{category!.description}</p>
            )}

            <div className="space-y-6">
              {posts.length === 0 && (
                <p className="text-muted">该分类下暂无文章。</p>
              )}
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={blogPostHref(post.slug)}
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
          </>
        )}
      </main>
    </div>
  );
}
