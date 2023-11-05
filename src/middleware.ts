import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { middlewareAuth } from "./lib/middlewareAuth";
export const middleware = async (req: NextRequest) => {
  const { UserData } = await middlewareAuth(req);
  if (!UserData) {
    return NextResponse.redirect(new URL("/auth", req.url));
  } else {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (UserData.role === "USER") {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }
    if (req.nextUrl.pathname.startsWith("/profile")) {
      if (UserData.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
  }
};
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
