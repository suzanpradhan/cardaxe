import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().trim(),
    password: z
        .string()
        .min(8, { message: 'Must be more than 8 characters' })
        .max(24, { message: 'Must be less than 24 characters' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;