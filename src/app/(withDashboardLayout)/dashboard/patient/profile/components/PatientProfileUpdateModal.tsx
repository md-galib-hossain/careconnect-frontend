"use client"
import CCForm from "@/components/Forms/CCForm";
import CCInput from "@/components/Forms/CCInput";
import CCFullScreenModal from "@/components/Shared/CCModal/CCFullScreenModal";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientProfileValidationSchema } from "./validation";
import { useUpdatePatientMutation } from "@/redux/api/patientApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientData: any;
};

const PatientProfileUpdateModal = ({ open, setOpen, patientData }: TProps) => {
  const [updatePatient, { isLoading: updating }] = useUpdatePatientMutation();
  console.log(patientData);
  const submitHandler = async (values: FieldValues) => {
    
    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needsPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "profilePhoto",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => !excludedFields.includes(key as keyof typeof values))
    );
console.log(updatedValues)
    try {
      const res = await updatePatient({ body: updatedValues, id: patientData.id }).unwrap();
      if (res.id) {
        toast.success("Patient profile updated");
        setOpen(false);
        console.log(res);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };
console.log(patientData)
  return (
    <CCFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      {patientData && (
        <CCForm
          onSubmit={submitHandler}
          defaultValues={patientData}
          // resolver={zodResolver(patientProfileValidationSchema)}
        >
          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={12} md={4}>
              <CCInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
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
              <CCInput
                name="address"
                label="Address"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type="submit" disabled={updating}>
            {updating ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </CCForm>
      )}
    </CCFullScreenModal>
  );
};

export default PatientProfileUpdateModal;
