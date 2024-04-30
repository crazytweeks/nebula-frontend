import connectDB from "@/lib/connectDB";
import Role, { roleZodSchema } from "@/lib/models/roles";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const { error, data, success } = await roleZodSchema.safeParseAsync(body);

    if (!success) {
      const errorMessage = error?.issues
        .map((issue) => {
          return `${issue.path.join(".")}: ${issue.message}`;
        })
        .join(", ");

      return NextResponse.json(
        { error: errorMessage, detailedError: error.errors },
        { status: 400 }
      );
    }
    const { name, description } = data;

    const role = await Role.create({ name, description });

    return NextResponse.json({
      role: role,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, detailedError: error },
      { status: 400 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  console.log("searchParams: ", searchParams);

  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const s = searchParams.get("s");

  let filter = {};

  if (name) {
    filter = {
      ...filter,
      name: {
        $regex: name,
        $options: "i",
      },
    };
  }

  if (description) {
    filter = {
      ...filter,
      description: {
        $regex: description,
        $options: "i",
      },
    };
  }

  const existingRoles = await Role.find(
    s
      ? {
          $or: [
            { name: { $regex: s, $options: "i" } },
            { description: { $regex: s, $options: "i" } },
          ],
        }
      : filter
  );

  return NextResponse.json(existingRoles);
};
