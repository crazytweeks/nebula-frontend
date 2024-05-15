"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { FC, useState } from "react";
import type { Subject } from "@lib/pg/timeTable";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { cn } from "@/lib/utils";

import { Badge } from "@nextui-org/badge";
import AddSubjectForm from "./AddSubjectForm";
import { Card } from "@nextui-org/card";

interface Props {
  subjects: Subject[];
}

const SubjectsComponent: FC<Props> = ({ subjects }) => {
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      className={cn("flex items-center justify-between w-full", "p-2", "gap-2")}
    >
      <Select
        label="Select Subject"
        size="sm"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        fullWidth={true}
      >
        {subjects.map((s) => (
          <SelectItem
            key={s.id}
            textValue={s.name}
            value={String(s.id)}
            className={cn(s.color && `border border[${s.color}]`)}
          >
            {s.name} {s.code}
          </SelectItem>
        ))}
      </Select>

      <Button size="sm" onClick={onOpen}>
        Add Subject
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Add Subject</ModalHeader>
          <ModalBody>
            <AddSubjectForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SubjectsComponent;
