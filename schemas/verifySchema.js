import { z } from 'zod';

export const verifySchema = {
  code: z.string().refine(val => val.length === 6, 'Verification code must be 6 digits')
}