import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const access_token = request.cookies.has("access_token")

  if (!access_token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/leagues/:path*", "/leagues", "/admin/:path*", "/admin", "/report"],
}
