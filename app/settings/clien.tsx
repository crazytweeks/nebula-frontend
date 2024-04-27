"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import Roles from "@/components/settings/roles";
import Permissions from "@/components/settings/permissions";
import { cn } from "@/lib/utils";
import UsersManage from "@/components/settings/usersManage";
import { IconUsers } from "@/components/icons/users";
import { IconAndroidLock, IconLockClosed } from "@/components/icons/lock";
import { Tabs, Tab } from "@nextui-org/tabs";

const Settings = () => {
  return (
    <Card
      className={cn(
        "mt-2 py-2",
        "border-0",
        "md:border",
        "rounded-xl",
        "shadow-none mx-2",
        "md:shadow-sm"
      )}
    >
      <Tabs className="w-full px-2" aria-label="Settings">
        <Tab
          key="roles"
          title={
            <div className="flex items-center space-x-2">
              <span className="mr-2">Roles</span>
              {<IconLockClosed />}
            </div>
          }
        >
          <Roles />
        </Tab>

        <Tab
          key="permissions"
          title={
            <div className="flex items-center space-x-2">
              <span className="mr-2">Permission</span>
              {<IconAndroidLock />}
            </div>
          }
        >
          <Permissions />
        </Tab>

        <Tab
          key="users"
          title={
            <div className="flex items-center space-x-2">
              <span className="mr-2">Manage Users</span>
              {<IconUsers />}
            </div>
          }
        >
          <UsersManage />
        </Tab>
      </Tabs>
    </Card>
  );
};

export default Settings;
