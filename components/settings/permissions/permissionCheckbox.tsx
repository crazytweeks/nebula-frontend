"use client";

import { Checkbox } from "@nextui-org/checkbox";
import { FC } from "react";

type Props = {
  id: string;
  defaultSelected: boolean;
};

const PermissionCheckbox: FC<Props> = ({ id, defaultSelected }) => {
  return (
    <Checkbox color="primary" key={id} defaultSelected={defaultSelected} />
  );
};

export default PermissionCheckbox;
