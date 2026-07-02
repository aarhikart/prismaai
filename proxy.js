import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth-config";
import { parseSessionToken } from "@/lib/session-token";

function hasSession(request) {
  return Boolean(parseSessionToken(request.cookies.get(SESSION_COOKIE)?.value));
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const hasActiveSession = hasSession(request);

  if (isLoginPage && hasActiveSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginPage && pathname.startsWith("/admin") && !hasActiveSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
