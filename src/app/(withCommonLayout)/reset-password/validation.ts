import { z } from "zod";

export const resetValidationSchema = z.object({
    newPassword: z.string().min(6, 'Must be at least 6 characters long'),
 });