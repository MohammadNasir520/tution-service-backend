"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const CreateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({ required_error: 'serviceId is required' }),
        rating: zod_1.z.number({ required_error: 'rating is required' }),
        reviewText: zod_1.z.string({ required_error: 'reviewText is required' }),
    }),
});
const updateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'userId is required' }).optional(),
        serviceId: zod_1.z.string({ required_error: 'serviceId is required' }).optional(),
        rating: zod_1.z.string({ required_error: 'rating is required' }).optional(),
        reviewText: zod_1.z
            .string({ required_error: 'reviewText is required' })
            .optional(),
    }),
});
exports.ReviewValidation = {
    CreateZodSchema,
    updateZodSchema,
};
