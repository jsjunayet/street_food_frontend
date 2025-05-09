// middleware.ts
import { getCurrentUser } from "@/services/AuthService";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
export async function middleware(req: NextRequest) {
  const token = await getCurrentUser();

  const protectedPaths = ["/premium", "/dashboard", "/allpost"];
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/premium", "/dashboard", "/allpost"],
};
