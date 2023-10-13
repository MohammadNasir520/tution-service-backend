import { z } from 'zod';

const UserSignUpZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'phone number is required' }),
    role: z.enum(['super_admin', 'user', 'admin'], {
      required_error: 'role is required and must be customer or buyer',
    }),
    password: z.string({ required_error: 'password is required' }),
    contactNo: z.string({ required_error: 'contactNo is required' }),

    profileImg: z.string({ required_error: 'profileImg is required' }),
  }),
});
const UserSignInZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'phone number is required' }),

    password: z.string({ required_error: 'password is required' }),
  }),
});

export const userValidation = {
  UserSignUpZodSchema,
  UserSignInZodSchema,
};
