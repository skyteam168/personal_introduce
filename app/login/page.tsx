import Link from "next/link";
import { signIn } from "@/auth";

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface/20 p-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">登录</h1>
        <p className="mb-8 text-sm text-muted">
          使用 Google 账号登录，即可点赞、评论和互动
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", {
              redirectTo: callbackUrl ?? "/blog",
            });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            使用 Google 登录
          </button>
        </form>
        <p className="mt-6 text-xs text-muted">
          <Link href="/" className="underline hover:text-foreground">
            返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
