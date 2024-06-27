"use client"
import { useState, useEffect } from 'react';
import { Box, IconButton, Select, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import { getTimeIn12HourFormat } from '../schedules/components/MultipleSelectFieldWithChip';
import usePagination from '@/hooks/usePagination';
import CCPagination from '@/components/Shared/CCPagination/CCPagination';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppointmentStatusChangeMutation, useGetMyAppointmentsQuery } from '@/redux/api/appointmentApi';
import { toast } from 'sonner';
import CCChips from '@/components/Shared/CCChips/CCChips';

const PatientAppointmentsPage = () => {
  const [appointmentStatusChange, { isLoading: updating }] = useAppointmentStatusChangeMutation();
  const [totalItems, setTotalItems] = useState(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });
  const query: Record<string, any> = { page, limit };
  const { data, isLoading: appointmentsLoading } = useGetMyAppointmentsQuery({ ...query });
  const appointments = data?.appointments;
  const meta = data?.meta;

  useEffect(() => {
    if (meta?.total) {
      setTotalItems(meta.total);
    }
  }, [data]);

  const handleStatusUpdate = async (row: any, status: string) => {
    console.log({ id: row.id, status });
    if (row.paymentStatus !== 'COMPLETED') {
      try {
        const res = await appointmentStatusChange({
          body: {
            status,
          },
          id: row.id,
        }).unwrap();
        console.log(res);
        if (res?.id) toast.success('status updated');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Patient Name',
      flex: 1,
      renderCell: ({ row }) => row?.patient?.name,
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
      renderCell: ({ row }) => (
        row.paymentStatus === 'PAID' ? (
          <CCChips label={row.paymentStatus} type='success' />
        ) : (
          <CCChips label={row.paymentStatus} type='error' />
        )
      ),
    },
    {
      field: 'status',
      headerName: 'Appointment Status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (isSmallScreen ? row.status.substring(0, 3) : row.status),
    },
    {
      field: 'action',
      headerName: 'Join',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <IconButton
          disabled={row.paymentStatus === 'UNPAID' || row.status === 'COMPLETED'}
          component={Link}
          href={`/video?videoCallingId=${row?.videoCallingId}`}
        >
          <VideocamIcon sx={{ color: row.paymentStatus === 'PAID' && row.status === 'SCHEDULED' ? 'primary.main' : '' }} />
        </IconButton>
      ),
    },
    {
      field: 'statusActions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Box>
          {row.status === 'COMPLETED' ? (
            'N/A'
          ) : (
            <>
              <IconButton onClick={() => handleStatusUpdate(row, 'COMPLETED')}>
                <CheckIcon sx={{ color: 'green' }} />
              </IconButton>
              <IconButton onClick={() => handleStatusUpdate(row, 'CANCELED')}>
                <ClearIcon sx={{ color: 'red' }} />
              </IconButton>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {!appointmentsLoading ? (
        <Box my={2}>
          <DataGrid
            rows={appointments ?? []}
            columns={columns}
            loading={appointmentsLoading || updating}
            hideFooter
            autoHeight
          />
          <Box mt={2} display="flex" justifyContent="center" alignItems="center">
            <Select
              disabled={pageCount === 0}
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
            <Box ml={isSmallScreen ? 1 : 2}>
              <CCPagination
                pageCount={pageCount}
                page={page}
                handleChange={handleChangePage}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default PatientAppointmentsPage;
