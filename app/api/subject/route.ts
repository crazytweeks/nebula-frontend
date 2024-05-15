import db from "@/lib/pg/ghConnection";
import { SubjectSchema } from "@/lib/pg/timeTable";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const subject = SubjectSchema.parse(json);

  const addToDb = await db
    .insertInto("test_tt_subject")
    .values(subject)
    .execute();

  console.log("addToDb: ", addToDb);

  return Response.json({ message: "Hello World" }, { status: 200 });
}
