import { z } from 'zod';

const usernameValidation = z.string()
  .min(3, { message: 'Username must be at least 3 characters long' })
  .max(32, { message: 'Username must be at most 32 characters long' })
  .regex(/^[a-zA-Z0-9]+$/, { message: 'Username can only' });

const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'password must be at least 6 characters' }),
});