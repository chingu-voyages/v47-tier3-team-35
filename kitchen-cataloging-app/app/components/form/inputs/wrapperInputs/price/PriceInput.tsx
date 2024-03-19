import React from "react";
import TextInput from "../../innerComponents/text/TextInput";
import { InputAdornment } from "@mui/material";
import { usePriceInput } from "./PriceProvider";
export default function PriceInput({
  label,
  placeholder,
}: {
  label?: string;
  placeholder?: string;
}) {
  const priceProps = usePriceInput();
  if (!priceProps) return <></>;
  const { error, price, onChange } = priceProps;
  return (
    <TextInput
      id="outlined-start-adornment"
      label={label || "Price"}
      placeholder={placeholder || "Item Price"}
      value={price}
      error={error}
      helperText={
        error && "Price is required and must be formatted correctly (X.XX)"
      }
      name="price"
      type="number"
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
        inputProps: {
          step: 0.01,
        },
      }}
      onChange={onChange}
    />
  );
}
