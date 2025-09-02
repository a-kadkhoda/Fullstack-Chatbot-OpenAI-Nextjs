import { verifyJwt } from "@/helper/token";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token)
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );

  const { valid, payload } = await verifyJwt(token);
  if (!valid || !payload?.id) {
    return NextResponse.json(
      { error: "Forbidden: Invalid token" },
      { status: 403 }
    );
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
  matcher: ["/api/chat/:path*", "/api/chat"],
};
