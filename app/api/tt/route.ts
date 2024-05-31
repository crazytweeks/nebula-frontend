import db from "@/lib/pg/ghConnection";
import { NewTimeTable } from "@/lib/pg/timeTable";
import { NextRequest } from "next/server";
import { z } from "zod";

// type Event = {
//   event_id: number | string;
//   title: string;
//   start: Date;
//   end: Date;
//   disabled?: boolean;
//   color?: string;
//   textColor?: string;
//   editable?: boolean;
//   deletable?: boolean;
//   draggable?: boolean;
//   allDay?: boolean;
//   /**
//    * @default " "
//    * passed as a children to mui <Avatar /> component
//    */
//   agendaAvatar?: React.ReactElement | string;
// };

const actionsSchema = z.union([
  z.literal("create"),
  z.literal("update"),
  z.literal("delete"),
]);

const eventSchema = z.object({
  event_id: z.union([z.number(), z.string()]).nullable(),
  title: z.string(),
  start: z.string().transform((val) => new Date(val)),
  end: z.string().transform((val) => new Date(val)),
  disabled: z.boolean().optional(),
  color: z.string().optional(),
  textColor: z.string().optional(),
  editable: z.boolean().optional(),
  deletable: z.boolean().optional(),
  draggable: z.boolean().optional(),
  allDay: z.boolean().optional(),
  agendaAvatar: z.string().optional(),
  selectedClass: z.number(),
  // week_day: z.number(),

  //additional fields
  subject_id: z.number(),

  action: actionsSchema,
});

type Event = z.infer<typeof eventSchema>;

const genRandomNumber = () => Math.floor(Math.random() * 1000);

const createDate = (hour: number, minute: number, week: number) => {
  // create a date object with the current date and time in the user's time zone
  // set the week day to the week day of the week
  const date = new Date();

  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : week);
  const newDate = new Date(date.setDate(diff));

  newDate.setHours(hour);
  newDate.setMinutes(minute);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
};

const saveToDb = async (data: Event) =>
  new Promise<Event>(async (resolve, reject) => {
    try {
      const values = {
        class_section_id: data.selectedClass,
        title: data.title,
        subject_id: data.subject_id,

        created_at: new Date(),
        start_hour: data.start.getHours(),
        start_minute: data.start.getMinutes(),

        end_hour: data.end.getHours(),
        end_minute: data.end.getMinutes(),

        week_day: data.start.getDay(),

        id: parseInt((data.event_id as string) || genRandomNumber().toString()),
      };

      const add = await db
        .insertInto("test_tt")
        .values(values)
        .returningAll()
        .executeTakeFirst();

      const newData: NewTimeTable = {
        ...(add as any),
      };

      const resolvedData = {
        ...newData,
        event_id: newData.id,
        title: newData.title,
        start: createDate(
          newData.start_hour,
          newData.start_minute,
          newData.week_day
        ),
        end: createDate(newData.end_hour, newData.end_minute, newData.week_day),
        selectedClass: data.selectedClass,
        subject_id: data.subject_id,
        action: "create",
      };

      resolve(resolvedData as Event);
    } catch (error: any) {
      reject(error);
    }
  });

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const classId = parseInt(params.get("class") ?? "0");

  const data =
    classId > 0
      ? await db
          .selectFrom("test_tt")
          .where("class_section_id", "=", classId)
          .selectAll()
          .execute()
      : await db.selectFrom("test_tt").selectAll().execute();

  return Response.json(
    {
      message: "Hello",
      data,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const validatedData = eventSchema.parse(json);

    const savedData = await saveToDb(validatedData);

    return Response.json(
      {
        message: "Success",
        saveData: savedData,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("error: ", error);
    return Response.json(
      {
        message: "Error",
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
