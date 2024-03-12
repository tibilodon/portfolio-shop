import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
// import { withAuth } from "next-auth/middleware";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  //  protect routes
  matcher: ["/auth/profile", "/admin/:path*"],
};

// export async function middleware(request: NextRequest) {
//   // Store current request url in a custom header, which you can read later
//   const requestHeaders = new Headers(request.headers);
//   //   const agreedTnc = request.cookies.has("tnc");
//   //   requestHeaders.set("x-url", request.url);

//   return NextResponse.next({
//     request: {
//       // Apply new request headers
//       headers: requestHeaders,
//     },
//   });
// }
