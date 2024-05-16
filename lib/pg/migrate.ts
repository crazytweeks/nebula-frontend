import { Kysely, sql } from "kysely";

const _SCHEMA = "active_directory";

export async function up(db: Kysely<any>): Promise<void> {
  try {
    await db.schema
      .createTable("test_tt_subject")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("name", "varchar", (col) => col.notNull().unique())
      .addColumn("code", "varchar", (col) => col.notNull().unique())
      .addColumn("description", "text")
      .addColumn("color", "varchar", (col) =>
        col.notNull().defaultTo(sql`'blue'`)
      )
      .addColumn("created_at", "timestamp", (col) =>
        col.defaultTo(sql`now()`).notNull()
      )
      .execute();

    await db.schema

      .createTable("test_tt_class_section")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("class_name", "varchar", (col) => col.notNull())
      .addColumn("class_description", "text")
      .addColumn("section_name", "varchar", (col) => col)
      .addColumn("created_at", "timestamp", (col) =>
        col.defaultTo(sql`now()`).notNull()
      )
      .execute();

    await db.schema

      .createTable("test_tt")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("title", "varchar", (col) => col.notNull())
      .addColumn("week_day", "integer", (col) => col.notNull())
      .addColumn("start_hour", "integer", (col) => col.notNull())
      .addColumn("end_hour", "integer", (col) => col.notNull())
      .addColumn("start_minute", "integer", (col) => col.notNull())
      .addColumn("end_minute", "integer", (col) => col.notNull())
      .addColumn("created_at", "timestamp", (col) =>
        col.defaultTo(sql`now()`).notNull()
      )
      .addColumn("subject_id", "integer", (col) =>
        col.references("test_tt_subject.id").notNull()
      )
      .addColumn("class_section_id", "integer", (col) =>
        col.references("test_tt_class_section.id").notNull()
      )
      .execute();

    await db.schema

      .createTable("test_tt_event")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("title", "varchar", (col) => col)
      .addColumn("start", "timestamp", (col) => col.notNull())
      .addColumn("end", "timestamp", (col) => col.notNull())
      .addColumn("all_day", "boolean", (col) => col.notNull().defaultTo(false))
      .addColumn("class_section_id", "integer", (col) =>
        col.references("test_tt_class_section.id").notNull()
      )
      .addColumn("subject_id", "integer", (col) =>
        col.references("test_tt_subject.id")
      )
      .addColumn("color", "varchar", (col) =>
        col.notNull().defaultTo(sql`'#8000cc'`)
      )
      .addColumn("created_at", "timestamp", (col) =>
        col.defaultTo(sql`now()`).notNull()
      )
      .execute();
  } catch (e) {
    return Promise.reject(e);
  }

  // await db.schema
  //   .createTable("pet")
  //   .addColumn("id", "serial", (col) => col.primaryKey())
  //   .addColumn("name", "varchar", (col) => col.notNull().unique())
  //   .addColumn("owner_id", "integer", (col) =>
  //     col.references("person.id").onDelete("cascade").notNull()
  //   )
  //   .addColumn("species", "varchar", (col) => col.notNull())
  //   .execute();

  // await db.schema
  //   .createIndex("pet_owner_id_index")
  //   .on("test_tt")
  //   .column("owner_id")
  //   .execute();
}

export const createSchema = async (db: Kysely<any>, schema: string) => {
  const c = await db.schema.createSchema(schema).execute();
  console.log("c: ", c);
};

export async function down(db: Kysely<any>): Promise<void> {
  // await db.schema.dropTable("pet").execute();
  // await db.schema.dropTable("person").execute();
  try {
    await db.schema.dropTable("test_tt").execute();
    await db.schema.dropTable("test_tt_subject").execute();
    await db.schema.dropTable("test_tt_class").execute();
    await db.schema.dropTable("test_tt_section").execute();
    await db.schema.dropTable("test_tt_event").execute();
  } catch (e) {
    return Promise.reject(e);
  }
}
