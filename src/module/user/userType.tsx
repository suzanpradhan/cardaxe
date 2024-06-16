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

export interface UserType {
  email: string;
  fullname: string;
  id: number;
  username: string;
  avatar: string;
}
