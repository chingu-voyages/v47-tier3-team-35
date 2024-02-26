import React from "react";
import TextInput from "../text/TextInput";
import { useTitleInput } from "./TitleProvider";
export default function TitleInput() {
  const titleProps = useTitleInput();
  if (!titleProps) return <></>;
  const { error, title, onChange } = titleProps;
  return (
    <TextInput
      id="outlined-start-adornment"
      label="Name"
      defaultValue={title}
      error={error}
      helperText={error && "Title is required"}
      variant="standard"
      placeholder="Item Name"
      name="title"
      onChange={onChange}
    />
  );
}
