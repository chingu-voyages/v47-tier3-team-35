import React from "react";
import SelectMultiInput from "../../innerComponents/select/SelectMultiInput";
import { useLabelsInput } from "./LabelsProvider";

export default function LabelsInput() {
  const props = useLabelsInput();
  if (!props) return <></>;
  const { onChange, labels } = props;
  return (
    <SelectMultiInput
      onChange={onChange}
      value={labels}
      name="labels"
      label="Labels"
    />
  );
}
