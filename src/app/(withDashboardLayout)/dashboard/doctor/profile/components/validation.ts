import { z } from "zod";

export const doctorProfileValidationSchema = z.object({
    experience: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
    ),
    apointmentFee: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
    ),
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    gender: z.string().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
  });