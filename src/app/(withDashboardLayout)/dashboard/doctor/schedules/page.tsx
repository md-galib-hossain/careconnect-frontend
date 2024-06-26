"use client";
import { Box, Button, IconButton, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctoScheduleApi";
import { ISchedule } from "@/types/schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import CCPagination from "@/components/Shared/CCPagination/CCPagination";
import usePagination from "@/hooks/usePagination";

const DoctorSchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Initialize the pagination hook
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } = usePagination({
    initialPage: 1,
    initialLimit: 5,
    totalItems,
  });

  // Fetch data using the current page and limit from the hook
  const { data, isLoading } = useGetAllDoctorSchedulesQuery({ page, limit });

  useEffect(() => {
    if (data?.meta?.total) {
      setTotalItems(data.meta.total);
    }

    if (data?.doctorSchedules) {
      const startIndex = ((data.meta.page as number) - 1) * limit + 1;
      const updateData = data.doctorSchedules.map((schedule: ISchedule, index: number) => ({
        sl: startIndex + index,
        id: schedule.scheduleId,
        startDate: dateFormatter(schedule.schedule.startDateTime),
        startTime: dayjs(schedule.schedule.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule.schedule.endDateTime).format("hh:mm a"),
      }));
      setAllSchedule(updateData);
    }
  }, [data, limit]);

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL", flex: 1 },
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
        <IconButton aria-label="delete">
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)} endIcon={<AddIcon />}>
        Create Doctor Schedule
      </Button>
      <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />

      <Box sx={{ mb: 5 }}>
        
        <Box>
          {!isLoading ? (
            <Box my={2}>
              <DataGrid rows={allSchedule ?? []} columns={columns} hideFooter autoHeight />
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
      </Box>
    </Box>
  );
};

export default DoctorSchedulesPage;
