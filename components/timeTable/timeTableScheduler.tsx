"use client";

import { TZ } from "@/lib/utils";
import { Scheduler } from "@aldabil/react-scheduler";
import { SelectOption } from "@aldabil/react-scheduler/components/inputs/SelectInput";
import { EVENTS, RESOURCES, generateRandomEvents } from "./events";
import { FC, useMemo } from "react";
import { DataParams } from "@/app/data/fromDb";
import type { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { TimeTableData } from "@/app/timeTable/[...ttProps]/page";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  selectedClass: string;
  selectedSubject: string;
  data: DataParams;
  timeTableData: TimeTableData;
}

type E = {
  // event_id: number | string;
  // title: string;
  // start: Date;
  // end: Date;
  // disabled?: boolean;
  // color?: string;
  // textColor?: string;
  // editable?: boolean;
  // deletable?: boolean;
  // draggable?: boolean;
  // allDay?: boolean;
  // /**
  //  * @default " "
  //  * passed as a children to mui <Avatar /> component
  //  */
  // agendaAvatar?: React.ReactElement | string;
} & ProcessedEvent;

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

const TimeTableScheduler: FC<Props> = ({
  selectedClass,
  data,
  selectedSubject,

  timeTableData,
}) => {
  console.log("timeTableData: ", timeTableData);

  const subjects: SelectOption[] = useMemo(() => {
    return data.subjects.map((subject) => ({
      id: subject.id,
      text: subject.name,
      value: subject.id,
      color: subject.color,
    }));
  }, [data]);

  const getSubjectColor = (subjectId: number) => {
    const subject = data.subjects.find((s) => s.id === subjectId);

    return subject?.color ?? undefined;
  };

  const events: E[] = useMemo(() => {
    const weeklyData = timeTableData.timetable.map((tt) => {
      return {
        event_id: typeof tt.id === "string" ? parseInt(tt.id) : tt.id ?? 0,
        title: tt.title,
        start: createDate(tt.start_hour, tt.start_minute, tt.week_day),
        end: createDate(tt.end_hour, tt.end_minute, tt.week_day),
        color: getSubjectColor(tt.subject_id),
        // textColor: getSubjectTextColor(tt.subject_id),
        draggable: true,
        deletable: true,
        editable: true,
        subject: tt.subject_id,
      } satisfies E;
    });

    return weeklyData;
  }, []);

  return (
    <div className={"w-full h-full py-2 align-middle"}>
      <Scheduler
        selectedDate={new Date()}
        view={"week"}
        navigation={true}
        // getRemoteEvents={() => {
        //   return new Promise((resolve) => {
        //     setTimeout(() => {
        //       const random = generateRandomEvents(5);

        //       resolve([...EVENTS, ...random]);
        //     }, 1000);
        //   });
        // }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 0,
          startHour: 9,
          endHour: 19,
          step: 60,
          navigation: true,
          disableGoToDay: false,
        }}
        alwaysShowAgendaDays={true}
        fields={[
          {
            name: "subject",
            type: "select",
            options: subjects,
            config: {
              label: "Subject",
              placeholder: "Select Subject",
              required: true,
            },
          },
          {
            name: "title",
            type: "input",
            config: {
              label: "Title",
              placeholder: "Enter Title",
              required: false,
            },
          },
        ]}
        // resources={RESOURCES}
        events={events}
        timeZone={TZ}
        day={{
          startHour: 9,
          endHour: 19,
          step: 30,
          navigation: true,
        }}
        hourFormat="12"
        onEventClick={(event) => {
          console.log("Event click : ", event);
        }}
        onEventEdit={(event) => {
          console.log("Edit : ", event);
        }}
        onConfirm={async (event, action) =>
          new Promise(async (resolve, reject) => {
            const toPost = {
              ...event,
              selectedClass: parseInt(selectedClass),
              subject_id: parseInt(event.subject),
              action,
            };

            const postData = await axios.post("/api/tt", toPost);

            if (postData.status === 200) {
              toast.success("Event saved successfully");

              console.log("postData.saveData: ", postData.data.saveData);
              return resolve({ ...event, event_id: postData.data.saveData.id });
            } else {
              toast.error("Failed to save event");

              return reject("Failed to save event");
            }
          })
        }
      />
    </div>
  );
};

export default TimeTableScheduler;
