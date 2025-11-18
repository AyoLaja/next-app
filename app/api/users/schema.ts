import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.email({ message: 'Invalid email address' }),
});

export type UserSchema = z.infer<typeof userSchema>;
