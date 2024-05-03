import RolesTable from "@/components/settings/roles/table";
import { getModuleList } from "@/mock/getModuleList";
import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour

// const getModules = cache(async () => {
//   return await getModuleList();
// });

// const modules = await getModules();
const Roles = async () => {
  return (
    <div>
      <RolesTable />
    </div>
  );
};

export default Roles;
