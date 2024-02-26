import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
export default function TextInput(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      className="h-14"
      variant="standard"
    />
  );
}
