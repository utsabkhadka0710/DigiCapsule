import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = [
  "/dashboard",
  "/create",
  "/profile",
  "/settings",
  "/preview/:path*",
  "/payment/success",
  "/payment/failure",
  "/settings/upgrade",
];
const authRoutes = ["/", "/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isProtectedRoute =
    protectedRoutes.includes(pathname) || pathname.startsWith("/preview");

  const isAuthenticated = !!session?.user;

  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard",
    "/create",
    "/profile",
    "/settings",
    "/preview/:path*",
    "/payment/success",
    "/payment/failure",
    "/settings/upgrade",
  ],
};
