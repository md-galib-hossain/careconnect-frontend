import { z } from "zod";

export const forgotValidationSchema = z.object({
    email: z.string().email('Please enter a valid email address!'),
 });