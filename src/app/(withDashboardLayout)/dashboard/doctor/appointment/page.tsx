"use client";
import { useGetMyAppointmentsQuery } from '@/redux/api/appointmentApi';
import { Box, IconButton, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import { getTimeIn12HourFormat } from '../schedules/components/MultipleSelectFieldWithChip';
import usePagination from '@/hooks/usePagination';
import CCPagination from '@/components/Shared/CCPagination/CCPagination';
import { useEffect, useState } from 'react';

const PatientAppointmentsPage = () => {
  // Initialize the pagination hook
  const [totalItems, setTotalItems] = useState(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });

  // Query parameters for fetching appointments
  const query: Record<string, any> = { page, limit };

  // Fetch appointments data
  const { data, isLoading } = useGetMyAppointmentsQuery({ ...query });
  const appointments = data?.appointments;
  const meta = data?.meta;

  // Update total items when data is fetched
  useEffect(() => {
    if (meta?.total) {
      setTotalItems(meta.total);
    }
  }, [meta]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Patient Name',
      flex: 1,
      renderCell: ({ row }) => row?.patient?.name,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      flex: 1,
      renderCell: ({ row }) => row?.patient?.contactNumber,
    },
    {
      field: 'appointmentDate',
      headerName: 'Appointment Date',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ row }) => dateFormatter(row.schedule.startDateTime),
    },
    {
      field: 'appointmentTime',
      headerName: 'Appointment Time',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ row }) => getTimeIn12HourFormat(row?.schedule?.startDateTime),
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'Join',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <IconButton
          disabled={row.paymentStatus === 'UNPAID'}
          component={Link}
          href={`/video?videoCallingId=${row?.videoCallingId}`}
        >
          <VideocamIcon sx={{ color: row.paymentStatus === 'PAID' ? 'primary.main' : '' }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box my={2}>
         
          <DataGrid
            rows={appointments ?? []}
            columns={columns}
            loading={isLoading}
            hideFooter
            autoHeight
          />
              {/* pagination start */}
              <Box gap={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Select
              disabled={pageCount == 0}
            value={limit}
      variant="standard"
            onChange={(e) => handleChangeLimit(Number(e.target.value))}
            displayEmpty
            inputProps={{ 'aria-label': 'Items per page' }}
          >
            {[5, 10, 15, 20].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <Box mb={1}>

              <CCPagination
                pageCount={pageCount}
                page={page}
                handleChange={handleChangePage}
              />
          </Box>
              </Box>
                         {/* pagination end */}
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default PatientAppointmentsPage;
