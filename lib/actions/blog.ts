"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireDb } from "@/lib/db";
import { posts, categories } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-utils";
import { slugify } from "@/lib/blog/queries";

export async function createCategory(formData: FormData) {
  const session = await requireAdmin();
  void session;

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  if (!name) throw new Error("Category name is required");

  const db = requireDb();
  const slug = slugify(name);

  await db.insert(categories).values({ name, slug, description });
  revalidatePath("/blog");
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  const db = requireDb();
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/blog");
  revalidatePath("/admin/categories");
}

export async function createPost(formData: FormData) {
  const session = await requireAdmin();
  const db = requireDb();

  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const contentRaw = formData.get("content") as string;
  const categoryId = (formData.get("categoryId") as string) || null;
  const status = (formData.get("status") as "draft" | "published") || "draft";
  const slugInput = (formData.get("slug") as string)?.trim();

  if (!title || !contentRaw) throw new Error("Title and content are required");

  const slug = slugInput || slugify(title);
  const content = JSON.parse(contentRaw);

  const [post] = await db
    .insert(posts)
    .values({
      title,
      slug,
      excerpt,
      content,
      categoryId: categoryId || null,
      authorId: session.user.id,
      status,
      publishedAt: status === "published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .returning({ id: posts.id });

  revalidatePath("/blog");
  redirect(`/admin/posts/${post.id}/edit`);
}

export async function updatePost(id: string, formData: FormData) {
  const session = await requireAdmin();
  const db = requireDb();

  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const contentRaw = formData.get("content") as string;
  const categoryId = (formData.get("categoryId") as string) || null;
  const status = (formData.get("status") as "draft" | "published") || "draft";
  const slug = (formData.get("slug") as string)?.trim();

  if (!title || !contentRaw || !slug) throw new Error("Missing required fields");

  const content = JSON.parse(contentRaw);

  const [existing] = await db
    .select({ status: posts.status })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  const baseUpdate = {
    title,
    slug,
    excerpt,
    content,
    categoryId: categoryId || null,
    status,
    updatedAt: new Date(),
  };

  if (status === "published" && existing?.status !== "published") {
    await db
      .update(posts)
      .set({ ...baseUpdate, publishedAt: new Date() })
      .where(eq(posts.id, id));
  } else {
    await db.update(posts).set(baseUpdate).where(eq(posts.id, id));
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const db = requireDb();
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
