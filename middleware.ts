import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth-utils";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!req.auth) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  if (!isAdminEmail(req.auth.user?.email)) {
    const denied = new URL("/login", req.url);
    denied.searchParams.set("error", "not_admin");
    return NextResponse.redirect(denied);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
