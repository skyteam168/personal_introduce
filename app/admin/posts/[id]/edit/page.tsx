import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireDb } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { getAllCategories } from "@/lib/blog/queries";
import { PostForm } from "@/components/blog/PostForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const db = requireDb();

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!post) notFound();

  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-foreground">编辑文章</h1>
      <PostForm
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
