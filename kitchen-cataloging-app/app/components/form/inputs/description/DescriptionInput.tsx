import React from "react";
import TextInput from "../text/textInput";
import { useDescriptionInput } from "./DescriptionProvider";
export default function DescriptionInput() {
  const DescriptionProps = useDescriptionInput();
  if (!DescriptionProps) return <></>;
  const { error, description, onChange } = DescriptionProps;
  return (
    <TextInput
      id="outlined-start-adornment"
      label="Description"
      placeholder="Item Description"
      defaultValue={description}
      error={error}
      helperText={error && "Description is required"}
      name="description"
      onChange={onChange}
    />
  );
}
