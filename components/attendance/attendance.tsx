"use client";

import { Button } from "@/components/ui/button";

import { DatePicker } from "@nextui-org/date-picker";
import { DateValue, parseDate } from "@internationalized/date";
import { FC, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { cn, currentDay } from "@/lib/utils";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
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
import { IconCalendarDays } from "@/components/icons/calender";
import { Student } from "@/app/attendance/page";
import { Icon3DotsVertical } from "@icons/3dots";

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

  const alreadyMarked = typeof marked === "string";

  return (
    <SwipeableListItem
      key={`item-${name}`}
      leadingActions={leadingActions({ name })}
      trailingActions={trailingActions({ name })}
      onSwipeEnd={(direction) => {
        if (direction === "left") {
          if (!marked) {
            toast.error(`Marked ${name} as absent`);
            setMarked("absent");
          }
        }

        if (direction === "right") {
          if (!marked) {
            toast.success(`Marked ${name} as present`);
            setMarked("present");
          }
        }

        if (alreadyMarked) {
          toast.info(`Already marked ${name} as ${marked}.`);
        }
      }}
      // onSwipeProgress={(progress, direction) => {
      //   if (progress < 25 || progress > 30) return;

      //   if (direction === "left") {
      //     if (!marked) {
      //       toast.error(`Marked ${name} as absent`);
      //       setMarked("absent");
      //     }
      //   }

      //   if (direction === "right") {
      //     if (!marked) {
      //       toast.success(`Marked ${name} as present`);
      //       setMarked("present");
      //     }
      //   }

      //   if (alreadyMarked) {
      //     toast.info(`Already marked ${name} as ${marked}.`);
      //   }
      // }}
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
          "hover:bg-opacity-80 hover:bg-gray-100 dark:hover:bg-gray-800",

          "hover:shadow-lg dark:hover:shadow-xl md:hover:scale-95"
        )}
      >
        <div>
          <Badge
            color={
              marked === "present"
                ? "success"
                : marked === "absent"
                ? "danger"
                : marked === "late"
                ? "warning"
                : "default"
            }
            content={
              marked === "present"
                ? "✅"
                : marked === "absent"
                ? "❌"
                : marked === "late"
                ? "🕒"
                : ""
            }
            isInvisible={!marked}
            variant="shadow"
            placement="top-left"
          >
            <span
              className={cn(
                "text-lg font-bold",
                "transition-all duration-200 ease-in-out",
                "hover:text-green-500 dark:hover:text-green-400",

                alreadyMarked &&
                  "transform hover:scale-110 transition-transform duration-200 ease-in-out translate-x-4",
                (marked === "present" && "text-green-500") ||
                  (marked === "absent" && "text-red-500") ||
                  (marked === "late" && "text-yellow-500")
              )}
            >
              {name}
            </span>
          </Badge>
        </div>

        <div className="md:flex items-center space-x-2 hidden">
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            size="sm"
            variant="outline"
            onClick={() => setMarked("present")}
          >
            P
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            size="sm"
            variant="outline"
            onClick={() => setMarked("absent")}
          >
            A
          </Button>
          <Button
            className="bg-yellow-500 text-white hover:bg-yellow-600"
            size="sm"
            variant="outline"
            onClick={() => setMarked("late")}
          >
            Late
          </Button>
        </div>

        <div className="md:hidden flex">
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="link">
                <Icon3DotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="present"
                onClick={() => setMarked("present")}
                color="success"
                variant={alreadyMarked ? "shadow" : "faded"}
                endContent={<span>✅</span>}
              >
                {"Present"}
              </DropdownItem>
              <DropdownItem
                key="absent"
                onClick={() => setMarked("absent")}
                color="danger"
                variant={alreadyMarked ? "shadow" : "faded"}
                endContent={<span>❌</span>}
              >
                {"Absent"}
              </DropdownItem>
              <DropdownItem
                key="late"
                onClick={() => setMarked("late")}
                color="warning"
                variant={alreadyMarked ? "shadow" : "faded"}
                endContent={<span>🕒</span>}
              >
                {"Late"}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </SwipeableListItem>
  );
};

const StudentsList: FC<{
  students?: Student[];
}> = ({ students = [] }) => {
  return (
    <div className="mt-6">
      <ul className="space-y-4">
        <SwipeableList threshold={0.25} fullSwipe={false} type={Type.ANDROID}>
          {students.map((student) => (
            <StudentItem key={student.userId} name={student.username} />
          ))}
        </SwipeableList>
      </ul>
    </div>
  );
};

const AttendanceComponent: FC<{
  students: Student[];
}> = ({ students }) => {
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
            selectorIcon={<IconCalendarDays className="w-6 h-6" />}
            isRequired
            value={date}
            onChange={setDate}
          />
        </div>
      </div>

      <StudentsList students={students} />
    </div>
  );
};

export default AttendanceComponent;
