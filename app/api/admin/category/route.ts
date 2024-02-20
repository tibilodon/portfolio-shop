import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

// import { z } from "zod";

// const schema = z.object({});
export async function POST(req: Request) {
  //   const parsed = schema.parse(req.body);
  //   console.log("parsed", parsed);
  //   const requestUrl = new URL(req.url);
  const formData = await req.formData();
  const categoryName = formData.get("name");
  const parentId = formData.get("parentId");

  console.log("categoryName", categoryName);
  console.log("parentId", parentId);
  //   console.log(requestUrl);
  //   return NextResponse.redirect(requestUrl.origin + "/admin");
  return NextResponse.json({ data: "data" }, { status: 200 });
}
