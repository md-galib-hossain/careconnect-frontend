"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import SpecialtyModal from "./components/SpecialtyModal";
import { useState } from "react";
import {
  useDeleteSpecialtyMutation,
  useGetAllSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { toast } from "sonner";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllSpecialtiesQuery({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation();
  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteSpecialty(id).unwrap();;
      if (res?.id) {
        toast.success(`${res?.title} has been deleted successfully`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 400 },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image src={row?.icon} width={30} height={30} alt="icon" />
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row?.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>
          Create Specialty
        </Button>
        <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Specialties" />
      </Stack>
      <Box my={5}>
        Display specialties
        {!isLoading ? (
          <DataGrid rows={data} columns={columns} />
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

export default SpecialtiesPage;
