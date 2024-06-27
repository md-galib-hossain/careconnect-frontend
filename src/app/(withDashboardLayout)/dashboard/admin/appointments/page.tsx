"use client";
import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, Stack, TextField, useMediaQuery, useTheme, CircularProgress, IconButton, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllAppointmentsQuery, useDeleteAppointmentMutation } from "@/redux/api/appointmentApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import usePagination from "@/hooks/usePagination";
import CCPagination from "@/components/Shared/CCPagination/CCPagination";
import { useDebounce } from "@/redux/hooks";
import { TAppointment } from "@/types/appointment";
import dayjs from "dayjs";
import CCChips from "@/components/Shared/CCChips/CCChips";

const AppointmentsPage = () => {
  const [allAppointments, setAllAppointments] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });
  const query: Record<string, any> = debouncedTerm ? { searchTerm: debouncedTerm } : {};

  const [totalItems, setTotalItems] = useState<number>(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });

  const { data, isLoading } = useGetAllAppointmentsQuery({ page, limit, ...query });

  const appointments = data?.appointments;
  const meta = data?.meta;

  useEffect(() => {
    if (meta?.total) {
      setTotalItems(meta.total);
    }

    // Map appointments to updateData format
    const updateData = appointments?.map((appointment: TAppointment, index : number) => {
      const specialtiesTitle = appointment.doctor.doctorSpecialties?.map((specialty) => specialty.specialties.title).join(", ") || "N/A";
      return {
        id: appointment.id,
        sl: index + 1,
        patientName: appointment.patient.name,
        patientId: appointment.patient.id,
        doctorName: appointment.doctor.name,
        doctorId: appointment.doctor.id,
        specialtiesTitle: specialtiesTitle,
        scheduleStartTime: appointment?.doctorSchedules?.schedule ? dayjs(appointment.doctorSchedules.schedule.startDateTime).format("DD.MM.YYYY h.mmA") : '',
        appointmentStatus: appointment.status,
        paymentStatus: appointment.paymentStatus,
      };
    });

    setAllAppointments(updateData || []);
  }, [data]);

  const columns: GridColDef[] = [
    { field: "sl", headerName: "Serial No.", width: 100 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    // { field: "patientId", headerName: "Patient ID", flex: 1 },
    { field: "doctorName", headerName: "Doctor Name", flex: 1 },
    { field: "specialtiesTitle", headerName: "Specialties", flex: 1 },
    // { field: "doctorId", headerName: "Doctor ID", flex: 1 },
    { field: "scheduleStartTime", headerName: "Schedule Start Time", flex: 1 },
    { field: "appointmentStatus", headerName: "Appointment Status", flex: 1 },
    { 
      field: "paymentStatus", 
      headerName: "Payment Status", 
      flex: 1, 
      renderCell: ({ row }) => (
        row.paymentStatus === 'PAID' ? (
          <CCChips label={row.paymentStatus} type='success' />
        ) : (
          <CCChips label={row.paymentStatus} type='error' />
        )
      ),
    },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      {/* <Stack direction={isSmallScreen ? "column" : "row"} justifyContent="space-between" alignItems="center" spacing={2}>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>Create Appointment</Button>
        <TextField onChange={(e) => setSearchTerm(e.target.value)} size="small" placeholder="Search Appointments" />
      </Stack> */}
      <Box my={5}>
      <Typography variant="h4" component="h1" gutterBottom>
          Appointments
        </Typography>
        {!isLoading ? (
          <Box my={2}>
            <DataGrid 
              rows={allAppointments} 
              columns={columns} 
              hideFooter 
              sx={{ height: 318 }} 
            
            />
            {/* pagination */}
            <Box gap={2} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={isSmallScreen ? "column" : "row"}>
              <Select
                disabled={pageCount === 0}
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

export default AppointmentsPage;
