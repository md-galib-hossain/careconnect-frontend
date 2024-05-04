import { TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

type TInputProps = {
    name : string;
    label? : string;
    type? : string;
    variant? : string;
    size? : "small" | "medium";
    fullWidth? : boolean
}
const CCInput = ({name,label,type = "text",size = "small",fullWidth} : TInputProps) => {
    const {control} = useFormContext()
  return (
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
         <TextField
         {...field}
         label={label}
         type={type ? type : "text"}
         variant="outlined"
         size={size}
         fullWidth={fullWidth}
         />
        )}
      />
  )
}

export default CCInput