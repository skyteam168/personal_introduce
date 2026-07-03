import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { createPost, updatePost } from "@/lib/actions/blog";
import type { Category } from "@/lib/db/schema";

interface PostFormProps {
  categories: Category[];
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: object;
    categoryId: string | null;
    status: "draft" | "published";
  };
}

export function PostForm({ categories, post }: PostFormProps) {
  const isEdit = !!post;

  return (
    <form
      action={isEdit ? updatePost.bind(null, post.id) : createPost}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            标题
          </label>
          <input
            name="title"
            defaultValue={post?.title}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            URL Slug
          </label>
          <input
            name="slug"
            defaultValue={post?.slug}
            placeholder="auto-from-title"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/30"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">
          摘要
        </label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={2}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/30"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            分类
          </label>
          <select
            name="categoryId"
            defaultValue={post?.categoryId ?? ""}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/30"
          >
            <option value="">无分类</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            状态
          </label>
          <select
            name="status"
            defaultValue={post?.status ?? "draft"}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/30"
          >
            <option value="draft">草稿</option>
            <option value="published">发布</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">
          正文
        </label>
        <RichTextEditor
          defaultContent={post?.content as object}
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90"
      >
        {isEdit ? "保存" : "创建"}
      </button>
    </form>
  );
}
