import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    console.log("admin page");
  }
  if (req.nextUrl.pathname.startsWith("/profile")) {
    console.log("profile page");
  }
};
