import { z } from 'zod';

export const updateMyProfileSchema = z.object({
  username: z.string({ error: 'Username is required' }).trim().min(3, "Username must be at least 3 characters").max(25, "Username must be at most 25 characters").optional(),
  phone: z.string().trim().min(1, "Phone number cannot be empty").regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').optional(),
  avatar: z.string().optional(),
});

export const createUserSchema = z.object({
  username: z.string({ error: 'Username is required' }).trim().min(3, "Username must be at least 3 characters").max(25, "Username must be at most 25 characters"),
  email: z.email('Invalid email').trim()
    .toLowerCase(),
  phone: z.string().trim().min(1, "Phone number cannot be empty").regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string().trim().min(6, "Password must be at least 6 characters").max(16, "Password must be at most 16 characters"),
  role: z.enum(["reader","author","editor","admin"], { error: 'Invalid role' }),
});

export const updateUserSchema = z.object({
  username:  z.string({ error: 'Username is required' }).trim().min(3, "Username must be at least 3 characters").max(25, "Username must be at most 25 characters").optional(),
  email: z.email('Invalid email').trim()
    .toLowerCase().optional(),
  phone: z.string({ error: 'Phone number is required' }).trim()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').optional(),
  password: z.string().trim().min(6, "Password must be at least 6 characters").max(16,"Password must be at most 16 characters").optional(),
  role: z.enum(["reader","author" , "editor" ,"admin"], { error: 'Invalid role' }).optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().trim().min(6, "old Password must be at least 6 characters").max(16,"old Password must be at most 16 characters"),
  newPassword: z.string().trim().min(6, "new Password must be at least 6 characters").max(16,"new Password must be at most 16 characters"),
  confirmNewPassword: z.string().trim().min(6, "confirm Password must be at least 6 characters").max(16,"confirm Password must be at most 16 characters"),
}).refine(
  (data) => data.newPassword === data.confirmNewPassword,
  {
    message: "New password and Confirm password do not match",
    path: ["confirmNewPassword"]
  }
);