import RoleSubPages from "@/components/settings/roleSubpages";
import { cn } from "@/lib/utils";
import React, { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4")}>
      <RoleSubPages />

      {children}
    </div>
  );
};

export default Layout;
