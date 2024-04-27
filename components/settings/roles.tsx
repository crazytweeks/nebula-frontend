import { awaitFor } from "@/lib/utils";
import React from "react";

const Roles = async () => {
  const data = async () => {
    await awaitFor(2500);

    return {
      user: {
        name: "John",
      },
    };
  };

  const { user } = await data();

  return <div>{user.name}</div>;
};

export default Roles;
