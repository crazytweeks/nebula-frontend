"use client";

import { Button } from "@/components/ui/button";

import { DatePicker } from "@nextui-org/date-picker";
import { DateValue, parseDate } from "@internationalized/date";
import { FC, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { cn, currentDay } from "@/lib/utils";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { Alert } from "@/components/ui/alert";
import { toast } from "sonner";
import { Badge } from "@nextui-org/badge";

const listOfStudents = [
  "John Doe",
  "Jane Doe",
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
];

type StudentItemProps = {
  name: string;
};

const handleAccept = (id: string) => () => {
  console.log("[Handle ACCEPT]", id);

  toast.success(`Marked ${id} as present`);
};

const handleDelete = (id: string) => () => {
  console.log("[Handle DELETE]", id);

  toast.error(`Marked ${id} as absent`);
};

const leadingActions: FC<StudentItemProps> = ({ name }) => (
  <LeadingActions>
    <SwipeAction onClick={handleAccept(name)}>
      <Alert
        className={cn(
          "text-white bg-green-500 hover:bg-green-600",
          "rounded-lg p-2 m-2 shadow-md",
          "max-h-[80%] flex items-center justify-center"
        )}
      >
        Present
      </Alert>
    </SwipeAction>
  </LeadingActions>
);

const trailingActions: FC<StudentItemProps> = ({ name }) => (
  <TrailingActions>
    <SwipeAction onClick={handleDelete(name)}>
      <Alert
        className={cn(
          "text-white bg-red-500 hover:bg-red-600",

          "rounded-lg p-2 m-2 shadow-md",
          "max-h-[80%] flex items-center justify-center"
        )}
      >
        Absent
      </Alert>
    </SwipeAction>
  </TrailingActions>
);

const StudentItem: FC<StudentItemProps> = ({ name }) => {
  const [marked, setMarked] = useState<
    "present" | "absent" | "late" | undefined
  >(undefined);

  return (
    <SwipeableListItem
      key={`item-${name}`}
      leadingActions={leadingActions({ name })}
      trailingActions={trailingActions({ name })}
      onSwipeProgress={(progress, direction) => {
        if (progress > 25 && direction === "left") {
          if (!marked) {
            toast.error(`Marked ${name} as absent`);
            setMarked("absent");
          }
        }

        if (progress > 25 && direction === "right") {
          if (!marked) {
            toast.success(`Marked ${name} as present`);
            setMarked("present");
          }
        }

        if (typeof marked === "string" && progress < 25) {
          toast.info(`Already marked ${name} as ${marked}.`);
        }
      }}
      blockSwipe={false}
      fullSwipe={false}
      actionDelay={500}
    >
      <div
        className={cn(
          "flex justify-between items-center",
          "rounded-lg p-4 m-2 shadow-md",
          "w-full",

          "cursor-pointer",
          "transition-all duration-200 ease-in-out",
          "hover:bg-opacity-80 hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <div>{name}</div>
        <Badge
          color={marked ? "success" : "warning"}
          content={marked === "present" ? "✅" : "❌"}
          isInvisible={!marked}
        >
          <div className="md:flex items-center space-x-2 hidden">
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              size="sm"
              variant="outline"
            >
              Present
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              size="sm"
              variant="outline"
            >
              Absent
            </Button>
            <Button
              className="bg-yellow-500 text-white hover:bg-yellow-600"
              size="sm"
              variant="outline"
            >
              Late
            </Button>
          </div>
        </Badge>
      </div>
    </SwipeableListItem>
  );
};

const StudentsList = () => {
  return (
    <div className="mt-6">
      <ul className="space-y-4">
        <SwipeableList threshold={0.25} fullSwipe={true} type={Type.ANDROID}>
          {listOfStudents.map((student) => (
            <StudentItem key={student} name={student} />
          ))}
        </SwipeableList>
      </ul>
    </div>
  );
};

export default function Component() {
  const [date, setDate] = useState<DateValue>(parseDate(currentDay()));

  return (
    <div className="min-w-full">
      <div className="flex items-center justify-evenly mb-6 min-w-full">
        <h2 className="text-2xl font-bold">Attendance Tracking</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Mark student attendance for a class on a specific date.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Select
            label="Subject"
            placeholder="Select a subject"
            isRequired
            defaultSelectedKeys={["math"]}
          >
            <SelectItem key={"math"} value="math">
              Math
            </SelectItem>
            <SelectItem key={"english"} value="english">
              English
            </SelectItem>
            <SelectItem key={"science"} value="science">
              Science
            </SelectItem>
            <SelectItem key={"history"} value="history">
              History
            </SelectItem>
          </Select>
        </div>
        <div>
          <DatePicker
            label="Date"
            selectorIcon={<CalendarDaysIcon className="w-6 h-6" />}
            isRequired
            value={date}
            onChange={setDate}
          />
        </div>
      </div>

      <StudentsList />
    </div>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
