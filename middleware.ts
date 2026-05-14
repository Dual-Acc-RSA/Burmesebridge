import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set(
    "X-Frame-Options",
    "DENY"
  );

  response.headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  // Auth Guard
  const token =
    request.cookies.get("sb-access-token");

  if (
    !token &&
    request.nextUrl.pathname.startsWith(
      "/dashboard"
    )
  ) {
    return NextResponse.redirect(
      new URL("/en/login", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};