"use client";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/myProfile";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PatientProfileUpdateModal from "./components/PatientProfileUpdateModal";
import PatientInformation from "./components/PatientInformation";

const PatientProfile = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { data, isLoading } = useGetMyProfileQuery({});
  const [updateMyProfile, { isLoading: updateIsLoading }] =
    useUpdateMyProfileMutation();

  const fileUploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    await updateMyProfile(formData);
  };

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center" p={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Container>
          {data?.id && (
            <PatientProfileUpdateModal
              open={isProfileModalOpen}
              setOpen={setIsProfileModalOpen}
              patientData={data}
            />
          )}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid xs={12} md={4}>
              <Box
                sx={{
                  height: 200,
                  mb: 2,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 1,
                }}
              >
                {data?.profilePhoto && (
                  <Image
                    height={300}
                    width={400}
                    src={data?.profilePhoto}
                    alt="Patient Image"
                  />
                )}
              </Box>
              {updateIsLoading ? (
                <p>uploading...</p>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Choose your Profile Photo"
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant="text"
                  sx={{
                    width: "100%",
                  }}
                />
              )}
              <Box mt={1}>
                <Button
                  fullWidth
                  endIcon={<ModeEditIcon />}
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  Edit Profile
                </Button>
              </Box>
            </Grid>
            <Grid xs={12} md={8}>
              <PatientInformation data={data} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default PatientProfile;
