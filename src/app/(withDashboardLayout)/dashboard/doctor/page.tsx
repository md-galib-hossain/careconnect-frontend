"use client";
import { useState, useEffect } from "react";
import { useGetDoctorStatisticsQuery } from "@/redux/api/doctorsApi";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useForm, FormProvider } from "react-hook-form";
import CCDatePicker from "@/components/Forms/CCDatePicker";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define TypeScript interfaces for stats data
interface AppointmentCount {
  _count: { _all: number };
  status: string;
}

interface DoctorSchedulesByMonth {
  [month: string]: number;
}

interface ReviewCountsByCategory {
  [category: string]: number;
}

interface PaymentCount {
  _count: { _all: number };
  status: string;
}

interface DoctorStatistics {
  appointmentCountsByStatus: AppointmentCount[];
  doctorSchedulesByMonth: DoctorSchedulesByMonth;
  uniquePatientsCount: { patientId: string }[];
  patientCountByBloodGroup: any[];
  patientCountByMaritalStatus: any[];
  patientCountByGender: any[];
  paymentCountsByStatus: PaymentCount[];
  reviewCountsByCategory: ReviewCountsByCategory;
}

const DoctorPage = () => {
  const { data: userData, isLoading: gettingUserData } = useGetSingleUserQuery({});
  const methods = useForm({
    defaultValues: {
      startDate: dayjs().subtract(1, "month"),
      endDate: dayjs(),
    },
  });

  const { startDate, endDate } = methods.watch();
  const [fetchId, setFetchId] = useState<string>("");

  useEffect(() => {
    if (userData?.id) {
      setFetchId(userData.id);
    }
  }, [userData]);

  const { data: stats, isLoading: gettingStats } = useGetDoctorStatisticsQuery(
    { id: fetchId, startDate: startDate?.format("YYYY-MM-DD"), endDate: endDate?.format("YYYY-MM-DD") },
    { skip: !fetchId }
  );

  useEffect(() => {
    if (fetchId) {
      console.log("Fetching doctor statistics");
    }
  }, [fetchId, startDate, endDate]);

  const isLoading = gettingUserData || gettingStats;

  if (isLoading) {
    return <CircularProgress />;
  }

  const appointmentsData = {
    labels: stats?.appointmentCountsByStatus.map((item: any) => item.status) || [],
    datasets: [
      {
        label: "Appointments",
        data: stats?.appointmentCountsByStatus.map((item: any) => item._count._all) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const schedulesData = {
    labels: Object.keys(stats?.doctorSchedulesByMonth || {}),
    datasets: [
      {
        label: "Doctor Schedules",
        data: Object.values(stats?.doctorSchedulesByMonth || {}),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  const reviewData = {
    labels: Object.keys(stats?.reviewCountsByCategory || {}),
    datasets: [
      {
        data: Object.values(stats?.reviewCountsByCategory || {}),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#AA66CC",
        ],
      },
    ],
  };

  const paymentData = {
    labels: stats?.paymentCountsByStatus.map((item: any) => item.status) || [],
    datasets: [
      {
        label: "Payments",
        data: stats?.paymentCountsByStatus.map((item: any) => item._count._all) || [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <Box display="flex" justifyContent="space-between" mb={2} gap={5}>
          <CCDatePicker allowPastDates={true} name="startDate" label="Start Date" />
          <CCDatePicker name="endDate" label="End Date" />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} my={5}>
            <Box sx={{ height: 250 }}>
              <Typography variant="h6" gutterBottom>
                Appointments by Status
              </Typography>
              <Bar data={appointmentsData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} my={5}>
            <Box sx={{ height: 250 }}>
              <Typography variant="h6" gutterBottom>
                Doctor Schedules by Month
              </Typography>
              <Line data={schedulesData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} my={5}>
            <Box sx={{ height: 250 }}>
              <Typography variant="h6" gutterBottom>
                Review Counts by Category
              </Typography>
              <Pie data={reviewData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} my={5}>
            <Box sx={{ height: 250 }}>
              <Typography variant="h6" gutterBottom>
                Payments by Status
              </Typography>
              <Bar data={paymentData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default DoctorPage;
