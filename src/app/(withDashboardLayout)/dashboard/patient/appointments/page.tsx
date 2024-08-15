"use client";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Box, IconButton, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VideocamIcon from "@mui/icons-material/Videocam";
import Link from "next/link";
import { dateFormatter } from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "../../doctor/schedules/components/MultipleSelectFieldWithChip";
import CCChips from "@/components/Shared/CCChips/CCChips";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { styled } from "@mui/material/styles";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useEffect, useState } from "react";
import usePagination from "@/hooks/usePagination";
import CCPagination from "@/components/Shared/CCPagination/CCPagination";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: { [index: number]: { icon: JSX.Element; label: string } } = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [totalItems, setTotalItems] = useState(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } =
    usePagination({
      initialPage: 1,
      initialLimit: 5,
      totalItems,
    });
  const query: Record<string, any> = { page, limit };

  const { data, isLoading } = useGetMyAppointmentsQuery({ ...query });
  const [createReview] = useCreateReviewMutation();
  const appointments = data?.appointments;
  const meta = data?.meta;

  const [loadingReviewIds, setLoadingReviewIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (meta?.total) {
      setTotalItems(meta.total);
    }
  }, [data,meta?.total]);

  const handleRatingClick = async (
    appointmentId: string,
    rating: number | null
  ) => {
    try {
      setLoadingReviewIds((prev) => new Set(prev.add(appointmentId)));
      const result = await createReview({ appointmentId, rating });
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingReviewIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appointmentId);
        return newSet;
      });
    }
    console.log(`Appointment ID: ${appointmentId}, Rating: ${rating}`);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Doctor Name",
      flex: 1,
      renderCell: ({ row }) => row.doctor.name,
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => dateFormatter(row.schedule.startDateTime),
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) =>
        getTimeIn12HourFormat(row.schedule.startDateTime),
    },
    {
      field: "status",
      headerName: "Appointment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row.status,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) =>
        row.paymentStatus === "PAID" ? (
          <CCChips label={row.paymentStatus} type="success" />
        ) : (
          <CCChips label={row.paymentStatus} type="error" />
        ),
    },
    {
      field: "action",
      headerName: "Join",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton
          component={Link}
          href={`/video?videoCallingId=${row?.videoCallingId}`}
          disabled={
            row.paymentStatus === "UNPAID" || row.status !== "SCHEDULED"
          }
        >
          <VideocamIcon
            sx={{
              color:
                row.paymentStatus === "PAID" && row.status === "SCHEDULED"
                  ? "primary.main"
                  : "",
            }}
          />
        </IconButton>
      ),
    },
    {
      field: "review",
      headerName: "Review",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        if (loadingReviewIds.has(row.id)) {
          return (
            <Box sx={{ display: "flex", justifyContent: "center",alignItems:"center" }}>
              <CircularProgress size={20} />
            </Box>
          );
        } else {
          if (row.review) {
            return <SingleRatingIcon value={row.review.rating} />;
          } else if (row.status === "COMPLETED") {
            return (
              <StyledRating
                name={`appointment-${row.id}-rating`}
                defaultValue={3}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
                onChange={(event, newValue) =>
                  handleRatingClick(row.id, newValue)
                }
              />
            );
          }
          return "No Review";
        }
      },
    },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box my={2} sx={{ width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={appointments ?? []}
            columns={columns}
            loading={isLoading}
            hideFooter
            sx={{ height: 318 }}
          />
          {/* pagination */}
          <Box
            gap={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={isSmallScreen ? "column" : "row"}
          >
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
              <CCPagination
                pageCount={pageCount}
                page={page}
                handleChange={handleChangePage}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" p={10}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default PatientAppointmentsPage;
