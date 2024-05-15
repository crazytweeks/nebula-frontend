import db from "@/lib/pg/ghConnection";
import { down, up } from "@/lib/pg/migrate";
import { NextRequest } from "next/server";

const drop = async () => {
  await down(db)
    .catch((e) => {
      console.log(e);
    })
    .then(() => {
      console.log("down success");
    });
};

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const action = params.get("action");

  try {
    if (action === "up") {
      await up(db);
    } else if (action === "down") {
      await down(db);
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
