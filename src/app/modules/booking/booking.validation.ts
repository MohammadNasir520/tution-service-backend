import { z } from 'zod';

const CreateZodSchema = z.object({
  body: z.object({

    serviceId: z.string({ required_error: 'serviceId is required' }),
    rating: z.string({ required_error: 'rating is required' }),
    reviewText: z.string({ required_error: 'reviewText is required' }),

  }),
});
const updateZodSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'userId is required' }).optional(),
    serviceId: z.string({ required_error: 'serviceId is required' }).optional(),
    rating: z.string({ required_error: 'rating is required' }).optional(),
    reviewText: z.string({ required_error: 'reviewText is required' }).optional(),
  }),
});

export const userValidation = {
  CreateZodSchema,
  updateZodSchema,
};
