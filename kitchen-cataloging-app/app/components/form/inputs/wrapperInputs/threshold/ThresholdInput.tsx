import React from "react";
import SliderInput from "../../innerComponents/slider/SliderInput";
import { useThresholdInput } from "./ThresholdProvider";
export default function ThresholdInput() {
  const props = useThresholdInput();
  if (!props) return <></>;
  const { threshold, onChange } = props;
  return (
    <SliderInput
      value={threshold}
      onChange={onChange}
      label="Reminder Threshold"
      name="threshold"
    />
  );
}
