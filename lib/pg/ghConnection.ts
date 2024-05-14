import { TimeTable } from "@lib/pg/timeTable";
import { Pool, PoolConfig } from "pg";
import { Generated, Kysely, PostgresDialect } from "kysely";
import { up } from "./migrate";

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
});

interface Database {
  activeDirectory_adusermaster: any;
}

const db = new Kysely<Database>({
  dialect,
});

export default db;
