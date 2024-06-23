'use client';
import { useGetMyAppointmentsQuery } from '@/redux/api/appointmentApi';
import { Box,  IconButton, useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import { getTimeIn12HourFormat } from '../../doctor/schedules/components/MultipleSelectFieldWithChip';
import CCChips from '@/components/Shared/CCChips/CCChips';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { styled, useTheme } from '@mui/material/styles';
import { useCreateReviewMutation } from '@/redux/api/reviewApi';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: { [index: number]: { icon: JSX.Element; label: string } } = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: { value: number }) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

function SingleRatingIcon({ value }: { value: number }) {
  return customIcons[value] ? customIcons[value].icon : null;
}

const PatientAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  const [createReview, { isLoading: creating }] = useCreateReviewMutation();
  const appointments = data?.appointments;

  const handleRatingClick = async (appointmentId: string, rating: number | null) => {
    try {
      const result = await createReview({ appointmentId, rating });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    console.log(`Appointment ID: ${appointmentId}, Rating: ${rating}`);
  };

  if (isLoading) {
    return "...Loading";
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Doctor Name',
      flex: 1,
      renderCell: ({ row }) => row.doctor.name,
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
      renderCell: ({ row }) => getTimeIn12HourFormat(row.schedule.startDateTime),
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
      field: 'action',
      headerName: 'Join',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <IconButton
          component={Link}
          href={`/video?videoCallingId=${row?.videoCallingId}`}
          disabled={row.paymentStatus === 'UNPAID'}
        >
          <VideocamIcon
            sx={{ color: row.paymentStatus === 'PAID' ? 'primary.main' : '' }}
          />
        </IconButton>
      ),
    },
    {
      field: 'review',
      headerName: 'Review',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => {
     if(creating){
return  <Box sx={{ display: 'flex',justifyContent : "center" }}>
<CircularProgress />
</Box>
     }else{
      if (row.review) {
         return <SingleRatingIcon value={row.review.rating} />;
       } else if (row.status === 'COMPLETED') {
         return (
           <StyledRating
             name={`appointment-${row.id}-rating`}
             defaultValue={3}
             IconContainerComponent={IconContainer}
             getLabelText={(value) => customIcons[value].label}
             highlightSelectedOnly
             onChange={(event, newValue) => handleRatingClick(row.id, newValue)}
           />
         );
       }
       return 'No Review';
     }
      },
    },
  ];

  return (
    <Box>
      <Box my={2} sx={{ width: '100%', overflowX: 'auto' }}>
        <DataGrid
          rows={appointments ?? []}
          columns={columns}
          loading={isLoading}
          autoHeight
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default PatientAppointmentsPage;
