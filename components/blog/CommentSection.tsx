"use client";

import { useState, useTransition } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { addComment } from "@/lib/actions/interactions";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userName: string | null;
  userImage: string | null;
}

interface CommentSectionProps {
  postId: string;
  postSlug: string;
  comments: Comment[];
}

export function CommentSection({
  postId,
  postSlug,
  comments: initialComments,
}: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      signIn("google", { callbackUrl: `/blog/${postSlug}#comments` });
      return;
    }
    if (!text.trim()) return;

    startTransition(async () => {
      await addComment(postId, postSlug, text);
      setComments([
        {
          id: crypto.randomUUID(),
          content: text.trim(),
          createdAt: new Date(),
          userName: session.user?.name ?? "User",
          userImage: session.user?.image ?? null,
        },
        ...comments,
      ]);
      setText("");
    });
  };

  return (
    <section id="comments" className="mt-12">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        评论 ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            session ? "写下你的评论…" : "登录后即可评论"
          }
          rows={3}
          className="w-full resize-none rounded-xl border border-border bg-surface/30 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none focus:border-foreground/30"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={isPending || !text.trim()}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {session ? "发表评论" : "登录后评论"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted">暂无评论，来抢沙发吧。</p>
        )}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 rounded-xl border border-border bg-surface/20 p-4"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface">
              {comment.userImage ? (
                <Image
                  src={comment.userImage}
                  alt={comment.userName ?? "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                  {(comment.userName ?? "U")[0]}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-sm font-medium text-foreground">
                  {comment.userName ?? "Anonymous"}
                </span>
                <span className="text-xs text-muted">
                  {new Date(comment.createdAt).toLocaleDateString("zh-CN")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
