"use client";
import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, Stack, TextField, useMediaQuery, useTheme, Grid, Typography } from "@mui/material";
import SpecialtyModal from "./components/SpecialtyModal";
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
import usePagination from "@/hooks/usePagination";
import CCPagination from "@/components/Shared/CCPagination/CCPagination";
import { useDebounce } from "@/redux/hooks";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // search with debounce 6 ms
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  // search after 6 second delay
  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });
  if (debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  // Initialize the pagination hook
  const [totalItems, setTotalItems] = useState<number>(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });

  const { data, isLoading } = useGetAllSpecialtiesQuery({ page, limit, ...query });

  useEffect(() => {
    if (data?.meta?.total) {
      setTotalItems(data.meta.total);
    }
  }, [data]);

  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteSpecialty(id).unwrap();
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
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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

  // Media query for responsiveness
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Stack direction={isSmallScreen ? "column" : "row"} justifyContent="space-between" alignItems="center" spacing={2}>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>Create Specialty</Button>
        <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField onChange={(e) => setSearchTerm(e.target.value)} size="small" placeholder="Search Specialties" />
      </Stack>
      <Box my={5}>
      <Typography variant="h4" component="h1" gutterBottom>
          Specialties
        </Typography>
        {!isLoading ? (
          <Box my={2}>
            <DataGrid rows={data.data} columns={columns} hideFooter sx={{ height: 300 }} />
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

export default SpecialtiesPage;
