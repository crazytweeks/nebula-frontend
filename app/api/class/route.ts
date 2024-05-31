import db from "@/lib/pg/ghConnection";
import { ClassSectionSchema } from "@/lib/pg/timeTable";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const classData = ClassSectionSchema.parse(json);

  const addToDb = await db
    .insertInto("test_tt_class_section")
    .values(classData)
    .execute();

  console.log("addToDb: ", addToDb);

  return Response.json({ message: "Hello World" }, { status: 200 });
}
export async function GET(request: NextRequest) {
  const data = await db
    .selectFrom("test_tt_class_section")
    .selectAll()
    .execute();

  return Response.json({ message: "Hello World", data }, { status: 200 });
}
