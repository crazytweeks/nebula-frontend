import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

type ID = Generated<number>;

const SubjectSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string().optional(),
  color: z.string().nullable(),
});

interface SubjectTable extends z.infer<typeof SubjectSchema> {
  id: ID;
  created_at: Date;
}

const ClassSectionSchema = z.object({
  class_name: z.string(),
  class_description: z.string().optional(),
  section_name: z.string(),
});

interface ClassSectionTable extends z.infer<typeof ClassSectionSchema> {
  id: ID;
  created_at: Date;
}

const TimeTableSchema = z.object({
  title: z.string(),
  week_day: z.number().min(0).max(6),
  start_hour: z.number().min(0).max(23),
  end_hour: z.number().min(0).max(23),
  start_minute: z.number().min(0).max(59),
  end_minute: z.number().min(0).max(59),
  subject_id: z.number(),
  class_section_id: z.number(),
});

interface TimeTableTable extends z.infer<typeof TimeTableSchema> {
  id: ID;
  created_at: Date;
}

const EventSchema = z.object({
  title: z.string(),
  start: z.date(),
  end: z.date(),
  all_day: z.boolean(),
  class_section_id: z.number(),
  subject_id: z.number(),
  color: z.string().optional(),
});

interface EventTable extends z.infer<typeof EventSchema> {
  id: ID;
}

type TimeTable = Selectable<TimeTableTable>;
type NewTimeTable = Insertable<TimeTableTable>;
type UpdatedTimeTable = Updateable<TimeTableTable>;

type Subject = Selectable<SubjectTable>;
type NewSubject = Insertable<SubjectTable>;
type UpdatedSubject = Updateable<SubjectTable>;

type ClassSection = Selectable<ClassSectionTable>;
type NewClassSection = Insertable<ClassSectionTable>;
type UpdatedClassSection = Updateable<ClassSectionTable>;

type Event = Selectable<EventTable>;
type NewEvent = Insertable<EventTable>;
type UpdatedEvent = Updateable<EventTable>;

export { SubjectSchema, ClassSectionSchema, TimeTableSchema, EventSchema };

export type { Subject, NewSubject, UpdatedSubject };
export type { ClassSection, NewClassSection, UpdatedClassSection };
export type { Event, NewEvent, UpdatedEvent };
export type { TimeTable, NewTimeTable, UpdatedTimeTable };
