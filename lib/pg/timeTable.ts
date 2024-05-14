import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

interface TimeTableTable {
  id: Generated<number>;
  start: ColumnType<string, string | undefined, never>;
  end: ColumnType<string, string | undefined, never>;
  class: string;
  section: string;
  created_at: ColumnType<Date, string | undefined, never>;
  metadata?: JSONColumnType<{
    login_at: string;
    ip: string | null;
    agent: string | null;
    plan: "free" | "premium";
  }>;
}

type TimeTable = Selectable<TimeTableTable>;
type NewTimeTable = Insertable<TimeTableTable>;
type UpdatedTimeTable = Updateable<TimeTableTable>;

export type { TimeTable, NewTimeTable, UpdatedTimeTable };
