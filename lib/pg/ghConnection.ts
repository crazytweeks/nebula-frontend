import { TimeTable, Event, ClassSection, Subject } from "@lib/pg/timeTable";
import { Pool, PoolConfig } from "pg";
import { Generated, Kysely, PostgresDialect } from "kysely";

const env = process.env;

const connection: PoolConfig = {
  database: env.POSTGRES_DATABASE,
  host: env.POSTGRES_HOST,
  user: env.POSTGRES_USER,
  port: parseInt(env.POSTGRES_PORT ?? "5432"),
  password: "@ppUser$123", // TODO: WARNING: Hardcoded password
  ssl: {
    rejectUnauthorized: false,
  },
  options: "-c search_path=active_directory",
  max: 10,
};

const dialect = new PostgresDialect({
  pool: new Pool(connection),

  onCreateConnection: async () => {
    console.info("Connected to database", connection);
  },
});

interface Database {
  test_tt_subject: Subject;
  test_tt_class_section: ClassSection;
  test_tt_event: Event;
  test_tt: TimeTable;
}

const db = new Kysely<Database>({
  dialect,
});

export default db;
