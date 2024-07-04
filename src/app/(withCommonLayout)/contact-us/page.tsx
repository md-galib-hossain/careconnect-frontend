"use client";

import React, { useRef } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("Form data:", data);
    try {
      const res = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID!
      );
      if (res.status === 200) {
        toast.success("Your message sent successfully");
      }
      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box mt={35} id="contact-me">
    <Container maxWidth="sm" >
    <Typography variant="h3" sx={{textAlign : "center"}} >
          Contact Me
        </Typography>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName")}
                label="First Name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName")}
                label="Last Name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email")}
                label="Email Address"
                fullWidth
                required
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
    </Box>
  );
};

export default ContactUs;
