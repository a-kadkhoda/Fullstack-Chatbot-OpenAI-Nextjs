import { verifyJwt } from "@/helper/token";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("🚀 ~ middleware ~ token:", token);

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { valid } = await verifyJwt(token);
  if (!valid)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  return NextResponse.next();
}
export const config = {
  matcher: ["/api/chat/:path*", "/api/chat"],
};
