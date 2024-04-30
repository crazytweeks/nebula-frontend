import { Model, model, Schema, models } from "mongoose";
import { z } from "zod";

const roleZodSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000).optional(),
});

type IRole = z.infer<typeof roleZodSchema>;

const roleSchema = new Schema<IRole, Model<IRole>>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

roleSchema.index({ _id: 1 }, { unique: true });

const Role: Model<IRole> = models.r || model<IRole>("r", roleSchema);

export default Role;
export { roleZodSchema };
export type { IRole };
