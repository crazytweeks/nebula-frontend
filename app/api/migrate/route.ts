import db from "@/lib/pg/ghConnection";
import { down, up } from "@/lib/pg/migrate";
import { NextRequest } from "next/server";

const add = async () => {
  await up(db)
    .catch((e) => {
      console.log(e);
    })
    .then(() => {
      console.log("up success");
    });
};

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

  if (action === "up") {
    await add();
  } else if (action === "down") {
    await drop();
  }

  return Response.json({ message: "Hello World" }, { status: 200 });
}
