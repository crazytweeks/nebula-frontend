import { TimeTable, Event, ClassSection, Subject } from "@lib/pg/timeTable";
import { createKysely } from "@vercel/postgres-kysely";

const env = process.env;

interface Database {
  test_tt_subject: Subject;
  test_tt_class_section: ClassSection;
  test_tt_event: Event;
  test_tt: TimeTable;
}

const connectionString = `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DATABASE}`;
console.log("connectionString: ", connectionString);

const db = createKysely<Database>({
  // connectionString: env.PG_URL,
  log(...messages) {
    console.log("Kysely: ", messages);
  },

  connectionString,
});

export default db;
