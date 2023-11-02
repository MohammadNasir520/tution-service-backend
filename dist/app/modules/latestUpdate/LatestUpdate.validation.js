"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestUpdateValidation = void 0;
const zod_1 = require("zod");
const CreateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({ required_error: 'question is required' }),
        answer: zod_1.z.string({ required_error: 'answer is required' }),
    }),
});
const updateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({ required_error: 'question is required' }).optional(),
        answer: zod_1.z.string({ required_error: 'answer is required' }).optional(),
    }),
});
exports.LatestUpdateValidation = {
    CreateZodSchema,
    updateZodSchema,
};
