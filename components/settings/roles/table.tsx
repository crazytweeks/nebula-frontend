"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconSearch } from "@icons/search";
import { Pagination } from "@nextui-org/pagination";
import { PlusIcon } from "@radix-ui/react-icons";
import { capitalize, cn } from "@/lib/utils";
import AddRole from "./addRole";
import { useDisclosure } from "@nextui-org/modal";
import { IRole, Status } from "./roleSchemaTypes";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const adminRole: IRole = {
  name: "Admin",
  status: Status.ACTIVE,
  description: "Full access to all features",
  assignedTo: [],
  isLocked: true,
};

const user: IRole = {
  name: "User",
  status: Status.ACTIVE,
  description: "Limited access to some features",
  assignedTo: [],
  isLocked: true,
};
const roles = [adminRole, user];

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "DESCRIPTION", uid: "description", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ASSIGNED TO", uid: "assignedTo" },
  { name: "🔒", uid: "isLocked" },
];

const rowsPerPage = 10;

const RolesTable = () => {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...roles];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((role) =>
        role.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [roles, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end) as IRole[];
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((role: IRole, columnKey: React.Key) => {
    const cellValue = role[columnKey as keyof IRole];
    switch (columnKey) {
      case "status":
        return (
          <Chip
            color={statusColorMap[cellValue as keyof typeof statusColorMap]}
            size="sm"
            variant="flat"
          >
            {capitalize(cellValue)}
          </Chip>
        );
      case "description":
        return (
          <p className="text-bold text-small capitalize">{String(cellValue)}</p>
        );
      case "assignedTo":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <p className="text-bold text-small capitalize">
              {typeof cellValue === "string"
                ? cellValue
                : typeof cellValue === "object"
                ? cellValue.length
                : 0}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              Users
            </p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<IconSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon />} onClick={onOpen}>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, roles.length, hasSearchFilter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  const handleOpenChange = (reload = false) => {
    onOpenChange();
    if (reload) setTimeout(() => alert("implement reload here"), 1000);
  };

  return (
    <>
      <AddRole isOpen={isOpen} onOpenChange={handleOpenChange} />
      <Table
        aria-label="Roles Table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={
          {
            // wrapper: "max-h-[382px]",
          }
        }
        topContent={topContent}
        topContentPlacement="outside"
        selectionMode="single"
        onSelectionChange={(selected: any) => {
          const selectedKey = selected["currentKey"];

          const selectedRole = roles.find((role) => role.name === selectedKey);
          alert(
            `Selected IRole: ${selectedRole?.name} with status: ${selectedRole?.status}`
          );
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={items}>
          {(item) => (
            <TableRow
              key={item.name}
              // className={cn(
              //   "cursor-pointer rounded-lg",
              //   "transition duration-200 ease-in-out",
              //   "hover:shadow",
              // )}
              onClick={(s) => {}}
            >
              {(columnKey) => (
                <TableCell>
                  <>{renderCell(item, columnKey)}</>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default RolesTable;
