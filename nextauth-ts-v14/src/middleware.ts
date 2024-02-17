import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/partner")
      && request.nextauth.token?.role !== "partner"
      && request.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(
        new URL("/blocked", request.url)
      )
    }
    if (request.nextUrl.pathname.startsWith("/admin")
      && request.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(
        new URL("/blocked", request.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = { matcher: ["/admin", "/partner"] }