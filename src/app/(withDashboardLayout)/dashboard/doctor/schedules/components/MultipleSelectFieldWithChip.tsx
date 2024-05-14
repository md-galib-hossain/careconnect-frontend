import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { timeFormatter } from "@/utils/timeFormatter";

type TProps = {
  setSelectedScheduleIds: any;
  schedules: any;
  selectedScheduleIds: string[];
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectFieldWithChip({
  setSelectedScheduleIds,
  schedules,
  selectedScheduleIds,
}: TProps) {

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedScheduleIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    
      <FormControl sx={{  width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Slot</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedScheduleIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value : any) => {
                const selectedSchedule = schedules.find(
                  (schedule: any) => schedule?.id === value
                );
                if (!selectedSchedule) return null;
                const formattedTimeSlot = `${timeFormatter(
                  selectedSchedule.startDateTime
                )} - ${timeFormatter(selectedSchedule.endDateTime)}`;

                return <Chip key={value} label={formattedTimeSlot} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {schedules
            ?.map((schedule: any) => (
              <MenuItem key={schedule.id} value={schedule.id}>
                {`${timeFormatter(schedule.startDateTime)} - ${timeFormatter(
                  schedule.endDateTime
                )}`}
              </MenuItem>
            ))
            .reverse()}
        </Select>
      </FormControl>
  
  );
}
