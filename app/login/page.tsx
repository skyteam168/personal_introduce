import Link from "next/link";
import { signIn, auth, signOut } from "@/auth";

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl, error } = await searchParams;
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface/20 p-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-foreground">已登录</h1>
          <p className="mb-2 text-sm text-muted">
            当前账号：{session.user.email}
          </p>
          {error === "not_admin" && (
            <p className="mb-6 text-sm text-amber-600">
              此账号没有管理权限，请使用管理员 Google 账号登录。
            </p>
          )}
          <div className="flex flex-col gap-3">
            {error === "not_admin" && (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-full border border-border px-6 py-3 text-sm text-muted"
                >
                  退出并换账号
                </button>
              </form>
            )}
            <Link
              href={callbackUrl ?? "/blog"}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              继续浏览
            </Link>
            <Link href="/" className="text-xs text-muted underline">
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface/20 p-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">登录</h1>
        <p className="mb-8 text-sm text-muted">
          使用 Google 账号登录，即可点赞、评论和互动
        </p>
        {error === "not_admin" && (
          <p className="mb-4 text-sm text-amber-600">
            当前账号无管理权限，请换用管理员 Google 账号重新登录。
          </p>
        )}
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
