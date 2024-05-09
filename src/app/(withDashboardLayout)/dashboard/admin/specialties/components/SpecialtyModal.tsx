import CCFileUploader from "@/components/Forms/CCFileUploader";
import CCForm from "@/components/Forms/CCForm";
import CCInput from "@/components/Forms/CCInput";
import CCModal from "@/components/Shared/CCModal/CCModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, CircularProgress, Grid } from "@mui/material";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpecialtyModal = ({ open, setOpen }: TOpenProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    const res = await createSpecialty(data).unwrap();

    if (res?.id) {
      toast.success("Specialty created successfully!");
      setOpen(!open);
    }
    try {
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  return (
    <CCModal open={open} setOpen={setOpen} title="Create a new Specialty">
      <CCForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <CCInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <CCFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </CCForm>
    </CCModal>
  );
};

export default SpecialtyModal;
