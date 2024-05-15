import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log("searchParams: ", searchParams);

  return Response.json({ message: "Hello World" });
}
