"use client";
import { z } from "zod";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

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

const ProfileFields = () => {
  const { handleSubmit, control, reset, register } = useForm<IProfile>({
    defaultValues: {},
    resolver: zodResolver(profileSchema),
  });
  const onSubmit: SubmitHandler<IProfile> = (data) => console.log(data);
  const onError: SubmitErrorHandler<IProfile> = (errors) =>
    console.log("err", errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input {...register("firstName")} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProfileFields;
