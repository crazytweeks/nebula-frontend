import { awaitFor } from "@/lib/utils";
import React from "react";

export const revalidate = 1;

const data = async () => {
  await awaitFor(2500);
  return {
    users: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ],
  };
};

const Users = async () => {
  const { users } = await data();

  return (
    <div>
      <pre>{JSON.stringify(users ?? {}, null, 2)}</pre>
    </div>
  );
};

export default Users;
