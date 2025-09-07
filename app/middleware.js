import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("userSession"); // Get user session from cookies

  if (!session && req.nextUrl.pathname.startsWith("/api/posts")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}
