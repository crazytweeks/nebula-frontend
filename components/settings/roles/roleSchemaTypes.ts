import { z } from "zod";

enum Status {
  ACTIVE = "active",
  PAUSED = "paused",
  VACATION = "vacation",
}

const statusOptions = [Status.ACTIVE, Status.PAUSED, Status.VACATION];

const roleSchema = z.object({
  name: z.string().min(2).max(50),
  status: z.enum([Status.ACTIVE, Status.PAUSED, Status.VACATION]),
  description: z.string().min(2).max(200).optional(),
});

type IRole = z.infer<typeof roleSchema>;

export { roleSchema, Status, statusOptions };

export type { IRole };
