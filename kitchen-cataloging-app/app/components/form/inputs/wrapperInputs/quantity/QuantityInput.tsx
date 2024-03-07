import React from "react";
import TextInput from "../../innerComponents/text/TextInput";
import { useQuantityInput } from "./QuantityProvider";
import { InputAdornment } from "@mui/material";
export default function QuantityInput({
  type = "add",
}: {
  type?: "add" | "remove";
}) {
  const quantityProps = useQuantityInput();
  if (!quantityProps) return <></>;
  const { error, quantity, onChange } = quantityProps;
  return (
    <TextInput
      id="outlined-start-adornment"
      label={`Quantity ${type === "add" ? "added" : "removed"}`}
      placeholder={`0`}
      value={quantity}
      onChange={onChange}
      error={error}
      helperText={error && "Quantity is required and must be an integer"}
      name="Quantity"
      type="number"
      InputProps={{
        endAdornment: <InputAdornment position="end">c</InputAdornment>,
        inputProps: {
          step: 1,
        },
      }}
    />
  );
}
