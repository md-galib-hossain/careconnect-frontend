"use client"
import { Box, Button, CircularProgress, IconButton, MenuItem, Select, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import DoctorModal from "./components/DoctorModal";
import { useEffect, useState } from "react";
import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from "@/redux/api/doctorsApi";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";
import { useDebounce } from "@/redux/hooks";
import { toast } from "sonner";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import usePagination from "@/hooks/usePagination";
import CCPagination from "@/components/Shared/CCPagination/CCPagination";

const DoctorsPage = () => {
  // Initialize the pagination hook
  const [totalItems, setTotalItems] = useState<number>(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Search after 6 second delay
  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });
  if (debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useGetAllDoctorsQuery({ page, limit, ...query });
  const [deleteDoctor] = useDeleteDoctorMutation();
  const doctors = data?.doctors;
  const meta = data?.meta;

  useEffect(() => {
    if (meta?.total) {
      setTotalItems(meta.total);
    }
  }, [data]);

  // Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "appointmentFee", headerName: "Appointment Fee", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
              <GridDeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  // Media query for responsiveness
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Stack direction={isSmallScreen ? "column" : "row"} justifyContent="space-between" alignItems="center" spacing={2}>
        <Button onClick={() => setIsModalOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField onChange={(e) => setSearchTerm(e.target.value)} size="small" placeholder="Search Specialties" />
      </Stack>
      <Box my={5}>
        Display Doctors
        {!isLoading ? (
          <Box my={2}>
            <DataGrid rows={doctors} columns={columns} hideFooter sx={{ height: 300 }} />
            {/* pagination start */}
            <Box gap={2} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={isSmallScreen ? "column" : "row"}>
              <Select
                disabled={pageCount == 0}
                value={limit}
                variant="standard"
                onChange={(e) => handleChangeLimit(Number(e.target.value))}
                displayEmpty
                inputProps={{ "aria-label": "Items per page" }}
              >
                {[5, 10, 15, 20].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <Box mb={1}>
                <CCPagination pageCount={pageCount} page={page} handleChange={handleChangePage} />
              </Box>
            </Box>
            {/* pagination end */}
          </Box>
        ) : (
          <Box display="flex" m={10} justifyContent="center" p={10} alignItems="center">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DoctorsPage;
