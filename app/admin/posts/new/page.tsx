import { getAllCategories } from "@/lib/blog/queries";
import { PostForm } from "@/components/blog/PostForm";

export default async function NewPostPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-foreground">新建文章</h1>
      <PostForm categories={categories} />
    </div>
  );
}
