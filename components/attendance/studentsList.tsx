"use client";

import { FC } from "react";
import { SwipeableList, Type as SwipeableType } from "react-swipeable-list";
import StudentItemCard from "@/components/attendance/studentItemCard";
import { Student } from "@/app/attendance/[...class]/page";

const StudentsList: FC<{
  students?: Student[];
}> = ({ students = [] }) => {
  return (
    <SwipeableList
      threshold={0.25}
      fullSwipe={false}
      type={SwipeableType.ANDROID}
    >
      {students.map((student) => (
        <StudentItemCard key={student.userId} name={student.username} />
      ))}
    </SwipeableList>
  );
};

export default StudentsList;
