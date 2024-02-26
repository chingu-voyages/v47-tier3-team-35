import { Box } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { ValueProps } from "./types";
import { determineSelectStyles } from "./determineSelectStyles";
export interface SelectInputProps {
  name?: string;
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
  value,
  placeholder,
  loadOptions,
  onChange,
}: SelectInputProps) => {
  const [cursor, setCursor] = useState<string | null>(null);
  // const [value, setValue] = useState(defaultValue || null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ValueProps[]>([]);
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
  const loadOptionsFunc = async (inputStr: string) => {
    const result = await savedLoadOptionsWrapperFunc(inputStr);
    if (result === null) return [];
    setOptions(result);
    return result;
  };
  const savedLoadOptionsFunc = useCallback(loadOptionsFunc, [
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

  const onInputChange = (e: string) => setInput(e);
  const savedOnInputChange = useCallback(onInputChange, []);

  return (
    <Box className="flex flex-col relative w-full">
      <AsyncSelect
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
