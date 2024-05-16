import { z } from "zod";

export const registerationSchema = z
    .object({
        fullname: z.string().min(2, { message: 'Must be at least 2 characters' }),
        email: z.string().email().trim(),
        password: z
            .string()
            .min(8, { message: 'Must be more than 8 characters' })
            .max(24, { message: 'Must be less than 24 characters' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Must be more than 8 characters' })
            .max(24, { message: 'Must be less than 24 characters' })
            .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type RegistrationSchemaType = z.infer<typeof registerationSchema>;

export const ForgotPasswordSchema = z
    .object({
        current_password: z
            .string()
            .min(8, { message: 'Must be more than 8 characters' })
            .max(24, { message: 'Must be less than 24 characters' }),
        new_password: z
            .string()
            .min(8, { message: 'Must be more than 8 characters' })
            .max(24, { message: 'Must be less than 24 characters' }),
        new_repassword: z
            .string()
            .min(8, { message: 'Must be more than 8 characters' })
            .max(24, { message: 'Must be less than 24 characters' })
            .optional(),
    })
    .refine((data) => data.new_password === data.new_repassword, {
        message: 'Passwords do not match',
        path: ['newRepassword'],
    });

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export const ConfirmEmailSchema = z.object({
    email: z.string().email().trim(),
});

export type ConfirmEmailSchemaType = z.infer<typeof ConfirmEmailSchema>;

