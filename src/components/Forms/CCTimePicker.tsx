import { SxProps } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { Controller, useFormContext } from "react-hook-form"
interface ITimePickerProps {
    name: string;
    size?: "small" | "medium";
    placeholder?: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
  }
  

const CCTimePicker = ({ name,
    label,
    size = "small",
    required,
    fullWidth = true,
    sx,}: ITimePickerProps) => {
    const {control,formState} = useFormContext()
    const isError = formState.errors[name] !== undefined;

  return (
   <Controller
   name = {name}
   control={control}
   defaultValue={dayjs(new Date().toDateString())} 
   render={({field : {onChange,value,...field}})=> {
    return (
        <LocalizationProvider 
        dateAdapter={AdapterDayjs}>
        <TimePicker
        {...field}
        value={value || Date.now()}
        onChange={(time)=> onChange(time)}
        timezone="system"
        label={label} 
      
        slotProps={{
            openPickerButton: { color: 'primary' },
            textField: {
                required: required,
                fullWidth: fullWidth,
                size: size,
               
                sx: {
                  ...sx,
                },
                variant: "outlined",
                error: isError,
                helperText: isError
                  ? (formState.errors[name]?.message as string)
                  : "",
              },
        }}/>
        </LocalizationProvider>
    
       )
   }}

   />
  )
}

export default CCTimePicker