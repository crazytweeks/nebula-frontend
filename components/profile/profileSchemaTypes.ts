import { z } from "zod";

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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const profileSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  mobile: z.string().min(8).max(12),
  about: z.string().min(2).max(400).optional(),
  admissionId: z.string().min(2).max(50),

  userType: z
    .enum([userTypes.ADMIN, userTypes.USER, userTypes.SUPER_ADMIN])
    .default(userTypes.USER),
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

  profilePicture: z
    .any()
    .optional()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
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

export { profileSchema, userTypes, gender };

export type { IProfile, InputOptions, SelectOptions, DatePickerOptions };
