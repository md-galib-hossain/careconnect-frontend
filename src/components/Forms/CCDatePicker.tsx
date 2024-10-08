import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  allowPastDates?: boolean; // New optional prop
}

const CCDatePicker = ({
  name,
  size = "small",
  label,
  required,
  fullWidth = true,
  sx,
  allowPastDates = false, // Default to false
}: IDatePicker) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              timezone="system"
              disablePast={!allowPastDates} // Control disabling past dates
              onChange={(date) => onChange(date)}
              {...field}
              value={value || dayjs()} // Use dayjs() for current date
              slotProps={{
                openPickerButton: { color: 'primary' },
                textField: {
                  required: required,
                  size: size,
                  sx: { 
                    ...sx 
                  },
                  variant: "outlined",
                  fullWidth: fullWidth,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default CCDatePicker;
