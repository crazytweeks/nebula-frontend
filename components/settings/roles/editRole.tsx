"use client";

import { FC, useEffect } from "react";
import { IRole, Status, roleSchema, statusOptions } from "./roleSchemaTypes";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import FInput from "@/lib/form/FInput";
import FTextarea from "@/lib/form/FTextArea";

type Props = {
  selectedRole: IRole | null;
  onOpenChange: (reload?: boolean) => void;
};

const EditRoleModel: FC<Props> = ({ selectedRole, onOpenChange }) => {
  const { handleSubmit, control, reset, watch, setValue } = useForm<IRole>({
    resolver: zodResolver(roleSchema),
  });

  useEffect(() => {
    if (selectedRole) reset(selectedRole);
  }, [selectedRole]);

  const onSubmit: SubmitHandler<IRole> = (data) => {
    console.log("data: ", data);

    toast("Role saved successfully!", {
      description: "Check console for more details",
      icon: "👍",
      position: "top-right",
      className: "bg-success-500 dark:bg-success-700",
    });

    onOpenChange(true);
  };

  const onError: SubmitErrorHandler<IRole> = (errors) => {
    console.log("errors: ", errors);
    const ErrorCard = () => {
      return (
        <div>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              {
                // errors loop for each field
                Object.entries(errors).map(([field, { message }]) => (
                  <p key={field}>
                    <strong>{field}</strong>:{" "}
                    {message?.toString() ?? "Field is invalid"}
                  </p>
                ))
              }
            </CardDescription>
          </CardHeader>
        </div>
      );
    };
    toast(<ErrorCard />, {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
      icon: "🚨",
      position: "top-right",
      className: "bg-warning-500",
    });
  };

  return (
    <div>
      <Modal isOpen={Boolean(selectedRole)} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-2"
              >
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">
                    {selectedRole?.name || "Role"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedRole?.description || "Role description"}
                  </p>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <FInput
                        control={control}
                        name="name"
                        label="Name"
                        placeholder="Role name"
                        rules={{ required: "Role name is required" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <FTextarea
                        control={control}
                        name="description"
                        label="Description"
                        placeholder="Role description"
                        textAreaProps={{
                          minRows: 2,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1"></div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditRoleModel;
