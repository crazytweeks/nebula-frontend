import { Model, model, Schema } from 'mongoose';
import { z } from 'zod';

const permissionsZodSchema = z.object({
  view: z.boolean().default(false),
  create: z.boolean().default(false),
  update: z.boolean().default(false),
  delete: z.boolean().default(false),
  download: z.boolean().default(false),
});

const globalRolesZodSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  permissions: permissionsZodSchema,
});

type IGlobalRoles = z.infer<typeof globalRolesZodSchema>;

const globalRoleSchema = new Schema<IGlobalRoles, Model<IGlobalRoles>>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    permissions: {
      type: Schema.Types.Mixed,
      required: true,
      default: {
        view: false,
        create: false,
        update: false,
        delete: false,
        download: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const GlobalRole = model<IGlobalRoles, Model<IGlobalRoles>>(
  'globalRoles',
  globalRoleSchema,
);

export default GlobalRole;
export type { IGlobalRoles };
