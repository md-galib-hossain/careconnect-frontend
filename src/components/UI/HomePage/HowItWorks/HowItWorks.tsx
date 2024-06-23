"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import femaleDocImg from "@/assets/how-it-works-img.png";
import searchIcon from "@/assets/icons/search-icon.png";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import appointmentIcon from "@/assets/icons/appointment-icon.png";
import charityIcon from "@/assets/icons/charity-icon.png";

const steps = [
  {
    icon: searchIcon,
    title: "Search Doctor",
    description: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare.",
  },
  {
    icon: doctorIcon,
    title: "Check Doctor Profile",
    description: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare.",
  },
  {
    icon: appointmentIcon,
    title: "Schedule Appointment",
    description: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare.",
  },
  {
    icon: charityIcon,
    title: "Get Your Solution",
    description: "Dolor sit amet consectetur. Scelerisque in eu mauris volutpat Ornare.",
  },
];

const HowItWorks = () => {
  return (
    <Container>
      <Box my={{ xs: 5, md: 10 }}>
        <Box textAlign={{ xs: 'center', md: 'left' }}>
          <Typography
            component="p"
            fontSize={{ xs: 18, md: 20 }}
            fontWeight={400}
            color="#1586FD"
            sx={{ mb: 1.3 }}
          >
            How it Works
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            fontSize={{ xs: 24, md: 34 }}
          >
            4 Easy Steps to Get Your Solution
          </Typography>
          <Typography
            component="p"
            fontSize={{ xs: 16, md: 18 }}
            fontWeight={400}
            sx={{ mt: 2 }}
          >
            Access to expert physicians and surgeons, advanced technologies
          </Typography>
          <Typography component="p" fontSize={{ xs: 16, md: 18 }} fontWeight={400}>
            and top-quality surgery facilities right here.
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} mt={{ xs: 3, md: 5 }}>
            {/* left side image */}
            <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Image src={femaleDocImg} alt="doctor image" />
            </Grid>
            {/* right side 4 panels */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {steps.map((step, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      height={250}
                      sx={{
                        backgroundColor: "#fff",
                        border: "1px solid lightgray",
                        borderRadius: "10px",
                        padding: "20px",
                        textAlign: 'center',
                      }}
                    >
                      <Image src={step.icon} alt={`${step.title.toLowerCase()}-icon`} />
                      <Typography
                        variant="h6"
                        component="h2"
                        fontWeight={500}
                        mt={3}
                        fontSize={{ xs: 16, md: 18 }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        component="p"
                        fontSize={{ xs: 12, md: 14 }}
                        fontWeight={400}
                        sx={{ mt: 1 }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default HowItWorks;
