"use server";

import { revalidatePath, updateTag } from "next/cache";
import { eq, and, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { requireDb } from "@/lib/db";
import { posts, comments, likes } from "@/lib/db/schema";

async function getSessionUser() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("UNAUTHORIZED");
  return session;
}

export async function toggleLike(postId: string, postSlug: string) {
  const session = await getSessionUser();
  const db = requireDb();
  const userId = session.user.id;

  const [existing] = await db
    .select()
    .from(likes)
    .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))
    .limit(1);

  if (existing) {
    await db
      .delete(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
    await db
      .update(posts)
      .set({ likeCount: sql`GREATEST(${posts.likeCount} - 1, 0)` })
      .where(eq(posts.id, postId));
    revalidatePath(`/blog/${postSlug}`);
    updateTag("blog");
    return { liked: false };
  }

  await db.insert(likes).values({ postId, userId });
  await db
    .update(posts)
    .set({ likeCount: sql`${posts.likeCount} + 1` })
    .where(eq(posts.id, postId));
  revalidatePath(`/blog/${postSlug}`);
  updateTag("blog");
  return { liked: true };
}

export async function addComment(
  postId: string,
  postSlug: string,
  content: string
) {
  const session = await getSessionUser();
  const db = requireDb();

  const trimmed = content.trim();
  if (!trimmed || trimmed.length > 2000) {
    throw new Error("Invalid comment");
  }

  await db.insert(comments).values({
    postId,
    userId: session.user.id,
    content: trimmed,
  });

  await db
    .update(posts)
    .set({ commentCount: sql`${posts.commentCount} + 1` })
    .where(eq(posts.id, postId));

  revalidatePath(`/blog/${postSlug}`);
}

export async function recordShare(postId: string, postSlug: string) {
  const db = requireDb();

  await db
    .update(posts)
    .set({ shareCount: sql`${posts.shareCount} + 1` })
    .where(eq(posts.id, postId));

  revalidatePath(`/blog/${postSlug}`);
  return { success: true };
}
