import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyAuth = (token: string | null) => {
  //TODO: implement auth
  return token ? token === "321" : true;
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/callback"
  )
    return;

  const isAuthenticated = await verifyAuth(
    request.headers.get("authorization")
  );

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/api/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|login|callback|_next/static|_next/image|favicon.ico).*)"],
};
