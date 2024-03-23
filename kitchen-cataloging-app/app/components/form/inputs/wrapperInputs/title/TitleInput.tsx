import React from "react";
import TextInput from "../../innerComponents/text/TextInput";
import { useTitleInput } from "./TitleProvider";
import { TextFieldProps } from "@mui/material";
export default function TitleInput(props?: Partial<TextFieldProps>) {
  const parsedProps = props || {};
  const inputProps: Partial<TextFieldProps> = {
    label: "Name",
    variant: "standard",
    placeholder: "Item Name",
    name: "title",
    ...parsedProps,
  };
  const titleProps = useTitleInput();
  if (!titleProps) return <></>;
  const { error, title, onChange } = titleProps;
  return (
    <TextInput
      id="outlined-start-adornment"
      {...inputProps}
      defaultValue={title}
      error={error}
      helperText={error && `${inputProps.label} is required`}
      onChange={onChange}
    />
  );
}
