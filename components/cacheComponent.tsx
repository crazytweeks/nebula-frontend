import { awaitFor, cn } from "@/lib/utils";
import { getModules } from "@/mock/getModuleList";
import { Divider } from "@nextui-org/divider";
import React from "react";

export const revalidate = 60;

const getData = async (count = 50) => {
  await awaitFor(1500);
  return {
    modules: getModules(count),
    fetchAt: new Date().toLocaleTimeString(),
  };
};

const CacheComponent = async () => {
  const { modules, fetchAt } = await getData();

  return (
    <div className={cn("w-full h-full  overflow-auto")}>
      <h1>Below is a cached component</h1>

      <p>{modules.length} modules</p>

      <p>{fetchAt}</p>

      <Divider />

      <div>
        {modules.map((module) => (
          <div key={module.id}>{module.name}</div>
        ))}
      </div>
    </div>
  );
};

export default CacheComponent;
