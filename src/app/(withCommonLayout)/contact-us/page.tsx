"use client";

import React, { useRef } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export const validationSchema = z.object({
  firstName: z.string({ message: "Enter your first name" }),
  lastName: z.string({ message: "Enter your last name" }),
  message: z.string({ message: "Enter your message" }),
  email: z.string().email("Please enter a valid email address!"),
});

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data : any) => {
    console.log("Form data:", data);
    try {
      const res = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
     
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID!

      );
      if(res.status === 200){
        toast.success('Your message sent successfully');
      }
      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName")}
                label="First Name"
                fullWidth
                required
                error={!!errors.firstName}
               
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName")}
                label="Last Name"
                fullWidth
                required
                error={!!errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email")}
                label="Email Address"
                fullWidth
                required
                error={!!errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("message")}
                label="Message"
                multiline
                rows={4}
                fullWidth
                required
                error={!!errors.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ContactUs;
