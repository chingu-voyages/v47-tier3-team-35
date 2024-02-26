import { useState } from "react";
import Creatable from "react-select/creatable";
import { Box } from "@mui/material";
import { itemLabels } from "@/data/labels";
import Label from "../inputLabel/Label";
import { determineSelectStyles } from "./determineSelectStyles";
import { MultiValue } from "react-select";
import { ValueProps } from "./types";
interface SelectMultiInputProps {
  onChange?: (val: MultiValue<ValueProps>) => void;
  name?: string;
  label?: string;
  value?: string[];
}

export const convertToSelectOptions = (arr: string[]) => {
  return arr.map((val) => ({
    value: val,
    label: val,
  }));
};
const SelectMultiInput = ({
  value,
  onChange,
  name,
  label,
}: SelectMultiInputProps) => {
  const [focus, setFocus] = useState(false);
  const stringifiedValue = JSON.stringify(value || []);
  //stringified labels
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
        value={convertToSelectOptions(value || [])}
        options={convertToSelectOptions(itemLabels)}
        placeholder="Type or select a label"
        classNames={determineSelectStyles}
        onChange={onChange}
      />
      <input
        aria-label="hidden"
        className="invisible w-0 h-0 absolute -z-10 p-0 m-0"
        value={stringifiedValue}
        onChange={() => {}}
        name={name}
      />
    </Box>
  );
};

export default SelectMultiInput;
