"use client";

import FColorPick from "@/lib/form/FColorPick";
import FInput from "@/lib/form/FInput";
import FTextarea from "@/lib/form/FTextArea";
import { Subject, SubjectSchema } from "@/lib/pg/timeTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Button } from "@nextui-org/button";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SubjectFields = Omit<Subject, "id" | "created_at">;

const AddSubjectForm: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { handleSubmit, control, reset, watch, setValue } =
    useForm<SubjectFields>({
      defaultValues: {},
      resolver: zodResolver(SubjectSchema),
    });

  const onSubmit: SubmitHandler<SubjectFields> = async (data) => {
    const res = await fetch("/api/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      console.log("res: ", res);
      toast.info("Subject Added Successfully");

      onClose();
    } else {
      console.log("res: ", res.json());
      toast.error("Failed to Add Subject");
    }
  };

  const onError: SubmitErrorHandler<SubjectFields> = (errors) => {
    console.log("errors: ", errors);

    toast(errors?.code?.message ?? "ERR", {
      description: errors?.name?.message ?? "ERR",
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
          name="name"
          label="Name"
          placeholder="Enter Name"
          rules={{ required: "Name is required" }}
        />

        <FInput
          control={control}
          name="code"
          label="Code"
          placeholder="Enter Code"
          rules={{ required: "Code is required" }}
        />

        <FTextarea
          control={control}
          name="description"
          label="Description"
          placeholder="Enter Description"
        />

        <FColorPick control={control} name="color" label="Select Color" />

        <Button className="my-btn" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddSubjectForm;
