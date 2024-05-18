import ClassSectionComponent from "@/components/timeTable/classSection";
import SubjectsComponent from "@/components/timeTable/subject";
import db from "@/lib/pg/ghConnection";
import { ClassSection, Subject } from "@/lib/pg/timeTable";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import PrepareTTData from "./prepareTTData";

export const dynamic = "force-dynamic";

const getClasses = async () => {
  try {
    const data = (await db
      .selectFrom("test_tt_class_section")
      .selectAll()
      .execute()) as ClassSection[];

    return data;
  } catch (error) {
    return [];
  }
};

const getSubjects = async () => {
  try {
    const data = (await db
      .selectFrom("test_tt_subject")
      .selectAll()
      .execute()) as Subject[];

    return data;
  } catch (error) {
    return [];
  }
};

const getData = async () => {
  const classes = await getClasses();
  const subjects = await getSubjects();

  return { classes, subjects };
};

const page = async () => {
  const { classes, subjects } = await getData();

  return (
    <div>
      <PrepareTTData classes={classes} subjects={subjects} />
    </div>
  );
};

export default page;
