import { testUser } from "@/config/user";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const auth = request.headers.get("authorization");

  if (auth !== "321")
    return NextResponse.json(
      { isAuthenticated: false },
      {
        status: 401,
        statusText: "Unauthorized",
      }
    );

  return NextResponse.json({
    isAuthenticated: true,
    user: testUser,
  });
};
