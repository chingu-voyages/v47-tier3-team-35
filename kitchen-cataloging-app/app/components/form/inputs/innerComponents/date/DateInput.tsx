"use client";
import Box from "@mui/material/Box";
import Label from "../inputLabel/Label";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const DateInput = ({
  value,
  label,
  inputName,
  onChange,
}: {
  value: string;
  label: string;
  inputName: string;
  onChange: (e: string | null) => void;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <Box className="flex flex-col w-full">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Label text={label} active={focused} />
        <DatePicker
          value={value}
          onChange={onChange}
          onOpen={() => setFocused(true)}
          onClose={() => setFocused(false)}
          orientation="portrait"
          name={inputName}
          className="bg-default-sys-light-surface-bright w-full"
          aria-labelledby="date-input-label"
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
        />
      </LocalizationProvider>
    </Box>
  );
};
export default DateInput;
