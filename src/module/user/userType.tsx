import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().email().optional(),
  fullname: z
    .string()
    .min(4, {
      message: 'Please enter at least 5 characters',
    })
    .max(30, {
      message: 'Please ensure your input is within the 30-character limit',
    }),
  username: z
    .string()
    .min(4, {
      message: 'Please enter at least 5 characters',
    })
    .max(30, {
      message: 'Please ensure your input is within the 30-character limit',
    }),
  // avatar: z.boolean().optional().default(true),
});
export type UserDetailType = z.infer<typeof userSchema>;

export const UserProfileSchema = z.object({
  email: z.string().pipe(nonempty),
  fullname: z.string().pipe(nonempty),
  id: z.number(),
  address: z.string().optional().nullable(),
  gender: z.string().pipe(nonempty),
  username: z.string().pipe(nonempty),
  avatar: z.string().optional().nullable(),
  updateAvatar: z.custom<File>().optional(),
  bio: z.string().optional().nullable(),
});

export type UserType = z.infer<typeof UserProfileSchema>;
