import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import IconOfficeBuildingCog from "@/components/icons/officeBuildingSetting";
import Company from "@/components/settings/company";
import Roles from "@/components/settings/roles";
import Permissions from "@/components/settings/permissions";
import { cn } from "@/lib/utils";
import UsersManage from "@/components/settings/usersManage";
import { IconUsers } from "@/components/icons/users";
import { IconAndroidLock, IconLockClosed } from "@/components/icons/lock";

const Setup = () => {
  return (
    <Card className={cn("h-full mt-2 py-2", "border-0", "md:border")}>
      <Tabs defaultValue="store" className="w-full px-2">
        <TabsList>
          <TabsTrigger value="store">
            <span className="mr-2">Store</span>
            {<IconOfficeBuildingCog />}
          </TabsTrigger>
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
        <TabsContent value="store">
          <Company />
        </TabsContent>
        <TabsContent value="role">
          <Roles />
        </TabsContent>
        <TabsContent value="permission">
          <Permissions />
        </TabsContent>
        <TabsContent value="usersManage">
          <UsersManage />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Setup;
