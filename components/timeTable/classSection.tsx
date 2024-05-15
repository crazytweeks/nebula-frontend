"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { FC, useState } from "react";
import type { ClassSection } from "@lib/pg/timeTable";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { cn } from "@/lib/utils";
import AddClassForm from "./AddClassForm";

interface Props {
  classes: ClassSection[];
}

const ClassSectionComponent: FC<Props> = ({ classes }) => {
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      className={cn("flex items-center justify-between w-full", "p-2", "gap-2")}
    >
      <Select
        fullWidth={true}
        label="Select Class"
        size="sm"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        {classes.map((c) => (
          <SelectItem
            key={c.id}
            value={String(c.id)}
            textValue={c.class_name + " " + c.section_name}
          >
            {c.class_name} {c.section_name}
          </SelectItem>
        ))}
      </Select>

      <Button size="sm" onClick={onOpen}>
        Add Class
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Add Class</ModalHeader>
          <ModalBody>
            <AddClassForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClassSectionComponent;
