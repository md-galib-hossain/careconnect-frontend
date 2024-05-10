"use client";

import { Box, Button, Stack, TextField } from "@mui/material"
import SpecialtyModal from "../specialties/components/SpecialtyModal"
import { useState } from "react";
import ScheduleModal from "./components/ScheduleModal";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Box>
  <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>
          Create Schedules
        </Button>
        <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Schedules" />
      </Stack>
<Box my={5}>
Display Schedule
</Box>

    </Box>
  )
}

export default SchedulesPage