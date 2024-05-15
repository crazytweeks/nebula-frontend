import db from "@/lib/pg/ghConnection";
import { down, up } from "@/lib/pg/migrate";
import React from "react";

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

const Page = async () => {
  await add();
  // await drop();

  return <div>Page</div>;
};

export default Page;
