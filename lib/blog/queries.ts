import { eq, desc, and, sql } from "drizzle-orm";
import { requireDb } from "@/lib/db";
import {
  posts,
  categories,
  comments,
  likes,
  users,
} from "@/lib/db/schema";

export async function getPublishedPosts(categorySlug?: string) {
  const db = requireDb();

  const query = db
    .select({
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
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));

  if (categorySlug) {
    return db
      .select({
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
      })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(
        and(eq(posts.status, "published"), eq(categories.slug, categorySlug))
      )
      .orderBy(desc(posts.publishedAt));
  }

  return query;
}

export async function getPostBySlug(slug: string) {
  const db = requireDb();

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

  return post ?? null;
}

export async function getAllCategories() {
  const db = requireDb();
  return db.select().from(categories).orderBy(categories.name);
}

export async function getPostComments(postId: string) {
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
}

export async function hasUserLiked(postId: string, userId: string) {
  const db = requireDb();

  const [row] = await db
    .select()
    .from(likes)
    .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))
    .limit(1);

  return !!row;
}

export async function incrementShareCount(postId: string) {
  const db = requireDb();

  await db
    .update(posts)
    .set({ shareCount: sql`${posts.shareCount} + 1` })
    .where(eq(posts.id, postId));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
