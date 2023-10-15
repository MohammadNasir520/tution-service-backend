"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title  is required' }),
        price: zod_1.z.number({ required_error: 'price is required' }),
        description: zod_1.z.string({ required_error: 'description is required' }),
        image: zod_1.z.string({ required_error: 'image is required' }),
        category: zod_1.z.string({ required_error: 'category is required' }),
        topic: zod_1.z.string({ required_error: 'topic is required' }),
        status: zod_1.z.string({ required_error: 'status is required' }).optional(),
    }),
});
exports.ServiceValidation = {
    createServiceZodSchema,
};
