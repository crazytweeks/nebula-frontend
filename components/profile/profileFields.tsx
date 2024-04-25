"use client";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { cn } from "@/lib/utils";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { useMemo, useRef } from "react";
import {
  gender,
  profileSchema,
  userTypes,
  type IProfile,
} from "./profileSchemaTypes";
import {
  FInput,
  FSelect,
  FTextarea,
  FDatePicker,
} from "./profileFormController";
import ConfirmModel from "../confirm/confirmModel";
import { useDisclosure } from "@nextui-org/modal";
import { toast } from "sonner";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

const ProfileFields = () => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const { onOpenChange, isOpen, onOpen } = useDisclosure();

  const { handleSubmit, control, reset, watch, setValue } = useForm<IProfile>({
    defaultValues: {},
    resolver: zodResolver(profileSchema),
  });

  const [firstNameWatch, lastNameWatch, profileImageWatch] = watch([
    "firstName",
    "lastName",
    "profilePicture",
  ]);

  const profilePictureUrl = useMemo(() => {
    return profileImageWatch
      ? URL.createObjectURL(profileImageWatch)
      : undefined;
  }, [profileImageWatch]);

  const handleReset = () => {
    onOpen();
  };

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    console.log("data: ", data);

    toast("Profile saved successfully!", {
      description: "Check console for more details",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
      icon: "👍",
      position: "top-right",
      className: "bg-success-500",
    });
  };

  const onError: SubmitErrorHandler<IProfile> = (errors) => {
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
      <div>
        <ConfirmModel
          confirm={() => reset()}
          cancel={() => onOpenChange()}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          key={"confirm"}
          title={"Sure to clean all fields ?"}
        />
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={(arg) => {
              const file = arg.target.files?.[0];

              if (file) setValue("profilePicture", file);
            }}
            className="hidden"
          />

          <div
            className={cn(
              "grid",
              "border",
              "rounded-lg",
              "p-6",
              "sm:grid-cols-2",
              "items-center",
              "cursor-pointer",
              "my-6",
              "align-middle",
              "justify-center",
              "border-dashed"
            )}
            onClick={() => profileInputRef.current?.click()}
          >
            <Image
              isBlurred
              width={140}
              src={
                profileImageWatch
                  ? profilePictureUrl
                  : "https://i.pravatar.cc/1150"
              }
              fallbackSrc="https://via.placeholder.com/300x200"
              className="m-5"
            />

            <div
              className={cn(
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "text-center"
              )}
            >
              {firstNameWatch && lastNameWatch && (
                <p
                  className={cn(
                    "text-2xl font-bold",
                    "transition duration-300 ease-in-out",
                    "dark:text-white",
                    "text-gray-700",

                    "hover:text-primary dark:hover:text-primary hover:scale-105 "
                  )}
                >
                  Hello {firstNameWatch} {lastNameWatch}
                </p>
              )}
              <p className="text-lg">Click to change profile picture</p>
            </div>
          </div>

          <div
            className={cn(
              "grid sm:grid-cols-1 gap-6",
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
            <FSelect
              control={control}
              name="userType"
              label={"User Type"}
              disabled={true}
              defaultValue={userTypes.USER}
              options={[
                { label: "Super Admin", value: userTypes.SUPER_ADMIN },
                { label: "Admin", value: userTypes.ADMIN },
                { label: "User", value: userTypes.USER },
              ]}
            />
            <div className="md:col-span-2">
              <FTextarea
                control={control}
                name="about"
                rules={{ required: false }}
                label={"About yourself"}
                placeholder="Write something about yourself..."
              />
            </div>
          </div>

          <h1 className="m-4 p-4">
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
              rules={{ required: true }}
              options={[
                { label: "Male", value: gender.MALE },
                { label: "Female", value: gender.FEMALE },
                { label: "Other", value: gender.OTHER },
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

            <FInput
              control={control}
              name="fatherMobile"
              rules={{ required: true }}
              label={"Father Mobile"}
              type={"tel"}
            />

            <FInput
              control={control}
              name="fatherEmail"
              rules={{ required: false }}
              label={"Father Email"}
              type={"email"}
            />

            <FInput
              control={control}
              name="motherName"
              rules={{ required: true }}
              label={"Mother Name"}
            />

            <FInput
              control={control}
              name="motherOccupation"
              rules={{ required: false }}
              label={"Mother Occupation"}
            />

            <FInput
              control={control}
              name="motherMobile"
              rules={{ required: false }}
              label={"Mother Mobile"}
              type={"tel"}
            />

            <FInput
              control={control}
              name="motherEmail"
              rules={{ required: false }}
              label={"Mother Email"}
              type={"email"}
            />

            <FInput
              control={control}
              name="motherTongue"
              rules={{ required: true }}
              label={"Mother Tongue Language"}
            />
          </div>

          <h1 className="m-4 p-4">
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
            <FInput
              control={control}
              name="religion"
              rules={{ required: false }}
              label={"Religion"}
            />
            <FInput
              control={control}
              name="cast"
              rules={{ required: false }}
              label={"Caste"}
            />
            <FInput
              control={control}
              name="category"
              rules={{ required: false }}
              label={"Category"}
            />
          </div>

          <h1 className="m-4 p-4">
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
            <div className={"md:col-span-2"}>
              <FTextarea
                control={control}
                name="address"
                rules={{ required: true }}
                label={"Address"}
              />
            </div>

            <FInput
              control={control}
              name="city"
              rules={{ required: true }}
              label={"City Name"}
            />

            <FInput
              control={control}
              name="state"
              rules={{ required: true }}
              label={"State"}
            />

            <FInput
              control={control}
              name="country"
              rules={{ required: true }}
              label={"Country"}
            />

            <FInput
              control={control}
              name="pincode"
              rules={{ required: true }}
              label={"Pincode"}
              type={"number"}
            />
          </div>

          <div className={cn("py-4 mt-10 flex justify-end space-x-2")}>
            <Button
              variant="bordered"
              color={"warning"}
              className="ml-2 flex-none"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button type="submit" color={"primary"} className={"flex-1"}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileFields;
