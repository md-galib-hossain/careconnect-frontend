import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Specialist = async () => {
  const res = await fetch("http://localhost:5000/api/v1/specialties/?limit=6", {
    next: {
      revalidate: 30,
    },
  });

  const { data } = await res.json();
  const specialties = data.data

  return (
    <Container>
      <Box
        sx={{
          margin: "40px 0px",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "start",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Explore Treatments Across
          </Typography>
          <Typography component="p" fontWeight={300} fontSize={18}>
            Experienced Doctors Across All Specialties
          </Typography>
        </Box>
        <Grid container gap={2} my={5} justifyContent={"center"}>
          {specialties && specialties
            ?.slice(0, 6)
            .map((speciality: { id: string; title: string; icon: string }) => (
              <Grid item md={1.5} xs={5} sm={5}
              component={Link}
              href={`/doctors?specialties=${speciality.title}`}
                key={speciality.id}
                sx={{
                 
                  width: "140px",
                  backgroundColor: "rgba(245, 245, 245, 1)",
                  border: "1px solid rgba(5, 130, 202, 0.3)",
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "40px 10px",
                  "& img": {
                    width: "50px",
                    height: "50px",
                    margin: "0 auto",
                  },
                  "&:hover": {
                    border: "1px solid rgba(5, 130, 202, 1)",
                    padding: "40px 10px",
                    borderRadius: "10px",
                  },
                }}
              >
                <Image
                  src={speciality.icon}
                  width={60}
                  height={60}
                  alt=" speciality icon"
                />
                <Box>
                  <Typography
                    component="p"
                    fontWeight={600}
                    fontSize={14}
                    mt={2}
                  >
                    {speciality.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
        <Button variant="outlined">View All</Button>
      </Box>
    </Container>
  );
};

export default Specialist;
