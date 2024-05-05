"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { Select, SelectItem } from "@nextui-org/select";
import { IconSearch } from "@/components/icons/search";
import { IconGrid1x2Fill } from "@/components/icons/grid";
import ModuleCard from "./moduleCard";

export type ModuleItem = {
  name: string;
  permission: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    add: boolean;
  };
};

type APermission = {
  label: string;
};
export type AdditionalPermission = {
  assigned?: Array<APermission>;
  available: Array<APermission>;
};

export type ModulePermissions = Array<{
  name: string;
  items: Array<ModuleItem>;
  additionalPermissions?: AdditionalPermission;
}>;

const modules: ModulePermissions = [
  {
    name: "Attendance Manager",
    items: [
      {
        name: "Attendance",
        permission: {
          view: true,
          edit: true,
          delete: false,
          add: true,
        },
      },
      {
        name: "Leaves",
        permission: {
          view: true,
          edit: true,
          delete: true,
          add: true,
        },
      },
      {
        name: "Shifts",
        permission: {
          view: true,
          edit: true,
          delete: true,
          add: true,
        },
      },
    ],
    additionalPermissions: {
      available: [
        { label: "Manage attendance" },
        { label: "Manage leaves" },
        { label: "Manage shifts" },
      ],
      assigned: [{ label: "Manage attendance" }, { label: "Manage leaves" }],
    },
  },
  {
    name: "Notes Manager",
    items: [
      {
        name: "Notes",
        permission: {
          view: true,
          edit: true,
          delete: false,
          add: true,
        },
      },
      {
        name: "Reminders",
        permission: {
          view: true,
          edit: true,
          delete: true,
          add: true,
        },
      },
    ],
  },
  {
    name: "User Manager",
    items: [
      {
        name: "Users",
        permission: {
          view: true,
          edit: true,
          delete: false,
          add: true,
        },
      },
      {
        name: "Roles",
        permission: {
          view: true,
          edit: false,
          delete: true,
          add: true,
        },
      },
    ],
  },
];

const Permissions = () => {
  return (
    <section>
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center gap-4">
          <Input
            className="w-[300px]"
            placeholder="Search modules..."
            type="text"
            label="Search"
            endContent={<IconSearch />}
          />
          <Select
            className="w-[200px]"
            label="Role"
            value="admin"
            placeholder="Select a role"
            onChange={(e) => console.log(e.target.value)}
          >
            <SelectItem value="admin" key={"admin"}>
              Admin
            </SelectItem>
            <SelectItem value="manager" key={"manager"}>
              Manager
            </SelectItem>
            <SelectItem value="employee" key={"employee"}>
              Employee
            </SelectItem>
          </Select>
        </div>
        <Button variant="shadow" disabled>
          <IconGrid1x2Fill className="h-5 w-5 mr-2" />
          Change layout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.name}
            moduleName={module.name}
            items={module.items}
            additionalPermissions={module.additionalPermissions}
          />
        ))}
      </div>
    </section>
  );
};

export default Permissions;
