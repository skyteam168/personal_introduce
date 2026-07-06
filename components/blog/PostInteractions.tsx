"use client";

import { useState, useTransition } from "react";
import { useSession, signIn } from "next-auth/react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { toggleLike, recordShare } from "@/lib/actions/interactions";
import { blogPostHref } from "@/lib/blog/paths";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface PostInteractionsProps {
  postId: string;
  postSlug: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  initialLiked: boolean;
}

export function PostInteractions({
  postId,
  postSlug,
  likeCount,
  commentCount,
  shareCount,
  initialLiked,
}: PostInteractionsProps) {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(likeCount);
  const [shares, setShares] = useState(shareCount);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const requireLogin = () => {
    if (!session) {
      signIn("google", { callbackUrl: blogPostHref(postSlug) });
      return false;
    }
    return true;
  };

  const handleLike = () => {
    if (!requireLogin()) return;
    startTransition(async () => {
      try {
        const result = await toggleLike(postId, postSlug);
        setLiked(result.liked);
        setLikes((c) => (result.liked ? c + 1 : c - 1));
      } catch {
        signIn("google", { callbackUrl: blogPostHref(postSlug) });
      }
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${blogPostHref(postSlug)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      startTransition(async () => {
        await recordShare(postId, postSlug);
        setShares((c) => c + 1);
      });
    } catch {
      /* clipboard may fail */
    }
  };

  const scrollToComments = () => {
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 border-y border-border py-4">
      <button
        onClick={handleLike}
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
          liked
            ? "border-foreground bg-foreground text-background"
            : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
        )}
      >
        <Heart className={cn("h-4 w-4", liked && "fill-current")} />
        {likes}
      </button>

      <button
        onClick={scrollToComments}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <MessageCircle className="h-4 w-4" />
        {commentCount}
      </button>

      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <Share2 className="h-4 w-4" />
        {copied ? t.blog.linkCopied : shares}
      </button>
    </div>
  );
}
