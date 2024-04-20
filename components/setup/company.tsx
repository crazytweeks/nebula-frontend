"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Label } from "@ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Switch } from "@/components/ui/switch";
import UnderDevelopmentAlert from "@/components/UnderDevelopmentAlert";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const addressFormSchema = z.object({
  address: z.string().min(2).max(200),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
  pincode: z
    .string()
    .length(6, { message: "Pincode must be 6 characters long" }),
});

const contactFormSchema = z.object({
  phone: z.string().min(9).max(13),
  email: z.string().email(),
});

const metadataFormSchema = z.array(
  z.object({
    key: z.string().min(2).max(50),
    value: z.string().min(2).max(50),
  })
);

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(200).optional(),

  address: addressFormSchema,
  contact: contactFormSchema,

  gst: z.string().min(2).max(50),
  website: z.string().url().min(2).max(200),

  metadata: metadataFormSchema,
});

const Company = () => {
  const { handleSubmit, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log("values: ", values);
  // };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) =>
    console.log(data);

  const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
    const ErrorCard = () => {
      return (
        <div>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              Sorry, something went wrong. Please try again later.
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
    <div
      className="
        flex
        w-full
        flex-col
      "
    >
      <div
        className=" 
        pr-5
          "
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex items-center justify-end space-x-2
            "
            >
              <Switch disabled id="multi-store-toggle" />
              <Label htmlFor="multi-store-toggle">{"Multi Store"}</Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <UnderDevelopmentAlert />
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="mr-4">
        <Form {...form} handleSubmit={handleSubmit}>
          <form
            className="space-y-8"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div
              className={cn(
                "flex",
                "flex-col",

                "space-y-8",
                "sm:flex-row",
                "sm:space-x-8",
                "sm:space-y-0"
              )}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-initial">
                    <FormLabel>
                      Company/Organization Name
                      <span className="ml-1 text-xs text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required={true}
                        placeholder="<company>"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public operation display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-auto">
                    <FormLabel>Description / About</FormLabel>
                    <FormControl>
                      <Textarea placeholder="About your company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Divider />
            <div
              className={cn(
                "grid",
                "grid-cols-1",
                "gap-4",
                "sm:grid-cols-2",
                "sm:gap-8"
              )}
            >
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City
                      <span className="ml-1 text-xs text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input required={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      State
                      <span className="ml-1 text-xs text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input required={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Country
                      <span className="ml-1 text-xs text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input required={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pin Code
                      <span className="ml-1 text-xs text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input required={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.address"
                render={({ field }) => (
                  <FormItem
                    className="
                      sm:col-span-1
                      md:col-span-2
                      lg:col-span-3
                    "
                  >
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Divider />

            <div
              className={cn(
                "grid",
                "grid-cols-1",
                "gap-4",
                "sm:grid-cols-2",
                "sm:gap-8"
              )}
            >
              <FormField
                control={form.control}
                name="contact.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contact No
                      <span className="ml-1 text-xs text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official Website</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Company;
