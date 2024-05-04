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

const RegisterPage = () => {
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
          {/* input fields parent box */}
          <Box>
            <CCForm onSubmit={handleRegister}>
              {/* parent grid */}
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <CCInput required={true} name="patient.name" label="Name" fullWidth={true} />
                </Grid>
                <Grid item md={6}>
                  <CCInput required={true}
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid item md={6}>
                  <CCInput required={true}
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <CCInput required={true}
                    label="Contact No."
                    type="tel"
                    fullWidth={true}
                   name="patient.contactNumber"
                  />
                </Grid>
                <Grid item md={6}>
                  <CCInput required={true}
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
