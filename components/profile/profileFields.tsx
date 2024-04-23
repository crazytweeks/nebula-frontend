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
  dob: z.date(),

  fatherName: z.string().min(2).max(50),
  fatherOccupation: z.string().min(2).max(50),
  fatherMobile: z.string().min(8).max(12),
  fatherEmail: z.string().email(),

  motherName: z.string().min(2).max(50),
  motherOccupation: z.string().min(2).max(50),
  motherMobile: z.string().min(8).max(12),
  motherEmail: z.string().email(),

  annualIncome: z.number().min(0),
  religion: z.string().min(2).max(50),
  cast: z.string().min(2).max(50),
  category: z.string().min(2).max(50),

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

type SelectOptions = {
  label?: string;
  children: React.ReactNode;
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

const FSelect = (props: UseControllerProps<IProfile> & SelectOptions) => {
  const { field, fieldState } = useController(props);
  return (
    // <Select
    //   {...field}
    //   label={
    //     `${props.rules?.required ? ` ${props.label} *` : props.label}` ??
    //     props.name
    //   }
    //   labelPlacement="outside"
    //   // value={(field.value ?? "")}
    //   isInvalid={
    //     fieldState.isTouched && fieldState.isDirty && fieldState.invalid
    //   }
    //   errorMessage={fieldState.error?.message}
    //   required={Boolean(props.rules?.required) ?? false}
    // >
    //   {/* {props.children} */}
    //   <div>
    //     <div></div>
    //   </div>
    // </Select>
    <></>
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
          ></div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileFields;
