import ClassSectionComponent from "@/components/timeTable/classSection";
import SubjectsComponent from "@/components/timeTable/subject";
import db from "@/lib/pg/ghConnection";
import { ClassSection, Subject } from "@/lib/pg/timeTable";
import { cn } from "@/lib/utils";
import React from "react";

const getClasses = async () => {
  const data = (await db
    .selectFrom("test_tt_class_section")
    .selectAll()
    .execute()) as ClassSection[];

  return data;
};

const getSubjects = async () => {
  const data = (await db
    .selectFrom("test_tt_subject")
    .selectAll()
    .execute()) as Subject[];

  return data;
};

const getData = async () => {
  const classes = await getClasses();
  const subjects = await getSubjects();

  return { classes, subjects };
};

const page = async () => {
  const { classes, subjects } = await getData();

  return (
    <div
      className={cn("flex w-full items-center justify-between", "p-2", "gap-2")}
    >
      <ClassSectionComponent classes={classes} />
      <SubjectsComponent subjects={subjects} />
    </div>
  );
};

export default page;
