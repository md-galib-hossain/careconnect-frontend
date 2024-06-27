"use client";
import CCPagination from "@/components/Shared/CCPagination/CCPagination";
import usePagination from "@/hooks/usePagination";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { Box, CircularProgress, MenuItem, Select, useMediaQuery, useTheme, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ReviewsPage = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });
  const { data, isLoading } = useGetAllReviewsQuery({ page, limit });
  const reviews = data?.reviews;
  const meta = data?.meta;

  useEffect(() => {
    if (meta?.total) {
      setTotalItems(meta.total);
    }
  }, [meta]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const columns: GridColDef[] = [
    { field: "sl", headerName: "Serial No.", width: 100 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "doctorName", headerName: "Doctor Name", flex: 1 },
    { field: "appointmentTime", headerName: "Appointment Time", flex: 1 },
    { field: "reviewTime", headerName: "Review Time", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
  ];

  const rows = reviews?.map((review: any, index: number) => ({
    id: review.id,
    sl: index + 1,
    patientName: review.patient.name,
    doctorName: review.doctor.name,
    appointmentTime: dayjs(review?.appointment?.doctorSchedules?.schedule?.startDateTime).format("DD.MM.YYYY h.mmA"),
    rating: review.rating,
    reviewTime: dayjs(review.createdAt).format("DD.MM.YYYY h.mmA"),
  })) ?? [];

  console.log(reviews);

  return (
    <Box>
      <Box my={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reviews
        </Typography>
        {!isLoading ? (
          <Box my={2}>
           
              <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                sx={{ height : 318}}
              />
         
            {/* pagination */}
            <Box
              gap={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={isSmallScreen ? "column" : "row"}
              my={2}
            >
              <Select
                disabled={pageCount === 0}
                value={limit}
                variant="standard"
                onChange={(e: any) => handleChangeLimit(Number(e.target.value))}
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

export default ReviewsPage;
