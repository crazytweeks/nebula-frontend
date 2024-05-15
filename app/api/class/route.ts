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
