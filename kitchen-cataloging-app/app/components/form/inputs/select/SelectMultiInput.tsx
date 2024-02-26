import { useState } from "react";
import Creatable from "react-select/creatable";
import { Box } from "@mui/material";
import { itemLabels } from "@/data/labels";
import { unstable_batchedUpdates } from "react-dom";
import Label from "../label/Label";
import { determineSelectStyles } from "./determineSelectStyles";
interface SelectMultiInputProps {
  defaultValues?: string[];
  handleValues?: (val: string[]) => void;
  name?: string;
  label?: string;
}

export const convertToSelectOptions = (arr: string[]) => {
  return arr.map((val) => ({
    value: val,
    label: val,
  }));
};
const SelectMultiInput = ({
  defaultValues,
  handleValues,
  name,
  label,
}: SelectMultiInputProps) => {
  const [labels, setLabels] = useState(defaultValues || []);
  const [focus, setFocus] = useState(false);
  //stringified labels
  const [labelsStr, setLabelsStr] = useState(JSON.stringify([]));
  return (
    <Box className="flex flex-col relative w-full">
      <Label text={label || ""} active={focus} />
      <Creatable
        isClearable
        isMulti
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        value={convertToSelectOptions(labels)}
        options={convertToSelectOptions(itemLabels)}
        placeholder="Type or select a label"
        classNames={determineSelectStyles}
        onChange={(e) => {
          const newLabels = e.map((val) => val.value);
          unstable_batchedUpdates(() => {
            setLabels(newLabels);
            setLabelsStr(JSON.stringify(newLabels));
            if (handleValues) handleValues(newLabels);
          });
        }}
      />
      <input
        aria-label="hidden"
        className="invisible w-0 h-0 absolute -z-10 p-0 m-0"
        value={labelsStr}
        onChange={() => {}}
        name={name}
      />
    </Box>
  );
};

export default SelectMultiInput;
