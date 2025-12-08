import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_KEY = process.env.BLOG_API_KEY || process.env.NEXT_PUBLIC_BLOG_KEY;
const COOKIE_NAME = "blog-auth";
const isProd = process.env.NODE_ENV === "production";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (!pathname.startsWith("/blog/editor")) {
    return NextResponse.next();
  }

  // In productie, daca nu exista cheie setata, editorul este blocat complet.
  if (!ACCESS_KEY) {
    if (isProd) {
      return new NextResponse("Editor disabled in production. Set BLOG_API_KEY.", { status: 401 });
    }
    return NextResponse.next();
  }

  const cookieValid = request.cookies.get(COOKIE_NAME)?.value === "ok";
  const key = searchParams.get("key");

  // Allow and set cookie when key is provided correctly in the URL.
  if (key && key === ACCESS_KEY) {
    const response = NextResponse.next();
    response.cookies.set({
      name: COOKIE_NAME,
      value: "ok",
      httpOnly: true,
      secure: true,
      path: "/blog/editor",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return response;
  }

  if (cookieValid) {
    return NextResponse.next();
  }

  return new NextResponse("Unauthorized. Add ?key=YOUR_KEY to the URL to authenticate.", { status: 401 });
}

export const config = {
  matcher: ["/blog/editor"],
};
