import { Box } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { ValueProps } from "./types";
import { determineSelectStyles } from "./determineSelectStyles";
import Label from "../inputLabel/Label";
import { debounce } from "lodash";
import { GroupBase, OptionsOrGroups } from "react-select";
export interface SelectInputProps {
  name?: string;
  label?: string;
  placeholder?: string;
  onChange: (e: ValueProps | null) => void;
  value: ValueProps | null;
  loadOptions: ({
    cursor,
    inputStr,
  }: {
    cursor?: string | null;
    inputStr: string;
  }) => Promise<ValueProps[]>;
}

const SelectInput = ({
  name,
  label,
  value,
  placeholder,
  loadOptions,
  onChange,
}: SelectInputProps) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ValueProps[]>([]);
  const [focus, setFocus] = useState(false);
  const loadingRef = useRef(loading);
  //our function handlers. All of them have their dependencies managed
  //and memoized to prevent unnecessary re-renders given that options
  //can be a large list
  const setLoadingFunc = (val: boolean) => {
    loadingRef.current = val;
    setLoading(val);
  };
  const loadOptionWrapperFunc = async (inputStr: string) => {
    if (loadingRef.current) return null;
    setLoadingFunc(true);
    const result = await loadOptions({
      inputStr,
      cursor: cursor || undefined,
    });
    if (result.length > 0) setCursor(result[result.length - 1].value);
    else setCursor(null);
    setLoadingFunc(false);
    return result;
  };
  const savedLoadOptionsWrapperFunc = useCallback(loadOptionWrapperFunc, [
    loadOptions,
  ]);
  const loadOptionsFunc = (
    inputStr: string,
    callback: (e: OptionsOrGroups<any, GroupBase<any>>) => void
  ) => {
    savedLoadOptionsWrapperFunc(inputStr).then((res) => {
      if (res !== null) {
        setOptions(res);
        callback(res);
      }
    });
  };
  const savedLoadOptionsFunc = useCallback(debounce(loadOptionsFunc, 400), [
    savedLoadOptionsWrapperFunc,
  ]);
  const onMenuScrollToBottom = async () => {
    const results = await savedLoadOptionsWrapperFunc(input);
    if (results === null) return [];
    setOptions((prev) => [...prev, ...results]);
    return results;
  };
  const savedOnMenuScrollToBottom = useCallback(onMenuScrollToBottom, [
    savedLoadOptionsWrapperFunc,
  ]);
  const onInputChange = (e: string) => {
    setInput(e);
  };
  const savedOnInputChange = useCallback(onInputChange, []);
  return (
    <Box className="flex flex-col relative w-full">
      {label && <Label text={label || ""} active={focus} />}
      <AsyncSelect
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        cacheOptions
        defaultOptions
        isLoading={loading}
        loadOptions={savedLoadOptionsFunc}
        options={options}
        onMenuScrollToBottom={savedOnMenuScrollToBottom}
        name={name}
        value={value}
        placeholder={placeholder}
        onInputChange={savedOnInputChange}
        classNames={determineSelectStyles}
        onChange={onChange}
      />
    </Box>
  );
};
export default SelectInput;
