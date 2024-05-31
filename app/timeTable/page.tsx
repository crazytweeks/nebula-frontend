import React from "react";
import PrepareTTData from "./prepareTTData";
import { getClassSubjects } from "../data/fromDb";

export const dynamic = "force-dynamic";

const page = async () => {
  const { classes, subjects } = await getClassSubjects();

  return (
    <div>
      <PrepareTTData classes={classes} subjects={subjects} />
    </div>
  );
};

export default page;
