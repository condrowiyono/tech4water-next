import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const mapHref = new Map([
  ["pch", "/mobile/rainfall"],
  ["tma", "/mobile/waterlevel"],
  ["iklim", "/mobile/climate"],
]);

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (req.nextUrl.pathname === "/mobile" && token.river_type && token.river_id) {
    return NextResponse.redirect(new URL(`${mapHref.get(token.river_type as string)}/${token.river_id}`, req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/mobile/:path*"] };
