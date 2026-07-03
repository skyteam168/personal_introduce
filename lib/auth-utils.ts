import { redirect } from "next/navigation";
import { auth } from "@/auth";

export function getAdminEmails(): string[] {
  return (
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()) ??
    []
  );
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = getAdminEmails();
  if (admins.length === 0) return false;
  return admins.includes(email.toLowerCase());
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    redirect("/login?callbackUrl=/admin");
  }
  return session;
}

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  return session;
}
