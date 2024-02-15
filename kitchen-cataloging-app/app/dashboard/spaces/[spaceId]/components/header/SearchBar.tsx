"use client";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Food } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { searchFoodItems } from "../../actions/actions";
import { unstable_batchedUpdates } from "react-dom";
import useWindowWidth from "@/hooks/useWindowWidth";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { v4 as uuidv4 } from "uuid";
import useDebouncedInput from "@/hooks/useDebouncedInput";
import { SearchBarListItem } from "./SearchBarListItem";
export const SearchIconLoading = () => {
  const mediumWidth = useWindowWidth(768);
  const largeWidth = useWindowWidth(1080);
  return (
    <CircularProgress
      size={largeWidth ? "1.75rem" : mediumWidth ? "1.5rem" : "1.375rem"}
      className="text-default-sys-light-on-surface-variant"
    />
  );
};
export function SearchBar({ spaceId }: { spaceId?: string }) {
  const [value, setValue] = useState<Partial<Food> | null>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Partial<Food>[]>([]);
  const [inputValue, debouncedValue, setNewInputValue] = useDebouncedInput(350);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    //we update this so we dont have stale data
    if (debouncedValue.trim().length < 4) return setOptions([]);
  }, [debouncedValue]);
  useEffect(() => {
    //we use ref because state updates are sync and take too much time
    //however, ref updates are synchronous
    const setLoadingState = (val: boolean) => {
      loadingRef.current = val;
      setLoading(val);
    };
    //perform our search actions
    (async () => {
      if (!spaceId) return setLoadingState(false);
      if (debouncedValue.trim().length < 4) return setLoadingState(false);
      if (loadingRef.current) return;
      else setLoadingState(true);
      const results = await searchFoodItems({
        take: 20,
        spaceId: spaceId,
        text: debouncedValue,
      });
      if (!mounted.current) return;
      unstable_batchedUpdates(() => {
        if (!mounted.current) return;
        setLoadingState(false);
        setOptions((prev) => {
          if (results) return results;
          else return prev;
        });
      });
    })();
  }, [debouncedValue, spaceId]);
  return (
    <Autocomplete
      className="flex items-center flex-grow"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      autoComplete
      getOptionLabel={(option) => option.id || uuidv4()}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      // onChange={(event, newValue) => {
      //   unstable_batchedUpdates(() => {
      //     setOptions(
      //       newValue
      //         ? [newValue, ...options.filter((e) => e.id !== e.id)]
      //         : options
      //     );
      //     setValue(newValue);
      //   });
      // }}
      onInputChange={(event, newInputValue, reason) => {
        if (reason === "reset") return;
        setNewInputValue(newInputValue);
      }}
      noOptionsText="No matching items found in inventory"
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            <SearchBarListItem option={option} />
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            value: inputValue,
            className:
              "py-0 pl-0 pr-1.5 lg:pr-2 text-default-sys-light-on-surface-variant",
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            shrink: false,
            className:
              "pl-4 flex items-center border-none text-2xl md:text-3xl lg:text-4xl h-full transform-none text-default-sys-light-on-surface-variant",
          }}
          InputProps={{
            ...params.InputProps,
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
          label={inputValue === "" ? "Search your inventory" : ""}
          fullWidth
        />
      )}
    />
  );
}
