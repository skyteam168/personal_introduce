import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireDb } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { getAllCategories } from "@/lib/blog/queries";
import { PostForm } from "@/components/blog/PostForm";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function EditPostPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const db = requireDb();

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!post) notFound();

  const categories = await getAllCategories();

  const errorMessage =
    error === "missing_fields"
      ? "请填写标题和正文"
      : error
        ? decodeURIComponent(error)
        : null;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">编辑文章</h1>
        {saved === "1" && (
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-600">
            已保存
          </span>
        )}
      </div>
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}
      <PostForm
        key={`${post.id}-${post.updatedAt?.toISOString()}`}
        categories={categories}
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content as object,
          categoryId: post.categoryId,
          status: post.status,
        }}
      />
    </div>
  );
}
