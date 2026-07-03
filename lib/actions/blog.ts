"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireDb } from "@/lib/db";
import { posts, categories } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-utils";
import { slugify } from "@/lib/blog/queries";
import { externalizeContentImages } from "@/lib/blog/content-images";
import { isSupabaseStorageConfigured } from "@/lib/storage/supabase";

function hasBase64Images(content: unknown): boolean {
  const json = JSON.stringify(content);
  return json.includes("data:image/");
}

async function prepareContent(contentRaw: string) {
  let content = JSON.parse(contentRaw) as object;

  if (hasBase64Images(content)) {
    if (!isSupabaseStorageConfigured()) {
      throw new Error(
        "文章含有内嵌图片但存储未配置。请在 Vercel 设置 SUPABASE_SERVICE_ROLE_KEY，或删除图片后使用「图片URL」。"
      );
    }
    content = await externalizeContentImages(content as { type?: string });
  }

  return content;
}

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
  updateTag("blog");
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  const db = requireDb();
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/blog");
  updateTag("blog");
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

  if (!title || !contentRaw) {
    redirect("/admin/posts/new?error=missing_fields");
  }

  let content: object;
  try {
    content = await prepareContent(contentRaw);
  } catch (error) {
    const msg = encodeURIComponent(
      error instanceof Error ? error.message : "保存失败"
    );
    redirect(`/admin/posts/new?error=${msg}`);
  }

  const slug = slugify(slugInput || title);

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
  updateTag("blog");
  redirect(`/admin/posts/${post.id}/edit?saved=1`);
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const db = requireDb();

  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const contentRaw = formData.get("content") as string;
  const categoryId = (formData.get("categoryId") as string) || null;
  const status = (formData.get("status") as "draft" | "published") || "draft";
  const slug = slugify((formData.get("slug") as string)?.trim() || title);

  if (!title || !contentRaw) {
    redirect(`/admin/posts/${id}/edit?error=missing_fields`);
  }

  let content: object;
  try {
    content = await prepareContent(contentRaw);
  } catch (error) {
    const msg = encodeURIComponent(
      error instanceof Error ? error.message : "保存失败"
    );
    redirect(`/admin/posts/${id}/edit?error=${msg}`);
  }

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
  updateTag("blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}/edit`);
  redirect(`/admin/posts/${id}/edit?saved=1`);
}

export async function deletePost(id: string) {
  await requireAdmin();
  const db = requireDb();
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/blog");
  updateTag("blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
