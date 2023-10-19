import { z } from 'zod';

const UserSignUpZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }),
    role: z
      .enum(['user', 'super_admin'], {
        required_error: 'role is required and must be user'
      })
      .optional(),
    password: z.string({ required_error: 'password is required' }),
    contactNo: z.string({ required_error: 'contactNo is required' }),
    profileImg: z.string({ required_error: 'profileImg is required' })
  })
});
const UserSignInZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),

    password: z.string({ required_error: 'password is required' })
  })
});

export const userValidation = {
  UserSignUpZodSchema,
  UserSignInZodSchema
};
