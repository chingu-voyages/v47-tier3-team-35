import React from "react";
import TextInput from "../../innerComponents/text/TextInput";
import { useTitleInput } from "./TitleProvider";
import { TextFieldProps } from "@mui/material";
export default function TitleInput(props?: Partial<TextFieldProps>) {
  const parsedProps = props || {};
  const defaultProps = {
    label: "Name",
    variant: "standard",
    placeholder: "Item Name",
    name: "title",
  };
  const titleProps = useTitleInput();
  if (!titleProps) return <></>;
  const { error, title, onChange } = titleProps;
  return (
    <TextInput
      id="outlined-start-adornment"
      {...defaultProps}
      {...parsedProps}
      defaultValue={title}
      error={error}
      helperText={error && `${label} is required`}
      onChange={onChange}
    />
  );
}
