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
import React from "react";
import assets from "@/assets";
import Link from "next/link";
const LoginPage = () => {
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
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login To Care Connect
              </Typography>
            </Box>
          </Stack>
          {/* */}
          <Box>
            {/* parent grid */}
            <Grid container spacing={2} my={1}>
              <Grid item md={6}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
            <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
              <Link href="/forgot-password">Forgot password?</Link>
            </Typography>
            <Button
              sx={{
                margin: "8px 0px",
              }}
              fullWidth={true}
            >
              Login
            </Button>
            <Typography component="p" fontWeight={300}>
              Don't have an account?{" "}
              <Box component="span" color="primary.main">
                <Link href="/register">Register</Link>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
