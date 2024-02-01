"use client";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Food, Room } from "@prisma/client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Link from "next/link";
export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Food[]>([]);
  const mediumWidth = useWindowWidth(768);
  const largeWidth = useWindowWidth(1080);
  const loading = open && options.length === 0;
  useEffect(() => {
    let active = true;

    if (!loading) return;

    // (async () => {
    //   await sleep(1e3); // For demo purposes.

    //   if (active) {
    //     setOptions([...topFilms]);
    //   }
    // })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Autocomplete
      className="flex items-center flex-grow"
      open={open}
      //   onFocus={() => {
      //     setOnFocus(true);
      //   }}
      //   onBlur={() => {
      //     setOnFocus(false);
      //   }}
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
