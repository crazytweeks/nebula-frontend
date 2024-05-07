"use client";

import { DatePicker } from "@nextui-org/date-picker";
import { DateValue, parseDate } from "@internationalized/date";
import { FC, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { cn, currentDay } from "@/lib/utils";
import "react-swipeable-list/dist/styles.css";
import { IconCalendarDays } from "@/components/icons/calender";
import { usePathname, useRouter } from "next/navigation";

const subjects = ["Math", "English", "Science", "History"];
const sections = ["A", "B", "C", "D"];

const createPath = (subject: string, section: string, date: DateValue) => {
  return `/attendance/${subject}/${section}/${date}`;
};

const AttendanceSelection: FC = () => {
  const router = useRouter();
  const path = usePathname();

  const [date, setDate] = useState<DateValue>(parseDate(currentDay()));
  const [section, setSection] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (value: string) => {};

  useEffect(() => {
    if (!subject || !section || !date) return;
    const newPath = createPath(subject, section, date);

    if (newPath === path) {
      setLoading(false);
    } else {
      setLoading(true);
      router.push(newPath);
    }
  }, [section, subject, date, handleOnChange, path]);

  return (
    <div className="min-w-full">
      <div
        className={cn(
          "flex items-center justify-evenly mb-6 min-w-full",
          "transform ",
          loading && "opacity-10"
        )}
      >
        <h2 className="text-2xl font-bold">Attendance Tracking</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Mark student attendance for a class on a specific date.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-2">
        <div>
          <Select
            label="Subject"
            selectorIcon={<IconCalendarDays className="w-6 h-6" />}
            isRequired
            value={subjects[0]}
            className="md:col-span-2"
            onChange={(value) => setSubject(value.target.value)}
          >
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <Select
            label="Section"
            selectorIcon={<IconCalendarDays className="w-6 h-6" />}
            isRequired
            value={section}
            onChange={(value) => setSection(value.target.value)}
          >
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <DatePicker
            label="Date"
            className="md:col-span-2"
            selectorIcon={<IconCalendarDays className="w-6 h-6" />}
            isRequired
            value={date}
            onChange={setDate}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceSelection;
