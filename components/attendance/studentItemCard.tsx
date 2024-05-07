"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { FC, useState } from "react";
import { toast } from "sonner";
import { Icon3DotsVertical } from "@icons/3dots";
import {
  LeadingActions,
  SwipeAction,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import { Alert } from "../ui/alert";

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

const StudentItemCard: FC<StudentItemProps> = ({ name }) => {
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
          "bg-white dark:bg-gray-900",

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
            variant="bordered"
            onClick={() => setMarked("present")}
          >
            P
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            size="sm"
            variant="bordered"
            onClick={() => setMarked("absent")}
          >
            A
          </Button>
          <Button
            className="bg-yellow-500 text-white hover:bg-yellow-600"
            size="sm"
            variant="bordered"
            onClick={() => setMarked("late")}
          >
            Late
          </Button>
        </div>

        <div className="md:hidden flex">
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="ghost">
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

export default StudentItemCard;
