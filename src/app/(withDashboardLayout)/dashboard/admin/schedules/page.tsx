"use client";

import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import { useDeleteScheduleMutation, useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { ISchedule } from "@/types/schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { toast } from "sonner";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [deleteSchedule] = useDeleteScheduleMutation()
  const { data, isLoading } = useGetAllSchedulesQuery({});
  const schedules = data?.schedules;
  const meta = data?.meta;
  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule,index : number) => {
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
  }, [schedules]);


  //delete
  const handleDelete = async(id : string)=>{
    try{

      const res = await deleteSchedule(id).unwrap()
      if(res?.id){
        toast.success("Schedule deleted successfully")
      }
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }
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
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete" onClick={(e)=>handleDelete(row.id)}>
            <GridDeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
         <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
         <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
         {!isLoading ? (
            <Box my={2}>
               <DataGrid rows={allSchedule ?? []} columns={columns} />
            </Box>
         ) : (
            <h1>Loading.....</h1>
         )}
      </Box>
  );
};

export default SchedulesPage;
