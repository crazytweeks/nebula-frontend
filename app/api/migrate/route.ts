import db from "@/lib/pg/ghConnection";
import { createSchema, down, up } from "@/lib/pg/migrate";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const action = params.get("action");
  const schema = params.get("schema");

  try {
    if (action === "up") {
      await up(db);
    } else if (action === "down") {
      await down(db);
    } else if (action === "schema" && schema) {
      await createSchema(db, schema);
    }
  } catch (e: any) {
    console.log(e);
    return Response.json(
      { message: "Migration failed", error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }

  return Response.json({ message: "Hello World" }, { status: 200 });
}
