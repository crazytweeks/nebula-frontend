"use client";

import FInput from "@/lib/form/FInput";
import FTextarea from "@/lib/form/FTextArea";
import { ClassSectionSchema, ClassSection } from "@/lib/pg/timeTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";

type NewClassSection = Omit<ClassSection, "id">;

const AddClassForm: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { handleSubmit, control, reset, watch, setValue } =
    useForm<NewClassSection>({
      defaultValues: {},
      resolver: zodResolver(ClassSectionSchema),
    });

  const onSubmit: SubmitHandler<NewClassSection> = async (data) => {
    const res = await fetch("/api/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      console.log("res: ", res);
      toast.info("Class Added Successfully");

      onClose();
    } else {
      console.log("res: ", res.json());
      toast.error("Failed to Add Subject");
    }
  };

  const onError: SubmitErrorHandler<NewClassSection> = (errors) => {
    console.log("errors: ", errors);

    toast(errors.root?.type ?? "ERR", {
      description: errors?.root?.message ?? "ERR",
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
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div
        className={cn(
          "flex flex-col",
          "gap-2",
          "p-2",
          "border border-gray-300 dark:border-gray-900",
          "rounded-md"
        )}
      >
        <FInput
          control={control}
          name="class_name"
          label="Class Name"
          placeholder="Enter Class Name"
          rules={{ required: "Class Name is required" }}
        />

        <FInput
          control={control}
          name="section_name"
          label="Section Name"
          placeholder="Enter Section Name"
          rules={{ required: "Section Name is required" }}
        />

        <FTextarea
          control={control}
          name="description"
          label="Description"
          placeholder="Enter Description"
        />

        <Button type="submit" className={cn("mt-2")}>
          Add Class
        </Button>
      </div>
    </form>
  );
};

export default AddClassForm;
