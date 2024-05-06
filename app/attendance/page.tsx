import AttendanceComponent from "@/components/attendance/attendance";
import { awaitFor } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import React, { cache } from "react";

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

export function createRandomStudent(): Student {
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
}

const getListOfStudents = async () => {
  await awaitFor(1000);
  return faker.helpers.multiple(createRandomStudent, {
    count: 10,
  });
};

export const revalidate = 30;

const AttendancePage = async () => {
  const students = await getListOfStudents();

  return (
    <div>
      <AttendanceComponent students={students} />
    </div>
  );
};

export default AttendancePage;
