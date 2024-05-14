"use client";
import CCModal from "@/components/Shared/CCModal/CCModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import MultipleSelectFieldWithChip from "./MultipleSelectFieldWithChip";
import { Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctoScheduleApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({ open, setOpen }: TProps) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).toISOString()
  );
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);
  console.log(selectedScheduleIds);
  const query: Record<string, unknown> = {};
  if (!!selectedDate) {
    query["startDateTime"] = dayjs(selectedDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDateTime"] = dayjs(selectedDate)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
  }

  const { data, isLoading } = useGetAllSchedulesQuery(query);
  const [createDoctorSchedule, { isLoading: creatingLoading }] =
    useCreateDoctorScheduleMutation();
  const schedules = data?.schedules;
  if (isLoading) {
    return <h1>loading</h1>;
  }
  const onSubmit = async () => {
    try {
      const res = await createDoctorSchedule({
        scheduleIds: selectedScheduleIds,
      }).unwrap();
      if(res?.count){
toast.success("Your slot have been created")
        setOpen(!open);
        setSelectedScheduleIds([])
      }else{
        toast.success("Something wrong!!")

      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CCModal open={open} setOpen={setOpen} title="Create Doctor Schedule">
      <Stack direction={"column"} gap={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // disablePast
            label="Date"
            value={dayjs(selectedDate)}
            onChange={(newValue) =>
              setSelectedDate(dayjs(newValue).toISOString())
            }
          />
        </LocalizationProvider>
        <MultipleSelectFieldWithChip
          selectedScheduleIds={selectedScheduleIds}
          setSelectedScheduleIds={setSelectedScheduleIds}
          schedules={schedules}
        />

        <LoadingButton
          size="small"
          onClick={onSubmit}
          loading={creatingLoading}
          loadingIndicator="Submitting..."
          variant="contained"
        >
          Submit
        </LoadingButton>
      </Stack>
    </CCModal>
  );
};

export default DoctorScheduleModal;
