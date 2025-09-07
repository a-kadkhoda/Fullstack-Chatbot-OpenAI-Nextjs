import { verifyJwt } from "@/helper/token";
import { NextRequest, NextResponse } from "next/server";

const publicApiRoutes = ["/api/user", "/api/auth/login"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isApi = pathname.startsWith("/api");
  const isAuthRoute = pathname.startsWith("/auth");

  if (isApi) {
    const isPublic = publicApiRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!token && !isPublic) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    if (token) {
      const { valid, payload } = await verifyJwt(token);
      if (!valid || !payload?.id) {
        return NextResponse.json(
          { error: "Forbidden: Invalid token" },
          { status: 403 }
        );
      }
      console.log(payload.id);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", payload.id);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  }

  if (!token) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  const { valid, payload } = await verifyJwt(token);

  if (!valid || !payload?.id) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/chat", request.url));
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
  matcher: [
    "/api/chat/:path*",
    "/api/user/:path*",
    "/api/conversation/:path*",
    "/:path*",
    "/chat/:path*",
    "/auth/:path*",
  ],
};
