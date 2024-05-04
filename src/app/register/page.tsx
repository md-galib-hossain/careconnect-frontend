"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "../services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "../services/actions/userLogin";
import { storeUserInfo } from "../services/auth.services";
import CCForm from "@/components/Forms/CCForm";
import CCInput from "@/components/Forms/CCInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@mui/icons-material";
import { useState } from "react";

const patientValidationSchema = z.object({
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

const formDefaultValues = {
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
  password: "",
};
const RegisterPage = () => {
  const [error, setError] = useState("")
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const response = await registerPatient(data);
      if (response?.data?.id) {
        toast.success(response?.message);
        
        //login after registration
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          toast.success(result?.message);
          storeUserInfo(result?.data?.accessToken);
          router.push("/");
        }
      }else{
setError(`User with same ${response?.error?.target[0]} already exists`)
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>
           {/* error message start */}
           {
            error && <Box>
            <Typography sx={{
              backgroundColor : "red",
              padding : "1px",
              borderRadius : "2px",
              color : "white",
              marginTop : "5px"
            }}>
            {error}
            </Typography>
            </Box>
          }

          {/* error message end */}
          {/* input fields parent box */}
          <Box>
            <CCForm
              onSubmit={handleRegister}
              resolver={zodResolver(patientValidationSchema)}
              defaultValues={{formDefaultValues}}
            >
              {/* parent grid */}
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <CCInput name="patient.name" label="Name" fullWidth={true} />
                </Grid>
                <Grid item md={6}>
                  <CCInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid item md={6}>
                  <CCInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <CCInput
                    label="Contact No."
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid item md={6}>
                  <CCInput
                    label="Address"
                    type="text"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                sx={{
                  margin: "8px 0px",
                }}
                fullWidth={true}
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Box component="span" color="primary.main">
                  <Link href="/login">Login</Link>
                </Box>
              </Typography>
            </CCForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
