import { z } from 'zod';

const CreateZodSchema = z.object({
  body: z.object({
    question: z.string({ required_error: 'question is required' }),
    answer: z.string({ required_error: 'answer is required' })
  })
});
const updateZodSchema = z.object({
  body: z.object({
    question: z.string({ required_error: 'question is required' }).optional(),
    answer: z.string({ required_error: 'answer is required' }).optional()
  })
});

export const FAQValidation = {
  CreateZodSchema,
  updateZodSchema
};
