import CCDatePicker from "@/components/Forms/CCDatePicker";
import CCFileUploader from "@/components/Forms/CCFileUploader";
import CCForm from "@/components/Forms/CCForm";
import CCInput from "@/components/Forms/CCInput";
import CCTimePicker from "@/components/Forms/CCTimePicker";
import CCModal from "@/components/Shared/CCModal/CCModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { modifyPayload } from "@/utils/modifyPayload";
import { timeFormatter } from "@/utils/timeFormatter";
import { Box, Button, CircularProgress, Grid } from "@mui/material";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScheduleModal = ({ open, setOpen }: TOpenProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    // const res = await createSpecialty(data).unwrap();

    // if (res?.id) {
    //   toast.success("Schedule created successfully!");
    //   setOpen(!open);
    // }
    try {
      values.startDate = dateFormatter(values.startDate)
      values.endDate = dateFormatter(values.endDate)
      values.startTime = timeFormatter(values.startTime)
      values.endTime = timeFormatter(values.endTime)
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  return (
    <CCModal open={open} setOpen={setOpen} title="Create Schedule">
      <CCForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ width : "400px"}}>
          <Grid item md={6}>
            <CCDatePicker name="startDate" label="Start Date"/>
          </Grid>
          <Grid item md={6}>
            <CCDatePicker name="endDate" label="End Date"/>
          </Grid>
          <Grid item md={6}>
            <CCTimePicker name="startTime" label="Start Time"/>
          </Grid>
          <Grid item md={6}>
            <CCTimePicker name="endTime" label="End Time"/>
          </Grid>
        </Grid>
        <Box>

        <Button fullWidth sx={{ mt: 1 }} type="submit">
          Create
        </Button>
        </Box>
      </CCForm>
    </CCModal>
  );
};

export default ScheduleModal;
