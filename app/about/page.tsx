import db from "@/lib/pg/ghConnection";
import { down, up } from "@/lib/pg/migrate";
import React from "react";

const dbCalls = async () => {
  await up(db).catch((e) => {
    console.log(e);
  });
  await down(db).catch((e) => {
    console.log(e);
  });
};

const Page = async () => {
  await dbCalls();

  return <div>Page</div>;
};

export default Page;
