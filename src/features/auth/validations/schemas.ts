import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email("Invalid email").trim()
    .toLowerCase(),
  password: z.string("Password is required").trim().min(1),
});

export const registerSchema = z.object({
  username: z.string({ error: 'Username is required' }).min(3, "Username must be at least 3 characters").max(25, "Username must be at most 25 characters"),
  email: z.email('Invalid email').trim()
    .toLowerCase(),
  phone: z.string({ error: 'Phone number is required' }).trim()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string().trim().min(6, "Password must be at least 6 characters").max(16,"Password must be at most 16 characters"),
});
export const registerFormSchema = registerSchema
  .extend({ confirmPassword: z.string().trim() })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // show the error under THIS field
  })
export type RegisterForm = z.infer<typeof registerFormSchema>

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email").trim()
    .toLowerCase(),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().trim().min(6, "Password must be at least 6 characters").max(16,"Password must be at most 16 characters"),
});