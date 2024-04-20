import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  picture: z.string().optional(),
  id: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;

const testUser: User = {
  id: "1",
  name: "test",
  email: "test",
  picture: "https://avatars.githubusercontent.com/u/29853193?s=40&v=4",
};

export const GET = async (request: NextRequest) => {
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
