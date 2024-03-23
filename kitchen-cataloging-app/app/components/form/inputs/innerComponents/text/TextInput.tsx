import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
export default function TextInput(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      className="h-14"
      InputLabelProps={{
        className: "text-3xl",
      }}
      InputProps={{
        className: "text-3xl",
      }}
      variant="standard"
    />
  );
}
