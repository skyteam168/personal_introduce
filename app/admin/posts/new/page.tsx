import { getAllCategories } from "@/lib/blog/queries";
import { PostForm } from "@/components/blog/PostForm";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewPostPage({ searchParams }: PageProps) {
  const { error } = await searchParams;
  const categories = await getAllCategories();

  const errorMessage =
    error === "missing_fields"
      ? "请填写标题和正文"
      : error
        ? decodeURIComponent(error)
        : null;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-foreground">新建文章</h1>
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}
      <PostForm categories={categories} />
    </div>
  );
}
