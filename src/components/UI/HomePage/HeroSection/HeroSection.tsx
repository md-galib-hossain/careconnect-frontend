"use client";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import heroimage2transparent from "@/assets/images/heroimage2-transparent2.png";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: true,
  });

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        alignItems: "center",
        justifyContent: "space-between",
        my: 10,
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h3" component="h1" fontWeight={600}>
          Healthier Hearts{" "}
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Come From
        </Typography>
        <Typography
          color="primary.main"
          variant="h3"
          component="h1"
          fontWeight={600}
        >
          Preventive Care
        </Typography>
        <Typography sx={{ my: 4 }}>
          Achieve balance with our tailored healthcare solutions. We provide
          quality care with personalized treatment and advanced technology. Your
          comfort and well-being are our top priorities. Choose a partner that
          supports your health journey every day.
        </Typography>
        <Box display="flex" gap={2}>
          <Button component={Link} href={"/doctors"}>
            Make Appointment
          </Button>
          <Button component={Link} href={"/contact-us"} variant="outlined">
            Contact Us
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: isMediumUp ? "block" : "none",
          justifyContent: "end",
          alignItems: "center",
          position: "relative",
          visibility: isMounted ? "visible" : "hidden",
        }}
      >
        <Box
          sx={{
            borderRadius: 4,
            overflow: "hidden",
        
            width: "100%", 
            height: "auto", 
          }}
        >
          <Image
            src={heroimage2transparent}
            alt="hero"
            layout="responsive" 
            width={480}
            height={380}
            objectFit="cover" 
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
