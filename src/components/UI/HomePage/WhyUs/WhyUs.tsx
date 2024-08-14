import { Box, Container, Grid, Typography } from "@mui/material";
import assets from "@/assets";
import chooseUsImg from "@/assets/images/whyus-removebg-preview.png";
import Image from "next/image";

const servicesData = [
  {
    imageSrc: assets.svgs.award,
    title: "Award Winning Service",
    description:
      "Recognized for top-tier care, we provide innovative, compassionate, award-winning service every day.",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Best Quality Pregnancy Care",
    description:
      "Experience personalized prenatal support with advanced care and a holistic approach to motherhood.",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Complete Medical Equipments",
    description:
      "Our facility boasts state-of-the-art equipment, enabling us to deliver comprehensive and precise care.",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Dedicated Emergency Care",
    description:
      "Our emergency team provides swift and skilled medical attention, ensuring your peace of mind.",
  },
];

const WhyUs = () => {
  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Why Choose Us
          </Typography>
        </Box>
        <Grid container my={5} alignItems="center" justifyContent="center">
          <Grid item md={6} >
            {servicesData.map((service, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: "15px",
                  backgroundColor: "rgba(245, 245, 245, 1)",
                  padding: "15px",
                  alignItems: "center",
                  borderRadius:{
                    xs: "14px",
                    sm: "14px",
                    md: index % 2 === 0 ? "10px 10px 100px 10px" : "10px 100px 10px 10px",
                  },
                  marginBottom: index === servicesData.length - 1 ? "0px" : "20px",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  <Image src={service.imageSrc} width={50} alt="award" />
                </Box>
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography
                    variant="h6"
                    component="h6"
                    fontWeight={600}
                    sx={{ whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid item md={6}>
          <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                justifyContent: {
                  md: "end",
                },
                alignItems: "center",
                height: "100%", 
                textAlign: "center", 
              }}
            >
              <Image src={chooseUsImg} width={400} alt="choose us" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhyUs;
