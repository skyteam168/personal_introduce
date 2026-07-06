import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  getPostBySlug,
  getPostComments,
  hasUserLiked,
} from "@/lib/blog/queries";
import { resolveRouteSlug } from "@/lib/blog/paths";
import { RichTextContent } from "@/components/blog/RichTextContent";
import { PostInteractions } from "@/components/blog/PostInteractions";
import { CommentSection } from "@/components/blog/CommentSection";
import { BlogBackLink, LocalizedDate } from "@/components/blog/BlogPostChrome";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  if (!db) return { title: "Blog" };
  const post = await getPostBySlug(resolveRouteSlug(rawSlug));
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Xiaowei Yang`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  if (!db) notFound();

  const post = await getPostBySlug(resolveRouteSlug(rawSlug));
  if (!post) notFound();

  const session = await auth();
  const comments = await getPostComments(post.id);
  const liked = session?.user?.id
    ? await hasUserLiked(post.id, session.user.id)
    : false;

  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="mx-auto max-w-3xl px-6 py-8">
        <BlogBackLink />
        {post.categoryName && (
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-wider text-muted">
            {post.categoryName}
          </span>
        )}

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {post.title}
        </h1>

        <div className="mb-8 flex items-center gap-3 text-sm text-muted">
          {post.authorImage && (
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={post.authorImage}
                alt={post.authorName ?? "Author"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <span>{post.authorName}</span>
          {post.publishedAt && (
            <>
              <span>·</span>
              <LocalizedDate date={post.publishedAt} />
            </>
          )}
        </div>

        <PostInteractions
          postId={post.id}
          postSlug={post.slug}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          shareCount={post.shareCount}
          initialLiked={liked}
        />

        <div className="mt-10">
          <RichTextContent content={post.content as object} />
        </div>

        <CommentSection
          postId={post.id}
          postSlug={post.slug}
          comments={comments}
        />
      </main>
    </div>
  );
}
