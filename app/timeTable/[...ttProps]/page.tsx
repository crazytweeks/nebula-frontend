import TimeTableScheduler from "@/components/timeTable/timeTableScheduler";
import React, { FC } from "react";

// export const dynamic = "force-dynamic";

interface Props {
  ttProps: string[];
  searchParams: {
    class: string;
    sub: string;
  };
}

const Table: FC<Props> = async ({ searchParams }) => {
  const { class: selectedClass, sub: selectedSubject } = searchParams;

  return (
    <div>
      <TimeTableScheduler
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
      />
    </div>
  );
};

export default Table;
