import { awaitFor } from "@/lib/utils";
import React from "react";

const Users = async () => {
  const data = async () => {
    await awaitFor(2500);
    return {
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ],
    };
  };

  const { users } = await data();

  return (
    <div>
      <pre>{JSON.stringify(users ?? {}, null, 2)}</pre>
    </div>
  );
};

export default Users;
