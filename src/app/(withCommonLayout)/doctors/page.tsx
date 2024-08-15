import DashedLine from "@/components/UI/Doctor/DashedLine";
import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import ScrollCategory from "@/components/UI/Doctor/ScrollCategory";
import { Doctor } from "@/types/doctor";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

interface PropType {
  searchParams: { specialties?: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  console.log(searchParams);
  
  // Construct the API URL based on specialties or default to fetching all doctors
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor`;
  const specialtiesQuery = searchParams.specialties ? `&specialties=${searchParams.specialties}` : '';
  const res = await fetch(apiUrl +'?limit=100'+ specialtiesQuery);

  const { data } = await res.json();
  console.log(data, "hadf");

  return (
    <Container>
      <DashedLine />

      <ScrollCategory specialties={searchParams?.specialties} />

      <Box sx={{ mt: 2, mb: 10, p: 3,  }} display={"flex"} flexDirection={"column"} gap={4}>
        {data?.length > 0 ? (
          data.map((doctor: Doctor, index: number) => (
            <Box key={doctor.id}>
              <DoctorCard doctor={doctor} />

            </Box>
          ))
        ) : (
          <Typography color="white">No Doctor Found With This Specialty</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Doctors;
