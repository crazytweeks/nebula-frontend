"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const RoleSubPages: FC = () => {
  const pathName = usePathname();

  return (
    <ButtonGroup color="primary" size="sm" variant="bordered">
      <Button
        color={pathName === "/settings/roles/default" ? "primary" : "default"}
        isDisabled={pathName === "/settings/roles/default"}
      >
        <div
          className={cn(
            "hover:scale-90",
            "transition duration-300 ease-in-out"
          )}
        >
          <Link href="/settings/roles/default">Default Roles</Link>
        </div>
      </Button>
      <Button
        as={Link}
        href="/settings/roles/custom"
        color={pathName === "/settings/roles/custom" ? "primary" : "default"}
        isDisabled={pathName === "/settings/roles/custom"}
      >
        Custom Roles
      </Button>
    </ButtonGroup>
  );
};

export default RoleSubPages;
