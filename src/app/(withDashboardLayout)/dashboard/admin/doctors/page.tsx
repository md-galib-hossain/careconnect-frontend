"use client"
import { Box, Button, CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import DoctorModal from "./components/DoctorModal";
import { useState } from "react";
import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from "@/redux/api/doctorsApi";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";
import { useDebounce } from "@/redux/hooks";
import { toast } from "sonner";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query : Record<string,any> = {}
  const [searchTerm, setSearchTerm] = useState<string>("")

  //search after 6 second delay
  const debouncedTerm = useDebounce({searchQuery : searchTerm, delay : 600})
  if(!!debouncedTerm){
    query["searchTerm"] = searchTerm

  }
  const {data,isLoading} = useGetAllDoctorsQuery({...query})
  const [deleteDoctor] = useDeleteDoctorMutation()
  const doctors = data?.doctors;
  const meta = data?.meta

//delete
const handleDelete = async (id: string) => {
  try {
const res = await deleteDoctor(id).unwrap()
console.log(res)
if(res?.id){
  toast.success("Doctor deleted successfully!!!")
}
  } catch (err: any) {
    console.error(err.message);
  }
};

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex:1 },
    { field: "email", headerName: "Email", flex:1 },
    { field: "contactNumber", headerName: "Contact Number", flex:1 },
    { field: "gender", headerName: "Gender", flex:1 },
    { field: "appointmentFee", headerName: "Appointment Fee", flex:1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>

          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <GridDeleteIcon sx={{ color: "red" }}/>
          </IconButton>
          <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  
  
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
       
        onClick={() => setIsModalOpen(true)}
        >
          Create New Doctor
        </Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen}/>
        <TextField onChange={(e)=> setSearchTerm(e.target.value)} size="small" placeholder="Search Specialties" />
      </Stack>
      <Box my={5}>
        Display Doctors
        {!isLoading ? (
          <DataGrid rows={doctors} columns={columns} 
          // hideFooter={true}
          />
        ) : (
          <Box
            display="flex"
            m={10}
            justifyContent="center"
            p={10}
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DoctorsPage;
