import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  TableHeaderProps,
} from "@nextui-org/table";
import { FC, useCallback } from "react";
import PermissionCheckbox from "./permissionCheckbox";
import type { AdditionalPermission, ModuleItem } from "./permissions";
import AdditionalPermissions from "./additionalPermissions";

type Column = {
  key: string;
  label: string;
};

const defaultColumn: Column[] = [
  {
    key: "module",
    label: "Module",
  },
  {
    key: "view",
    label: "View",
  },
  {
    key: "add",
    label: "Add",
  },
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "delete",
    label: "Delete",
  },
];

export type CardProps = {
  moduleName: string;
  columns?: TableHeaderProps<Column>["columns"];
  items: ModuleItem[];
  additionalPermissions?: AdditionalPermission;
};

const ModuleCard: FC<CardProps> = ({
  moduleName,
  columns = defaultColumn,
  items,
  additionalPermissions,
}) => {
  const renderCell = useCallback((item: ModuleItem, columnKey: React.Key) => {
    const cellName = item["name"];
    const cellValue = getKeyValue(item.permission, columnKey as string);

    switch (columnKey) {
      case "module":
        return (
          <span className="font-semibold text-gray-600">
            {String(cellName)}
          </span>
        );

      default:
        return (
          <PermissionCheckbox
            id={`${cellName}-${columnKey}`}
            defaultSelected={cellValue}
          />
        );
    }
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>{moduleName}</CardHeader>
        <CardBody>
          <Table removeWrapper aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.name}>
                  {(columnKey) => (
                    <TableCell key={columnKey}>
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>

        <CardFooter>
          <AdditionalPermissions
            additionalPermissions={additionalPermissions}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ModuleCard;
