import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export async function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  //   const agreedTnc = request.cookies.has("tnc");
  //   requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
