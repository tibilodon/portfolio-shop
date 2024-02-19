import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const checkTnc = request.cookies.has("tnC");
}
