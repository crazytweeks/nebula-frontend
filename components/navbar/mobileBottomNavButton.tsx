"use client";

import type { MobileFooterMenuList } from "@/components/navbar/mobileBottomNav";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";

const buttonsClassname = `
    pb-1
    mx-1
    
    hover:border-red-800
    hover:text-slate-100

    hover:scale-110
    hover:shadow-2xl

    transition duration-300
    ease-in-out
    
`;

type Props = {
  active?: boolean;
  label?: string;
  icon: React.JSX.Element;
  path: string;
};

const MobileBottoms = ({ menuList }: { menuList: MobileFooterMenuList[] }) => {
  const pathname = usePathname();

  return (
    <div>
      {menuList.map((item) => (
        <MobileBottomNavButton
          key={item.label}
          label={item.label}
          icon={item.icon}
          path={item.path}
          active={pathname === item.path}
        />
      ))}
    </div>
  );
};

const MobileBottomNavButton: FC<Props> = ({ active, label, icon, path }) => {
  return (
    <Tooltip content={label}>
      <Button
        isIconOnly
        href={path}
        endContent={icon}
        isDisabled={active}
        className={cn(
          buttonsClassname,
          active && "border-b-2 border-primary-600 text-primary-600"
        )}
      />
    </Tooltip>
  );
};

export { MobileBottoms };
