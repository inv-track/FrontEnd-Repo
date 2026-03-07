import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";

  //  لو مفيش token وهو مش في صفحة login → روّحه login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //  لو عنده token وهو في صفحة login → روّحه warehouse
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/warehouse", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon).*)",
  ],
};