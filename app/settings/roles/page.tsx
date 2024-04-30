import { getModuleList } from "@/mock/getModuleList";
import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour

const getModules = cache(async () => {
  return await getModuleList();
});

const Roles = async () => {
  const modules = await getModules();

  return (
    <div>
      <pre>{JSON.stringify(modules, null, 2)}</pre>
    </div>
  );
};

export default Roles;
