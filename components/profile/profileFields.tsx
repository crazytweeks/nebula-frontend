"use client";

import { z } from "zod";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
  Form,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { cn } from "@/lib/utils";
import { Divider } from "@nextui-org/divider";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { DateInput } from "@nextui-org/date-input";
import { CalendarDate, parseDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";

const userTypesArray = ["admin", "user", "super_admin"];
const gendersArray = ["male", "female", "other"];

enum userTypes {
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "super_admin",
}

enum gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

const profileSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  mobile: z.string().min(8).max(12),
  admissionId: z.string().min(2).max(50).optional(),

  userType: z.enum([userTypes.ADMIN, userTypes.USER, userTypes.SUPER_ADMIN]),
  gender: z.enum([gender.MALE, gender.FEMALE, gender.OTHER]),
  dob: z.string().datetime(),

  fatherName: z.string().min(2).max(50),
  fatherOccupation: z.string().min(2).max(50).optional(),
  fatherMobile: z.string().min(8).max(12),
  fatherEmail: z.string().email().optional(),

  motherName: z.string().min(2).max(50).optional(),
  motherOccupation: z.string().min(2).max(50).optional(),
  motherMobile: z.string().min(8).max(12).optional(),
  motherEmail: z.string().email().optional(),

  motherTongue: z.string().min(2).max(50),
  annualIncome: z.number().min(0).optional(),
  religion: z.string().min(2).max(50).optional(),
  cast: z.string().min(2).max(50).optional(),
  category: z.string().min(2).max(50).optional(),

  address: z.string().min(2).max(400),
  pincode: z.string().min(6).max(6),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  country: z.string().min(2).max(50),

  about: z.string().min(2).max(400),
  profilePicture: z.string().min(2).max(400).optional(),
});

type IProfile = z.infer<typeof profileSchema>;
type InputOptions = {
  label?: string;
  placeholder?: string;
  type?:
    | "button"
    | "checkbox"
    | "string"
    | "number"
    | "date"
    | "file"
    | "tel"
    | "email";
};

type Option = { label: string; value: string };

type SelectOptions = {
  label?: string;
  options: Option[];
};

type DatePickerOptions = {
  label?: string;
};

const FInput = (props: UseControllerProps<IProfile> & InputOptions) => {
  const { field, fieldState } = useController(props);

  return (
    <Input
      {...field}
      label={
        `${props.rules?.required ? ` ${props.label} *` : props.label}` ??
        props.name
      }
      labelPlacement="outside"
      value={String(field.value ?? "")}
      placeholder={props.placeholder}
      type={props.type ?? "string"}
      isInvalid={
        fieldState.isTouched && fieldState.isDirty && fieldState.invalid
      }
      errorMessage={fieldState.error?.message}
      required={Boolean(props.rules?.required) ?? false}
    />
  );
};

const FDatePicker = (
  props: UseControllerProps<IProfile> & DatePickerOptions
) => {
  const { field, fieldState } = useController(props);

  return (
    <DatePicker
      label={
        `${props.rules?.required ? ` ${props.label} *` : props.label}` ??
        props.name
      }
      labelPlacement="outside"
      isInvalid={
        fieldState.isTouched && fieldState.isDirty && fieldState.invalid
      }
      errorMessage={fieldState.error?.message}
      required={Boolean(props.rules?.required) ?? false}
      {...field}
    />
  );
};

const FSelect = (props: UseControllerProps<IProfile> & SelectOptions) => {
  const { field, fieldState } = useController(props);
  return (
    <Select
      {...field}
      label={
        `${props.rules?.required ? ` ${props.label} *` : props.label}` ??
        props.name
      }
      disabled={props.disabled ?? false}
      labelPlacement="outside"
      isInvalid={
        fieldState.isTouched && fieldState.isDirty && fieldState.invalid
      }
      errorMessage={fieldState.error?.message}
      required={Boolean(props.rules?.required) ?? false}
    >
      {props.options.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
};

const ProfileFields = () => {
  const { handleSubmit, control, reset } = useForm<IProfile>({
    defaultValues: {},
    resolver: zodResolver(profileSchema),
  });
  const onSubmit: SubmitHandler<IProfile> = (data) => console.log(data);
  const onError: SubmitErrorHandler<IProfile> = (errors) =>
    console.log("err", errors);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div
            className={cn(
              "grid grid-cols-1 gap-6",
              "sm:grid-cols-2",
              "lg:grid-cols-3",
              "xl:grid-cols-4"
            )}
          >
            <FInput
              control={control}
              name="firstName"
              rules={{ required: true }}
              label={"First Name"}
            />
            <FInput
              control={control}
              name="lastName"
              rules={{ required: true }}
              label={"Last Name"}
            />
            <FInput
              control={control}
              name="admissionId"
              rules={{ required: true }}
              label={"Admission ID"}
            />
            <FInput
              control={control}
              name="mobile"
              rules={{ required: true }}
              label={"Mobile"}
              type={"tel"}
            />
            <FInput
              control={control}
              name="email"
              rules={{ required: true }}
              label={"Email"}
              type={"email"}
            />
          </div>

          <h1 className="m-4 p-4">
            <Divider className="hidden md:mb-2 md:block" />
            <strong>Personal Info</strong>
            <Divider className="mt-0 md:mt-2" />
          </h1>

          <div
            className={cn(
              "grid grid-cols-1 gap-6",
              "sm:grid-cols-2",
              "lg:grid-cols-3",
              "xl:grid-cols-4"
            )}
          >
            <FSelect
              control={control}
              name="gender"
              label={"Gender"}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <FDatePicker
              control={control}
              name="dob"
              label={"Date of birth"}
              rules={{ required: true }}
            />

            <FInput
              control={control}
              name="fatherName"
              rules={{ required: true }}
              label={"Father Name"}
            />

            <FInput
              control={control}
              name="fatherOccupation"
              rules={{ required: false }}
              label={"Father Occupation"}
            />
          </div>

          <div className={cn("py-4")}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileFields;
