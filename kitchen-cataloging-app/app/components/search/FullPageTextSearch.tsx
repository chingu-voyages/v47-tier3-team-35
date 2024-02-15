"use client";
import { SearchIconLoading } from "@/dashboard/spaces/[spaceId]/components/header/SearchBar";
import useDebouncedInput from "@/hooks/useDebouncedInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
const FullPageTextSearch = ({
  placeholder,
  searchFunc,
}: {
  placeholder?: string;
  searchFunc: (value: string) => Promise<void>;
}) => {
  const [inputValue, debouncedValue, setNewInputValue] = useDebouncedInput(350);
  const [loading, setLoading] = useState(false);
  const onChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    setNewInputValue(target.value);
  };
  //search for new value;
  useEffect(() => {
    setLoading(true);
    searchFunc(debouncedValue).then(() => {
      setLoading(false);
    });
    //eslint-disable-next-line
  }, [debouncedValue]);
  return (
    <TextField
      className="w-auto grow"
      inputProps={{
        onChange: onChange,
        value: inputValue,
        className:
          "py-0 pl-0 pr-1.5 lg:pr-2 text-default-sys-light-on-surface-variant",
      }}
      InputLabelProps={{
        shrink: false,
        className:
          "pl-4 flex items-center border-none text-2xl md:text-3xl lg:text-4xl h-full transform-none text-default-sys-light-on-surface-variant",
      }}
      InputProps={{
        className:
          "flex-grow py-3 px-2.5  text-2xl md:py-3.5 md:px-3 lg:px-4 lg:py-[1.125rem] md:text-3xl lg:text-4xl rounded-full bg-default-sys-light-surface-dim border-none",
        endAdornment: (
          <>
            {loading ? (
              <SearchIconLoading />
            ) : (
              <SearchOutlinedIcon className="text-6xl md:text-7xl lg:text-8xl text-default-sys-light-on-surface-variant" />
            )}
          </>
        ),
      }}
      sx={{
        fieldset: { border: "none" },
      }}
      label={inputValue === "" ? placeholder || "" : ""}
      fullWidth
    />
  );
};
export default FullPageTextSearch;
