import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRole, Status, roleSchema, statusOptions } from "./roleSchemaTypes";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import FInput from "@/lib/form/FInput";
import FTextarea from "@/lib/form/FTextArea";
import { RadioGroup, Radio } from "@nextui-org/radio";

type Props = {
  isOpen: boolean;
  onOpenChange: (reload?: boolean) => void;
};

const defaultValues = {
  status: Status.ACTIVE,
};
const AddRole: FC<Props> = ({ isOpen, onOpenChange }) => {
  const { handleSubmit, control, reset, watch, setValue } = useForm<IRole>({
    defaultValues,
    resolver: zodResolver(roleSchema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [isOpen]);

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
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-2"
              >
                <ModalHeader className="flex flex-col gap-1">
                  Create role
                </ModalHeader>
                <ModalBody>
                  <p>
                    Create and manage roles for your applications. Roles contain
                    collections of permissions and can be assigned to users.
                  </p>

                  <FInput
                    control={control}
                    name="name"
                    label="Role name"
                    rules={{ required: true }}
                    placeholder="Enter role name"
                  />

                  <FTextarea
                    control={control}
                    name="description"
                    rules={{ required: true }}
                    label="Role description"
                    placeholder="Enter role description"
                  />

                  <RadioGroup
                    label="Status"
                    color="success"
                    orientation="horizontal"
                    description="Select role status"
                    defaultValue={Status.ACTIVE}
                    onChange={(value) =>
                      setValue("status", value.target.value as Status)
                    }
                    value={watch("status")}
                  >
                    {statusOptions.map((status) => (
                      <Radio key={status} value={status}>
                        {status.toUpperCase()}
                      </Radio>
                    ))}
                  </RadioGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Add
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

export default AddRole;
