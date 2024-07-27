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
import React, { useState } from "react";
import assets from "@/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "../services/actions/userLogin";
import { toast } from "sonner";
import { getUserInfo, storeUserInfo } from "../services/auth.services";
import CCForm from "@/components/Forms/CCForm";
import CCInput from "@/components/Forms/CCInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "./loginValidation";
import DemoAccountModal from "./components/DemoAccountModal";

const LoginPage = () => {
  const [open,setOpen] = useState(false)
  const router = useRouter();
  const [error, setError] = useState("");
  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo(res?.data?.accessToken);
        const user = getUserInfo();

        // router.push(`/dashboard/${user?.role}`);
      } else {
        setError(res?.message);
        // toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  console.log(loginValidationSchema);
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
          {/* icon and title */}
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box component={Link} href={"/"}>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login To Care Connect
              </Typography>
            </Box>
          </Stack>
          {/* error message start */}
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* error message end */}
          <DemoAccountModal open={open} setOpen={setOpen}/>
          <Button size="small" variant="text" onClick={()=> setOpen(!open)}>
            Demo Accounts
          </Button>
          {/* */}
          <Box>
            <CCForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              {/* parent grid */}
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <CCInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <CCInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Link href="/forgot-password">
                <Typography
                  mb={1}
                  textAlign="end"
                  component="p"
                  fontWeight={300}
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  Forgot password?
                </Typography>
              </Link>
              <Button
                sx={{
                  margin: "8px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don't have an account?{" "}
                <Box component="span" color="primary.main">
                  <Link href="/register">Register</Link>
                </Box>
              </Typography>
            </CCForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
