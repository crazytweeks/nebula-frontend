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
  selectedSubject: string | undefined;
  setSelectedSubject: (value: string) => void;
}

const SubjectsComponent: FC<Props> = ({
  subjects,
  selectedSubject,
  setSelectedSubject,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      className={cn("flex items-center justify-between w-full", "p-2", "gap-2")}
    >
      <Select
        label="Select Subject"
        size="sm"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        fullWidth={true}
      >
        {subjects.map((subject) => (
          <SelectItem
            key={subject.id}
            value={subject.id}
            textValue={subject.name}
            className={cn(
              "flex items-center justify-between",
              "p-2",
              "gap-2 border-2 rounded-md",
              "w-full"
            )}
            style={{
              borderColor: subject.color ?? "transparent",
            }}
          >
            {subject.name} {subject.code}
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
