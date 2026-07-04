"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { blogPostHref } from "@/lib/blog/paths";

export interface BlogHighlightPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: Date | null;
  categoryName: string | null;
  likeCount: number;
}

interface BlogHighlightsProps {
  posts: BlogHighlightPost[];
}

export function BlogHighlights({ posts }: BlogHighlightsProps) {
  const { t } = useLanguage();

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <SectionHeading
            label={t.blog.label}
            title={t.blog.title}
            subtitle={t.blog.subtitle}
            className="mb-0"
          />
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t.blog.viewAll}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <Link href={blogPostHref(post.slug)} className="group block h-full">
                <GlassPanel hover className="flex h-full flex-col p-6 md:p-8">
                  {post.categoryName && (
                    <span className="mb-4 text-xs font-medium tracking-wider text-muted uppercase">
                      {post.categoryName}
                    </span>
                  )}
                  <h3 className="mb-3 text-lg font-semibold text-foreground transition-opacity group-hover:opacity-80">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted">
                    {post.publishedAt && (
                      <time>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    )}
                    <span className="font-medium text-foreground/60 group-hover:text-foreground">
                      {t.blog.readMore} →
                    </span>
                  </div>
                </GlassPanel>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
