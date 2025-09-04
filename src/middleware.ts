import { verifyJwt } from "@/helper/token";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isApi = request.nextUrl.pathname.startsWith("/api");

  if (!token) {
    if (isApi) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const { valid, payload } = await verifyJwt(token);
  if (!valid || !payload?.id) {
    if (isApi) {
      return NextResponse.json(
        { error: "Forbidden: Invalid token" },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.id);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/chat/:path*", "/api/user/:path*", "/", "/chat"],
};
