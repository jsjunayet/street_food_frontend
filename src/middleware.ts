import { getCurrentUser } from "@/services/AuthService";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const user = await getCurrentUser();
  const pathname = req.nextUrl.pathname;

  // Paths that require the user to be logged in
  const authProtectedPaths = ["/premium", "/allpost"];

  // Paths that require the user to be admin
  const adminProtectedPaths = ["/dashboard"];

  const isAuthProtected = authProtectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isAdminProtected = adminProtectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Redirect to login if not logged in and accessing auth-protected route
  if (isAuthProtected && !user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home or unauthorized page if user is logged in but not admin
  if (isAdminProtected && (!user || user.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/", req.url)); // or "/unauthorized"
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/premium", "/dashboard/:path*", "/allpost"],
};
