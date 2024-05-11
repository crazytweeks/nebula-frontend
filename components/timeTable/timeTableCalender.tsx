"use client";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { now } from "@internationalized/date";
import { TZ } from "@/lib/utils";

const localizer = dayjsLocalizer(dayjs);

const TimeTableCalender = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[
          {
            end: now(TZ)
              .add({
                hours: 1,
              })
              .toDate(),
            start: new Date(),
          },
        ]}
        startAccessor="start"
        endAccessor="end"
        date={new Date()}
      />
    </div>
  );
};

export default TimeTableCalender;
