"use client";

import { Box, Button, IconButton, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import { useDeleteScheduleMutation, useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { ISchedule } from "@/types/schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { toast } from "sonner";
import usePagination from "@/hooks/usePagination";
import CCPagination from "@/components/Shared/CCPagination/CCPagination";
import CircularProgress from "@mui/material/CircularProgress";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [deleteSchedule] = useDeleteScheduleMutation();

  //* Initialize the pagination hook
  const [totalItems, setTotalItems] = useState<number>(0);
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });

  const { data, isLoading } = useGetAllSchedulesQuery({ page, limit });
  const schedules = data?.schedules;
  const meta = data?.meta;

  useEffect(() => {
    if (data?.meta?.total) {
      setTotalItems(data.meta.total);
    }
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.id,
        startDate: dateFormatter(schedule.startDateTime),
        endDate: dateFormatter(schedule.endDateTime),
        startTime: dayjs(schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [data,meta?.total,schedules]);

  // Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      if (res?.id) {
        toast.success("Schedule deleted successfully");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
          <GridDeleteIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  // Media query for responsiveness
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Stack direction={isSmallScreen ? "column" : "row"} justifyContent="space-between" alignItems="center" spacing={2}>
        <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
        <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>
      <Box my={5}>
      <Typography variant="h4" component="h1" gutterBottom>
          Schedules
        </Typography>
        {!isLoading ? (
          <Box my={2}>
            <DataGrid rows={allSchedule ?? []} columns={columns} hideFooter sx={{ height: 318 }} />
            {/* pagination start */}
            <Box gap={2} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={isSmallScreen ? "column" : "row"}>
              <Select
                disabled={pageCount == 0}
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
            {/* pagination end */}
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" p={10}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SchedulesPage;
