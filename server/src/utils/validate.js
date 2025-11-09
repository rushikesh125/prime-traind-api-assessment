import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid Email"),
  password : z.string().min(6,'Password must be at least of 6 characters'),
  name:z.string().optional(),
});

export const loginSchema = z.object({
    email:z.email('Invalid Email'),
    password:z.string().min(6,'Password must be at least of 6 characters')
})

export const createProductSchema = z.object({
    name:z.string().min(1).max(100),
    description:z.string().optional(),
    price:z.number().min(0),
    category:z.enum(['electronics', 'clothing', 'food', 'books', 'other']),
    stock:z.number().min(0).optional().default(0),
});

export const updateProductSchema = z.object({
    name:z.string().min(1).max(100).optional(),
    description:z.string().optional(),
    price:z.number().min(0).optional(),
    category:z.enum(['electronics', 'clothing', 'food', 'books', 'other']).optional(),
    stock:z.number().min(0).optional(),
});