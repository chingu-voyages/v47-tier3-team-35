"use client";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Food } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { searchFoodItems } from "../../actions";
import { unstable_batchedUpdates } from "react-dom";
import useWindowWidth from "@/hooks/useWindowWidth";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Link from "next/link";
export function SearchBar({ spaceId }: { spaceId?: string }) {
  const [value, setValue] = useState<Partial<Food> | null>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Partial<Food>[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const mounted = useRef(true);
  const mediumWidth = useWindowWidth(768);
  const largeWidth = useWindowWidth(1080);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    //we use ref because state updates are sync and take too much time
    //ref updates are synchronous however
    const setLoadingState = (val: boolean) => {
      mounted.current = val;
      setLoading(val);
    };
    const searchItems = async () => {
      if (!open) return;
      if (!spaceId) return setLoadingState(false);
      if (inputValue.trim().length < 4) return setLoadingState(false);
      if (loadingRef.current) return;
      else setLoadingState(true);
      const results = await searchFoodItems({
        take: 20,
        spaceId: spaceId,
        text: inputValue,
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
    };
    searchItems();
  }, [open, inputValue, spaceId]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
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
      getOptionLabel={(option) => `${option.title} in ${option.roomTitle}`}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        unstable_batchedUpdates(() => {
          setOptions(
            newValue
              ? [newValue, ...options.filter((e) => e.id !== e.id)]
              : options
          );
          setValue(newValue);
        });
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      noOptionsText="No matching items found in inventory"
      renderOption={(props, option) => {
        return (
          <Link href={`dashboard/spaces/${option.roomId}/${option.id}`}>
            <Typography>{option.title}</Typography>
          </Link>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
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
                  <CircularProgress
                    size={
                      largeWidth
                        ? "1.75rem"
                        : mediumWidth
                        ? "1.5rem"
                        : "1.375rem"
                    }
                    className="text-default-sys-light-on-surface-variant"
                  />
                ) : (
                  <SearchOutlinedIcon className="text-6xl md:text-7xl lg:text-8xl text-default-sys-light-on-surface-variant" />
                )}
              </>
            ),
          }}
          sx={{
            fieldset: { border: "none" },
          }}
          label={params.inputProps.value === "" ? "Search your inventory" : ""}
          fullWidth
        />
      )}
    />
  );
}
