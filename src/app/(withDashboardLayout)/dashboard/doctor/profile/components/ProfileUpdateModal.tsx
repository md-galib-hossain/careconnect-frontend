import CCForm from "@/components/Forms/CCForm";
import CCInput from "@/components/Forms/CCInput";
import CCSelectField from "@/components/Forms/CCSelectField";
import CCFullScreenModal from "@/components/Shared/CCModal/CCFullScreenModal";
import { useUpdateDoctorMutation } from "@/redux/api/doctorsApi";
import { Gender } from "@/types";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import MultipleSelectChip from "./MultipleSelectChip";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorProfileValidationSchema } from "./validation";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doctorData: any;
};

const ProfileUpdateModal = ({ open, setOpen, doctorData }: TProps) => {
  const { data: specialtiesData, isLoading: specialtiesLoading } = useGetAllSpecialtiesQuery({ limit: 100 });
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);

  const allSpecialties = specialtiesData?.data || [];

  useEffect(() => {
    if (!specialtiesData) {
      return;
    }
    setSelectedSpecialtiesIds(
      doctorData?.doctorSpecialties?.map((sp: any) => sp.specialtiesId) || []
    );
  }, [specialtiesData, doctorData?.doctorSpecialties]);

  const submitHandler = async (values: FieldValues) => {
    const specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
      specialtiesId,
      isDeleted: false,
    }));

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "averageRating",
      "review",
      "profilePhoto",
      "registrationNumber",
      "schedules",
      "doctorSpecialties",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => !excludedFields.includes(key as keyof typeof values))
    );

    updatedValues.specialties = specialties;

    try {
      const res = await updateDoctor({ body: updatedValues, id: doctorData.id }).unwrap();
      if (res.id) {
        toast.success("Doctor profile updated");
        setOpen(false);
        console.log(res);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };
console.log(doctorData)
  return (
    <CCFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <CCForm
        onSubmit={submitHandler}
        defaultValues={doctorData}
        resolver={zodResolver(doctorProfileValidationSchema)}
      >
        <Grid container spacing={2} my={2}>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="email"
              type="email"
              label="Email"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="contactNumber"
              label="Contact Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput name="address" label="Address" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="registrationNumber"
              label="Registration Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="experience"
              type="number"
              label="Experience"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCSelectField
              items={Object.values(Gender)}
              name="gender"
              label="Gender"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="appointmentFee"
              type="number"
              label="Appointment Fee"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="qualification"
              label="Qualification"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="currentWorkingPlace"
              label="Current Working Place"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CCInput
              name="designation"
              label="Designation"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <MultipleSelectChip
              allSpecialties={allSpecialties}
              selectedIds={selectedSpecialtiesIds}
              setSelectedIds={setSelectedSpecialtiesIds}
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={updating}>
          {updating ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </CCForm>
    </CCFullScreenModal>
  );
};

export default ProfileUpdateModal;
