import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";
import Roles from "@/components/settings/roles";
import Permissions from "@/components/settings/permissions";
import UsersManage from "@/components/settings/usersManage";
import { IconUsers } from "@/components/icons/users";
import { IconAndroidLock, IconLockClosed } from "@/components/icons/lock";
import { Spinner } from "@nextui-org/spinner";

const Setup = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="usersManage">
          <span className="mr-2">Manage Users</span>
          {<IconUsers />}
        </TabsTrigger>
        <TabsTrigger value="role">
          <span className="mr-2">Role</span>
          {<IconLockClosed />}
        </TabsTrigger>
        <TabsTrigger value="permission">
          <span className="mr-2">Permission</span>
          {<IconAndroidLock />}
        </TabsTrigger>
      </TabsList>

      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <TabsContent value="role">
          <Roles />
        </TabsContent>
        <TabsContent value="permission">
          <Permissions />
        </TabsContent>
        <TabsContent value="usersManage">
          <UsersManage />
        </TabsContent>
      </Suspense>
    </Tabs>
  );
};

export default Setup;
