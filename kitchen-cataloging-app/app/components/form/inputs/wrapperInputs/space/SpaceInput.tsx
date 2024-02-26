import React from "react";
import { useSpaceInput } from "./SpaceProvider";
import SelectInput from "../../innerComponents/select/SelectInput";

export default function SpaceInput() {
  const props = useSpaceInput();
  if (!props) return <></>;
  const { onChange, space } = props;
  return (
    <SelectInput
      onChange={onChange}
      value={space}
      name="space"
      placeholder="Choose Space"
      loadOptions={async () => []}
    />
  );
}
