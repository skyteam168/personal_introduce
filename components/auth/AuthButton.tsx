"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, LogOut, PenSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className={cn("h-9 w-9 animate-pulse rounded-full bg-surface", className)}
      />
    );
  }

  if (session?.user) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {session.user.isAdmin && (
          <Link
            href="/admin/posts"
            prefetch
            className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
            title="管理后台"
          >
            <PenSquare className="h-3.5 w-3.5" />
            Admin
          </Link>
        )}
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface text-xs">
              {(session.user.name ?? "U")[0]}
            </div>
          )}
        </div>
        <button
          onClick={() => signOut()}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
          title="退出登录"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground",
        className
      )}
    >
      <LogIn className="h-3.5 w-3.5" />
      登录
    </button>
  );
}
