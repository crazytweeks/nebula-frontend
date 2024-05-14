"use client";

import { TZ } from "@/lib/utils";
import { Scheduler } from "@aldabil/react-scheduler";
import { SelectOption } from "@aldabil/react-scheduler/components/inputs/SelectInput";
import { EVENTS, RESOURCES, generateRandomEvents } from "./events";

const subjects: SelectOption[] = [
  { id: 1, text: "Moot Court", value: "moot" },
  { id: 2, text: "IPR II", value: "ipr2" },
  { id: 3, text: "Land Law", value: "landLaw" },
  { id: 4, text: "Environmental Law", value: "envLaw" },
  { id: 5, text: "White Color Crime", value: "wcc" },
  { id: 6, text: "International Trade", value: "ite" },
];

const TimeTableScheduler = () => {
  return (
    <div className={"w-full h-full py-2 align-middle"}>
      <Scheduler
        selectedDate={new Date()}
        view={"week"}
        navigation={true}
        getRemoteEvents={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const random = generateRandomEvents(5);

              resolve([...EVENTS, ...random]);
            }, 1000);
          });
        }}
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
        resources={RESOURCES}
        events={EVENTS}
        timeZone={TZ}
        day={{
          startHour: 9,
          endHour: 19,
          step: 30,
          navigation: true,
        }}
        hourFormat="12"
        onEventClick={(event) => {
          console.log(event);
        }}
      />
    </div>
  );
};

export default TimeTableScheduler;
