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
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoctorInformation from "./components/DoctorInformations";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const Profile = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { data, isLoading } = useGetMyProfileQuery({});
  const [updateMyProfile, { isLoading: updateIsLoading }] =
    useUpdateMyProfileMutation();

  console.log(data);
  const fileUploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    await updateMyProfile(formData);
  };
  if (isLoading) {
    <Box display="flex" justifyContent="center" p={10}>
      <CircularProgress />
    </Box>;
  }
  return (
    <>
      {!isLoading ? (
        <Container>
          <ProfileUpdateModal
            open={isProfileModalOpen}
            setOpen={setIsProfileModalOpen}
            id={data?.id}
          />
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
                    alt="Doctor Image"
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
              <DoctorInformation data={data} />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box display="flex" justifyContent="center" p={10}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Profile;
