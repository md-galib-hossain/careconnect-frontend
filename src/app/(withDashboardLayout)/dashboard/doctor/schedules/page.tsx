"use client";
import { Box, Button, IconButton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctoScheduleApi";
import { ISchedule } from "@/types/schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
const DoctorSchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  query["page"] = page;
  query["limit"] = limit;

  const { data, isLoading } = useGetAllDoctorSchedulesQuery({ ...query });
  const schedules = data?.doctorSchedules;
  const meta = data?.meta;
  let pageCount: number;

  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const startIndex = ((meta?.page as number) - 1) * limit + 1;
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      return {
        sl: startIndex + index,
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDateTime),
        startTime: dayjs(schedule?.schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

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
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete">
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
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
              <DataGrid
                rows={allSchedule ?? []}
                columns={columns}
                hideFooterPagination
                slots={{
                  footer: () => {
                    return (
                      <Box
                        sx={{
                          mb: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Pagination
                          color="primary"
                          count={pageCount}
                          page={page}
                          onChange={handleChange}
                        />
                      </Box>
                    );
                  },
                }}
              />
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
