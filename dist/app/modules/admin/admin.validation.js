"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const CreateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        email: zod_1.z.string({ required_error: 'phone number is required' }),
        role: zod_1.z.enum(['admin'], {
            required_error: 'role is required and must be admin',
        }),
        password: zod_1.z.string({ required_error: 'password is required' }),
        contactNo: zod_1.z.string({ required_error: 'contactNo is required' }),
        profileImg: zod_1.z.string({ required_error: 'profileImg is required' }),
    }),
});
const UpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        password: zod_1.z.string().optional(),
    }),
});
exports.AdminValidation = {
    CreateAdminZodSchema,
    UpdateSchema
};
