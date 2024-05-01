"use client";

import { Tabs, Tab } from "@nextui-org/tabs";

import { usePathname } from "next/navigation";
import { IconLockClosed, IconAndroidLock } from "@icons/lock";
import { IconUsers } from "@icons/users";

export const SubSettings = () => {
  const pathname = usePathname();

  return (
    <Tabs aria-label="Settings" selectedKey={pathname} color="warning">
      <Tab
        key="/settings"
        title={
          <div className="flex items-center">
            <div className="mr-2">Users</div>
            <IconUsers />
          </div>
        }
        href="/settings"
      />

      <Tab
        key="/settings/users"
        title={
          <div className="flex items-center">
            <div className="mr-2">Manage Users</div>
            <IconUsers />
          </div>
        }
        href="/settings/users"
      />

      <Tab
        key="/settings/roles"
        title={
          <div className="flex items-center">
            <div className="mr-2">Role</div>
            {<IconLockClosed />}
          </div>
        }
        href="/settings/roles"
      />

      <Tab
        key="/settings/permissions"
        title={
          <div className="flex items-center">
            <div className="mr-2">Permission</div>
            {<IconAndroidLock />}
          </div>
        }
        href="/settings/permissions"
      />
    </Tabs>
  );
};

export default SubSettings;
