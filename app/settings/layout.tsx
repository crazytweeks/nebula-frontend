"use client";

import { IconAndroidLock, IconLockClosed } from "@/components/icons/lock";
import { IconUsers } from "@/components/icons/users";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { FC, PropsWithChildren, Suspense } from "react";
import { usePathname } from "next/navigation";
const buttonIconClassName = cn(
  "duration-300 ease-in-out hover:scale-125 hover:shadow-2xl hover:transition"
);

const subMenus = [
  {
    label: "Roles",
    path: "/settings/roles",
    icon: <IconAndroidLock className={buttonIconClassName} />,
  },
  {
    label: "Users",
    path: "/settings/users",
    icon: <IconUsers className={buttonIconClassName} />,
  },
  {
    label: "Permissions",
    path: "/settings/permissions",
    icon: <IconLockClosed className={buttonIconClassName} />,
  },
  {
    label: "Layout",
    path: "/settings",
  },
];

const SubMenuSettings: FC = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-row gap-2 items-center justify-left",
        "rounded-none m-2 border-none p-2"
      )}
    >
      {subMenus.map(({ label, path, icon }, i) => (
        <Button
          key={label ?? i}
          as={Link}
          href={path}
          showAnchorIcon={icon !== undefined}
          anchorIcon={icon}
          color={pathname === path ? "primary" : "default"}
          className={cn(
            "hover:scale-90",
            "transition duration-300 ease-in-out"
          )}
          size={"sm"}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card
      className={cn(
        "rounded-none mt-2 border-none p-0",
        "shadow-none",
        "md:rounded-xl md:shadow-sm md:mt-0 mf:border"
      )}
    >
      {/* TODO: Need to be refactored and reworked
       Server component path should be changed */}
      <div
        className={cn(
          "md:grid",
          "md:items-center md:justify-center",
          "md:pl-5 pr-2",
          "border-b mb-2",
          "lg:flex lg:flex-row lg:justify-between"
        )}
      >
        {/* <SubSettings /> */}
        <SubMenuSettings />
      </div>

      <CardContent>
        <Suspense
          fallback={
            <div
              className={cn(
                "absolute flex items-center justify-center",
                "rounded-none m-0 border-none p-0",
                "shadow-none",
                "md:rounded-xl md:shadow-sm md:mt-2 mf:border",
                "h-full w-full",
                "animate-pulse",
                "top-50 left-50 right-50 bottom-50"
              )}
            >
              <Spinner />
            </div>
          }
        >
          {children}
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default Layout;
