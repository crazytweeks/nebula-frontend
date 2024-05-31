import { getClassSubjects } from "@/app/data/fromDb";
import TimeTableScheduler from "@/components/timeTable/timeTableScheduler";
import db from "@/lib/pg/ghConnection";
import { Event, TimeTable } from "@/lib/pg/timeTable";
import React, { FC } from "react";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    class: string;
    sub: string;
  };
}

const getTimetable = async (selectedClass: number) => {
  try {
    const data = (await db
      .selectFrom("test_tt")
      .where("class_section_id", "=", selectedClass)
      .selectAll()
      .execute()) as TimeTable[];

    return data;
  } catch (error) {
    return [];
  }
};

const getEvents = async (selectedClass: number) => {
  try {
    const data = (await db
      .selectFrom("test_tt_event")
      .where("class_section_id", "=", selectedClass)
      .selectAll()
      .execute()) as Event[];

    return data;
  } catch (error) {
    return [];
  }
};

type TimeTableData = {
  timetable: TimeTable[];
  events: Event[];
};

const getData = async (selectedClass: number) => {
  return {
    timetable: await getTimetable(selectedClass),
    events: await getEvents(selectedClass),
  } satisfies TimeTableData;
};

const Table: FC<Props> = async ({ searchParams }) => {
  const { class: selectedClass, sub: selectedSubject } = searchParams;

  const data = await getClassSubjects();
  const timeTableData = await getData(parseInt(selectedClass));

  return (
    <div>
      <TimeTableScheduler
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        data={data}
        timeTableData={timeTableData}
      />
    </div>
  );
};

export default Table;
export type { TimeTableData };
