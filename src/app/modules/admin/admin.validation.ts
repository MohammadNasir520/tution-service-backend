import { z } from 'zod';

const CreateAdminZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'phone number is required' }),
    role: z.enum(['admin'], {
      required_error: 'role is required and must be admin',
    }),
    password: z.string({ required_error: 'password is required' }),
    contactNo: z.string({ required_error: 'contactNo is required' }),

    profileImg: z.string({ required_error: 'profileImg is required' }),
  }),
});
const UpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    profileImg: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
    password: z.string().optional(),
  }),
});

export const AdminValidation = {
  CreateAdminZodSchema,
  UpdateSchema
};
