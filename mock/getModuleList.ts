import axios from "axios";
import { z } from "zod";
import { faker } from "@faker-js/faker";

const schema = z.object({
  createdAt: z.string(),
  name: z.string(),
  id: z.string(),
});

type Module = z.infer<typeof schema>;

function createRandomModule(): Module {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    createdAt: faker.date.past().toISOString(),
  };
}

const getModules = (count = 5): Module[] =>
  faker.helpers.multiple(createRandomModule, {
    count,
  });

const axiosInterceptor = axios.create({
  baseURL: "https://662aeb73de35f91de156be39.mockapi.io/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getModuleList = async () => {
  try {
    const { data } = await axiosInterceptor.get("modules");

    return schema.parse(data);
  } catch (error) {
    console.log(error);

    return null;
  }
};

export { getModuleList, getModules };
