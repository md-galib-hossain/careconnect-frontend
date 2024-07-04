import { z } from "zod";

export const patientValidationSchema = z.object({
    patient: z.object({
      name: z.string({ required_error: "Name is required" }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Please enter a valid email address"),
      contactNumber: z
        .string({ required_error: "Contact number is required" })
        .regex(/^\d{11}$/, "Please provide a valid phone number"),
      address: z.string({ required_error: "Adress is required" }),
    }),
  
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Must be atleast 6 characters"),
  });