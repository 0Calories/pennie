import { z } from 'zod';

export const ExpenseSchema = z.object({
  name: z.string(),
  cost: z.number(),
  category: z.string(),
});

export type Expense = z.infer<typeof ExpenseSchema>;

// API Request Types
export const ParseExpenseRequestSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

export const SaveExpenseRequestSchema = z.object({
  expense: ExpenseSchema,
});

export const UserCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type ParseExpenseRequest = z.infer<typeof ParseExpenseRequestSchema>;
export type SaveExpenseRequest = z.infer<typeof SaveExpenseRequestSchema>;
export type UserCredentials = z.infer<typeof UserCredentialsSchema>;

// API Response Types
export const ApiErrorResponseSchema = z.object({
  error: z.string(),
  details: z.string().optional(),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export const ApiSuccessResponseSchema = z.object({
  data: ExpenseSchema,
});

export type ApiSuccessResponse = z.infer<typeof ApiSuccessResponseSchema>;
