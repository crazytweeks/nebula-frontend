import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import IconOfficeBuildingCog from "@/components/icons/officeBuildingSetting";
import Company from "@/components/setup/company";

const Setup = () => {
  return (
    <Card className="h-full">
      <div>
        <Tabs defaultValue="store" className="w-full mt-2 ml-2">
          <TabsList>
            <TabsTrigger value="store">
              <span className="mr-2">Store</span>
              {<IconOfficeBuildingCog />}
            </TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="store">
            <Company />
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default Setup;
