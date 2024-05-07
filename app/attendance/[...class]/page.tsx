import StudentsList from "@/components/attendance/studentsList";
import { awaitFor } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { Divider } from "@nextui-org/divider";
import React, { FC, cache } from "react";

export type Student = {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: Date;
  registeredAt: Date;
  class: string;
};

const createRandomStudent = (): Student => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),

    class: faker.word.noun(),
  };
};

const getListOfStudents = cache(async () => {
  await awaitFor(1000);
  return faker.helpers.multiple(createRandomStudent, {
    count: 10,
  });
});

const AttendanceClassComp: FC<{
  params: { class: string[] };
}> = async ({ params }) => {
  const students = await getListOfStudents();

  const classString = params.class[0];
  const sectionString = params.class[1] ?? "A";
  const dayString = params.class[2] ?? "today";

  return (
    <div>
      <Divider className="my-6" />

      <h1 className="text-2xl font-bold mb-2">
        Attendance for {classString} {sectionString} {dayString}
      </h1>

      <StudentsList students={students} />
    </div>
  );
};

export default AttendanceClassComp;
