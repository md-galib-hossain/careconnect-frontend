import CCDatePicker from "@/components/Forms/CCDatePicker";
import CCForm from "@/components/Forms/CCForm";
import CCTimePicker from "@/components/Forms/CCTimePicker";
import CCModal from "@/components/Shared/CCModal/CCModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Box, Button, Grid } from "@mui/material";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScheduleModal = ({ open, setOpen }: TOpenProps) => {
  const [createSchedule,{isLoading:creating}] = useCreateScheduleMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    try {
      console.log(values)
      const res = await createSchedule(values).unwrap();
      console.log(res)
      if (res?.length) {
        toast.success("Schedules created successfully!");
        setOpen(false);
      }
      else{
        toast.info("Couldn't create the schedules")
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  return (
    <CCModal open={open} setOpen={setOpen} title="Create Schedule">
      <CCForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ width: "400px" }}>
          <Grid item md={6}>
            <CCDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={6}>
            <CCDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <CCTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <CCTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Box>
          <Button disabled={creating} fullWidth sx={{ mt: 1 }} type="submit">
            Create
          </Button>
        </Box>
      </CCForm>
    </CCModal>
  );
};

export default ScheduleModal;
