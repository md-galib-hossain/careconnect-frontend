import { z } from "zod";

export const patientProfileValidationSchema = z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    profilePhoto: z.string().optional(), 
});
