import { cache } from "react";
import { unstable_cache } from "next/cache";
import { eq, desc, and, sql } from "drizzle-orm";
import { requireDb } from "@/lib/db";
import { withDbRetry } from "@/lib/db/retry";
import { decodeSlug } from "@/lib/blog/paths";
import {
  posts,
  categories,
  comments,
  likes,
  users,
} from "@/lib/db/schema";

const postListSelect = {
  id: posts.id,
  title: posts.title,
  slug: posts.slug,
  excerpt: posts.excerpt,
  coverImage: posts.coverImage,
  publishedAt: posts.publishedAt,
  likeCount: posts.likeCount,
  commentCount: posts.commentCount,
  shareCount: posts.shareCount,
  categoryName: categories.name,
  categorySlug: categories.slug,
  authorName: users.name,
  authorImage: users.image,
};

async function fetchPublishedPosts(categorySlug?: string) {
  return withDbRetry(async () => {
    const db = requireDb();

    if (categorySlug) {
      return db
        .select(postListSelect)
        .from(posts)
        .leftJoin(categories, eq(posts.categoryId, categories.id))
        .leftJoin(users, eq(posts.authorId, users.id))
        .where(
          and(eq(posts.status, "published"), eq(categories.slug, categorySlug))
        )
        .orderBy(desc(posts.publishedAt));
    }

    return db
      .select(postListSelect)
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt));
  });
}

async function fetchAllCategories() {
  return withDbRetry(async () => {
    const db = requireDb();
    return db.select().from(categories).orderBy(categories.name);
  });
}

export const getPublishedPosts = unstable_cache(
  async (categorySlug?: string) => fetchPublishedPosts(categorySlug),
  ["blog-published-posts"],
  { revalidate: 60, tags: ["blog"] }
);

export const getAllCategories = unstable_cache(
  async () => fetchAllCategories(),
  ["blog-categories"],
  { revalidate: 120, tags: ["blog"] }
);

export const getPostBySlug = cache(async (rawSlug: string) => {
  return withDbRetry(async () => {
    const db = requireDb();
    const decoded = decodeSlug(rawSlug);
    const candidates = Array.from(
      new Set([decoded, rawSlug].filter(Boolean))
    );

    for (const slug of candidates) {
      const [post] = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          excerpt: posts.excerpt,
          content: posts.content,
          coverImage: posts.coverImage,
          publishedAt: posts.publishedAt,
          likeCount: posts.likeCount,
          commentCount: posts.commentCount,
          shareCount: posts.shareCount,
          categoryName: categories.name,
          categorySlug: categories.slug,
          authorName: users.name,
          authorImage: users.image,
          authorId: posts.authorId,
        })
        .from(posts)
        .leftJoin(categories, eq(posts.categoryId, categories.id))
        .leftJoin(users, eq(posts.authorId, users.id))
        .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
        .limit(1);

      if (post) return post;
    }

    return null;
  });
});

export async function getPostComments(postId: string) {
  return withDbRetry(async () => {
    const db = requireDb();
    return db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        userId: comments.userId,
        userName: users.name,
        userImage: users.image,
      })
      .from(comments)
      .innerJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
  });
}

export async function hasUserLiked(postId: string, userId: string) {
  return withDbRetry(async () => {
    const db = requireDb();
    const [row] = await db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))
      .limit(1);
    return !!row;
  });
}

export async function incrementShareCount(postId: string) {
  return withDbRetry(async () => {
    const db = requireDb();
    await db
      .update(posts)
      .set({ shareCount: sql`${posts.shareCount} + 1` })
      .where(eq(posts.id, postId));
  });
}

export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (/[\u4e00-\u9fa5]/.test(slug)) {
    const ascii = slug
      .replace(/[\u4e00-\u9fa5]+/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (ascii.length >= 3) return ascii;
    const id = Date.now().toString(36);
    return ascii ? `${ascii}-${id}` : `post-${id}`;
  }

  return slug || `post-${Date.now().toString(36)}`;
}

export async function getCategoryBySlug(slug: string) {
  return withDbRetry(async () => {
    const db = requireDb();
    const decoded = decodeSlug(slug);
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, decoded))
      .limit(1);
    return category ?? null;
  });
}
