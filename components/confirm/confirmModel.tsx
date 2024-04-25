import { Button, ButtonProps } from "@nextui-org/button";
import React, { FC, PropsWithChildren } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@nextui-org/modal";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  confirm?: () => void;
  cancel?: () => void;
  confirmText?: string;
  cancelText?: string;

  confirmButtonColor?: ButtonProps["color"];
  cancelButtonColor?: ButtonProps["color"];
  backdrop?: ModalProps["backdrop"];

  isOpen: boolean;
  onOpenChange: () => void;
};

const ConfirmModel: FC<PropsWithChildren<Props>> = ({
  children,
  confirm,
  cancel,
  isOpen,
  onOpenChange,
  title,

  confirmButtonColor = "warning",
  cancelButtonColor = "primary",

  cancelText = "Cancel",
  confirmText = "Confirm",

  backdrop = "opaque",
}) => {
  const handleConfirm = () => {
    onOpenChange();
    confirm && confirm();
  };

  const handleCancel = () => {
    onOpenChange();
    cancel && cancel();
  };

  return (
    <Modal
      backdrop={backdrop}
      isOpen={isOpen}
      size={"sm"}
      onOpenChange={onOpenChange}
      isDismissable={false}
      placement="auto"
      isKeyboardDismissDisabled={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      classNames={{
        body: "py-6",
        backdrop: cn(
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        ),
        closeButton: "bg-[#292f46] text-[#a8b0d3]",
        wrapper: "bg-black/20",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
      }}
    >
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title ? title : "Needs Confirmation!"}
            </ModalHeader>
            <ModalBody>
              {children ? (
                children
              ) : (
                <span>Are you sure to proceed with this action?</span>
              )}
            </ModalBody>
            <ModalFooter>
              {confirm && (
                <Button
                  color={confirmButtonColor}
                  variant="light"
                  onPress={handleConfirm}
                  className={"hover-style"}
                >
                  {confirmText}
                </Button>
              )}

              {cancel && (
                <Button
                  className={"hover-style"}
                  color={cancelButtonColor}
                  onPress={handleCancel}
                >
                  {cancelText}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModel;
