import db from "@/lib/pg/ghConnection";
import { ClassSection, Subject } from "@/lib/pg/timeTable";

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

const getClassSubjects = async () => {
  const classes = await getClasses();
  const subjects = await getSubjects();

  return { classes, subjects } satisfies DataParams;
};

type DataParams = {
  classes: ClassSection[];
  subjects: Subject[];
};

export type { DataParams };
export { getClasses, getSubjects, getClassSubjects };
