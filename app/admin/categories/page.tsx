import { createCategory, deleteCategory } from "@/lib/actions/blog";
import { getAllCategories } from "@/lib/blog/queries";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-foreground">分类管理</h1>

      <form action={createCategory} className="mb-10 flex flex-wrap gap-3">
        <input
          name="name"
          placeholder="分类名称"
          required
          className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/30"
        />
        <input
          name="description"
          placeholder="描述（可选）"
          className="min-w-[200px] flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/30"
        />
        <button
          type="submit"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          添加分类
        </button>
      </form>

      <div className="space-y-2">
        {categories.length === 0 && (
          <p className="text-sm text-muted">暂无分类</p>
        )}
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
          >
            <div>
              <p className="font-medium text-foreground">{cat.name}</p>
              <p className="text-xs text-muted">/{cat.slug}</p>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteCategory(cat.id);
              }}
            >
              <button type="submit" className="text-sm text-red-500 underline">
                删除
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
