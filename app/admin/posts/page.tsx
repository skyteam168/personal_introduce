import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { requireDb } from "@/lib/db";
import { posts, categories } from "@/lib/db/schema";
import { deletePost } from "@/lib/actions/blog";
import { blogPostHref } from "@/lib/blog/paths";

export default async function AdminPostsPage() {
  const db = requireDb();

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      publishedAt: posts.publishedAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .orderBy(desc(posts.updatedAt));

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
        >
          新建文章
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/30 text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">标题</th>
              <th className="px-4 py-3 font-medium">分类</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  暂无文章，{" "}
                  <Link href="/admin/posts/new" className="underline">
                    写一篇
                  </Link>
                </td>
              </tr>
            )}
            {allPosts.map((post) => (
              <tr key={post.id} className="border-b border-border/50">
                <td className="px-4 py-3 font-medium text-foreground">
                  {post.title}
                </td>
                <td className="px-4 py-3 text-muted">
                  {post.categoryName ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      post.status === "published"
                        ? "text-foreground"
                        : "text-muted"
                    }
                  >
                    {post.status === "published" ? "已发布" : "草稿"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-foreground underline"
                    >
                      编辑
                    </Link>
                    {post.status === "published" && (
                      <Link
                        href={blogPostHref(post.slug)}
                        className="text-muted underline"
                        target="_blank"
                      >
                        查看
                      </Link>
                    )}
                    <form
                      action={async () => {
                        "use server";
                        await deletePost(post.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-red-500 underline"
                      >
                        删除
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
