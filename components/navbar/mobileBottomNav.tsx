import React from "react";
import IconHome from "@icons/home";
import IconFaceManProfile from "@icons/faceManProfile";
import { MobileBottoms } from "@/components/navbar/mobileBottomNavButton";
import { Card } from "@ui/card";
import { cn } from "@/lib/utils";

export type MobileFooterMenuList = {
  label: string;
  icon: React.JSX.Element;
  path: string;
};

const menuList = [
  {
    label: "Home",
    icon: <IconHome />,
    path: "/",
  },
  {
    label: "Profile",
    icon: <IconFaceManProfile />,
    path: "/profile",
  },
] satisfies MobileFooterMenuList[];

const MobileBottomNav = () => {
  return (
    <Card
      className={cn(
        "p-1 px-2 mb-2",
        "flex flex-row justify-center items-center gap-2",
        "rounded-full shadow-sm shadow-orange-300/80",
      )}
    >
      <MobileBottoms menuList={menuList} />
    </Card>
  );
};

export default MobileBottomNav;
