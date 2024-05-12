"use client";

import { TZ } from "@/lib/utils";
import { Scheduler } from "@aldabil/react-scheduler";
import { SelectOption } from "@aldabil/react-scheduler/components/inputs/SelectInput";
import { Button } from "@nextui-org/button";
import { useState } from "react";

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
    <>
      <Scheduler
        selectedDate={new Date()}
        view="week"
        navigation={false}
        getRemoteEvents={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  event_id: 3,
                  title: "IPR II",
                  start: new Date("2024/5/12 11:30"),
                  end: new Date("2024/5/12 12:30"),
                  color: "blue",
                },
                {
                  event_id: 4,
                  title: "Land Law",
                  start: new Date("2024/5/12 12:30"),
                  end: new Date("2024/5/12 13:30"),
                  color: "purple",
                },
                {
                  event_id: 5,
                  title: "Environmental Law",
                  start: new Date("2024/5/12 14:30"),
                  end: new Date("2024/5/12 15:30"),
                  color: "yellow",
                  textColor: "black",
                },
                {
                  event_id: 6,
                  title: "White Color Crime",
                  start: new Date("2024/5/12 15:30"),
                  end: new Date("2024/5/12 16:30"),
                  color: "orange",
                },
              ]);
            }, 1000);
          });
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 0,
          startHour: 9,
          endHour: 18,
          step: 60,
          navigation: false,
          disableGoToDay: false,
        }}
        alwaysShowAgendaDays={true}
        fields={[
          {
            name: "title",
            type: "select",
            options: subjects,
          },
        ]}
        events={[
          {
            event_id: 1,
            title: "IOS",
            start: new Date("2024/5/12 09:30"),
            end: new Date("2024/5/12 10:30"),
            color: "green",
            agendaAvatar: "https://randomuser.me/api/portraits",
          },
          {
            event_id: 2,
            title: "IPR",
            start: new Date("2024/5/12 10:30"),
            end: new Date("2024/5/12 11:30"),
            color: "red",
          },
        ]}
        timeZone={TZ}
      />
    </>
  );
};

export default TimeTableScheduler;
