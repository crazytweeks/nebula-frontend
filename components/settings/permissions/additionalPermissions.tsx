"use client";

import { useMemo, useState, type FC } from "react";
import { CardProps } from "./moduleCard";
import { Chip } from "@nextui-org/chip";
import { Card, CardHeader } from "@nextui-org/card";
import { IconPlus } from "@icons/plus";
import { cn } from "@/lib/utils";

type Props = {
  additionalPermissions: CardProps["additionalPermissions"];
};

const AdditionalPermissions: FC<Props> = ({ additionalPermissions }) => {
  const [permissions, setPermissions] = useState<
    NonNullable<NonNullable<CardProps["additionalPermissions"]>["assigned"]>
  >(additionalPermissions?.assigned ?? []);

  const filteredPermissions = useMemo(() => {
    return (
      additionalPermissions?.available.filter(
        (permission) =>
          !permissions?.some(
            (assignedPermission) =>
              assignedPermission.label === permission.label
          )
      ) ?? []
    );
  }, [permissions, additionalPermissions]);

  return (
    <Card
      className={cn(
        "w-full p-2 shadow-inner",

        permissions?.length ? "mb-2" : "hidden"
      )}
    >
      {permissions?.length ? (
        <>
          <CardHeader>Assigned Permissions</CardHeader>
          <div className="flex flex-wrap gap-2">
            {permissions?.map(({ label }, i) => (
              <Chip
                variant="shadow"
                color="primary"
                key={`${label}-${i}`}
                onClose={() => {
                  setPermissions((prev) =>
                    prev?.filter((permission) => permission.label !== label)
                  );
                }}
              >
                {label}
              </Chip>
            ))}
          </div>
        </>
      ) : null}

      {filteredPermissions.length ? (
        <div>
          <CardHeader>Available Permissions</CardHeader>
          <div className="flex flex-wrap gap-2">
            {filteredPermissions?.map(({ label }, i) => (
              <Chip
                variant="shadow"
                color="success"
                key={`${label}-${i}`}
                onClick={() => {
                  setPermissions((prev) => [...(prev ?? []), { label }]);
                }}
                startContent={<IconPlus />}
                className={cn(
                  "cursor-pointer",
                  "flex items-center justify-center",
                  "hover:bg-primary-50",
                  "hover:text-primary",
                  "transition-all duration-200"
                )}
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default AdditionalPermissions;
