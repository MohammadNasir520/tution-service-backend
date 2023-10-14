import { z } from 'zod';

const createServiceZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title  is required' }),
    adminId: z.string({ required_error: 'adminId is required' }),
    price: z.number({ required_error: 'price is required' }),
    description: z.string({ required_error: 'description is required' }),
    image: z.string({ required_error: 'image is required' }),
    category: z.string({ required_error: 'category is required' }),
    topic: z.string({ required_error: 'topic is required' }),
    status: z.string({ required_error: 'status is required' }).optional(),

  }),
});

export const ServiceValidation = {
  createServiceZodSchema,
};
