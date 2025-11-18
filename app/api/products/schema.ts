import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  price: z.number().min(0, { message: 'Price must be greater than 0' }),
});

export type ProductSchema = z.infer<typeof productSchema>;
