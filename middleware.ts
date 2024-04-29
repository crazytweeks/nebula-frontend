import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyAuth = (token: string | null) => {
  //TODO: implement auth
  return token ? token === "321" : true;
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);

  const url = request.nextUrl;

  requestHeaders.set("x-pathname", url?.pathname ?? "/");

  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/callback"
  )
    return NextResponse.next({
      request: {
        // Apply new request headers
        headers: requestHeaders,
      },
    });

  const isAuthenticated = await verifyAuth(
    request.headers.get("authorization")
  );

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/api/login", request.url));
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|login|callback|_next/static|_next/image|favicon.ico).*)"],
};
