import React from "react";
import { useSpaceInput } from "./SpaceProvider";
import SelectInput from "../../innerComponents/select/SelectInput";
import { Box } from "@mui/material";
import Label from "../../innerComponents/inputLabel/Label";

export default function SpaceInput() {
  const props = useSpaceInput();
  if (!props) return <></>;
  const { onChange, space } = props;
  return (
    <Box className="flex w-full flex-col">
      <SelectInput
        label="Item Location"
        onChange={onChange}
        value={space}
        name="space"
        placeholder="Choose Space"
        loadOptions={async () => []}
      />
    </Box>
  );
}
