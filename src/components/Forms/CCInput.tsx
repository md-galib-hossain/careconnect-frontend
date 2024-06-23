import { SxProps, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

type TInputProps = {
    name : string;
    label? : string;
    type? : string;
    variant? : string;
    size? : "small" | "medium";
    fullWidth? : boolean;
    sx? : SxProps;
    placeholder?:string;
    required? : boolean
    multiline?: boolean;
    rows?: number;
}
const CCInput = ({name,label,type = "text",size = "small",fullWidth,sx,placeholder,required,multiline = false,
  rows} : TInputProps) => {
    const {control} = useFormContext()
  return (
    <Controller
        control={control}
        name={name}
        render={({ field,fieldState:{error} }) => (

          //input field
         <TextField
         {...field}
         label={label}
         type={type ? type : "text"}
         variant="outlined"
         size={size}
         fullWidth={fullWidth}
         sx={{...sx}}
         placeholder={placeholder ? placeholder : label}
         required={required}
         error={!!error?.message} //it will confirm if there is error & its recieve only boolean
         helperText={error?.message} //showing error text
         multiline={multiline}
         rows={multiline ? rows : undefined}
         />
        )}
      />
  )
}

export default CCInput