"use client"
import { Box, Button, Stack, TextField } from "@mui/material";
import SpecialtyModal from "./components/SpecialtyModal";
import { useState } from "react";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const {data,isLoading} = useGetAllSpecialtiesQuery({})
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={()=>setIsModalOpen(!isModalOpen)}>Create Specialty</Button>
        <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen}/>
        <TextField size="small" placeholder="Search Specialties"/>
      </Stack>
      <Box>
        Display specialties
        {isLoading && "isLoading"}
      </Box>
    </Box>
  );
};

export default SpecialtiesPage;
