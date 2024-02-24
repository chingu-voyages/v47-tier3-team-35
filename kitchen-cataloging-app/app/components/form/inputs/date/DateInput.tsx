"use client";
import Box from "@mui/material/Box";
import Label from "../label/Label";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const DateInput = ({
  defaultDate,
  inputName,
}: {
  defaultDate?: Date;
  inputName: string;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <Box className="flex flex-col w-full">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Label text="Expiration Date" active={focused} />
        <DatePicker
          onOpen={() => setFocused(true)}
          slotProps={{
            textField: {
              helperText: "",
              onFocus: () => setFocused(true),
              onBlur: () => setFocused(false),
            },
            openPickerButton: {
              className: focused ? "text-default-sys-light-primary" : "",
            },
          }}
          orientation="portrait"
          name={inputName}
          defaultValue={defaultDate?.toString() || new Date().toString()}
          className="bg-default-sys-light-surface-bright w-full"
          aria-labelledby="date-input-label"
        />
      </LocalizationProvider>
    </Box>
  );
};
export default DateInput;
