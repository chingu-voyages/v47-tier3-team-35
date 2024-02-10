'use client'
import React, { useEffect } from "react";
import { MouseEvent, useState, useRef } from "react";

import { Box, Typography, InputLabel, FormControl, Select, TextField, MenuItem, Slider, InputAdornment, Button, IconButton, Input } from "@mui/material";
import CustomSelect from "./CustomSelect";
import Close from "@mui/icons-material/Close";

import { FoodType } from "@/prisma/mock/mockData";

import './customstyles.css';
import DragDrop from "../DragDrop";

interface FormInputs {
  type: "create" | "edit";
    spaces: string[];
    handleForm: (formData: FormData) => void;
    onClose: () => void;
  itemData?: FoodType;
}

const FormInputs = ({ type, spaces, handleForm, onClose, itemData }: FormInputs) => {
    
  // Space
  const [space, setSpace] = useState(itemData?.roomTitle ? itemData?.roomTitle : '')
  const handleSpace = (val: string) => {
    setSpace(val)
  }

  // Image 
  const [file, setFile] = useState<File | null>(null);
  const handleImage = (file: File) => {
    setFile(file);
  }

  // Labels
  const handleDeleteLabel = (val: string) => {
    console.log(`delete ${val}`)
  }

  const marks = new Array(10).fill(0).map((val, i) => (
      {
          value: i + 1,
      }
  ))

  return (
    <form
      action=""
      className="p-10 flex flex-col bg-default-sys-light-surface-container-low"
    >
      {/* Heading */}

      <section className="modal-header w-full flex pb-10">
        <Box className="flex flex-col gap-8">
          <Typography
            className="text-default-sys-light-on-surface"
            variant="h2"
          >
            {`${type.slice(0, 1).toUpperCase()}${type.slice(1)}`} Item
          </Typography>
          <CustomSelect
            space={space}
            spaces={spaces}
            handleSpace={handleSpace}
          />
        </Box>
      </section>

      {/* Main */}
      <section className="modal-main h-full flex flex-col gap-8 md:gap-16 md:flex-row">
        {/* Left Section (desktop) */}
        <Box className="h-full w-full flex flex-col gap-8 md:gap-0">
          <TextField
            className="h-14 mb-12"
            id="outlined-start-adornment"
            label="Name"
            defaultValue={itemData?.title}
            helperText=""
            variant="standard"
            placeholder="Item Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <Box className="flex-grow border">
            <DragDrop handleImage={handleImage}/>
            {/* <DragDrop></DragDrop> */}
            <Input
              className="hidden"
              type="file"
              name="image"
              value={file}
              onChange={() => console.log("file changed")}
              inputProps={{ accept: "image/png, image/jpeg" }}
            />
          </Box>
          <Box className="hidden h-14 md:block"></Box>
        </Box>

        {/* Right Section (desktop) */}
        <Box className="h-full w-full flex flex-col justify-between gap-8 md:gap-5">
          <TextField
            className="h-14"
            id="outlined-start-adornment"
            label="Description"
            placeholder="Item Description"
            defaultValue={itemData?.description}
            helperText=""
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <TextField
            className="h-14"
            id="outlined-start-adornment"
            label="Price"
            placeholder="Item Price"
            defaultValue={itemData?.price}
            helperText=""
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <Box>
            <Typography id="threshold-input-label" gutterBottom>
              Threshold
            </Typography>
            <Slider
              aria-labelledby="threshold-input-label"
              aria-label="Always visible"
              defaultValue={5}
              // getAriaValueText={valuetext}
              step={1}
              min={0}
              max={10}
              marks
              valueLabelDisplay="on"
            />
          </Box>
          <Box>
            <Box className="flex flex-row px-4 gap-4 w-full items-start">
              <Typography
                variant="button"
                sx={{ textTransform: "unset", fontWeight: "unset" }}
                id="labels-input-label"
                gutterBottom
              >
                Labels
              </Typography>
              {["oo", "sss", "dsfdsf"].map((labelText, i) => (
                <Box className="bg-default-sys-light-outline-variant rounded-full px-2 py-1 flex flex-row items-center">
                  <IconButton className="p-0">
                    <Close
                      className="text-default-sys-light-on-surface text-xs"
                      onClick={() => {
                        handleDeleteLabel(labelText);
                      }}
                    />
                  </IconButton>
                  <Typography
                    className="leading-none"
                    variant="button"
                    sx={{ textTransform: "unset", fontWeight: "unset" }}
                  >
                    {labelText}
                  </Typography>
                </Box>
              ))}
            </Box>
            <TextField
              className="bg-default-sys-light-surface-bright"
              aria-labelledby="labels-input-label"
              fullWidth
              id="standard-helperText"
              label=""
              placeholder="Add Label"
              defaultValue={itemData?.labels}
              helperText=""
              hiddenLabel
            />
          </Box>
          <Box>
            <Typography
              variant="button"
              sx={{ textTransform: "unset", fontWeight: "unset" }}
              id="date-input-label"
              gutterBottom
            >
              Expiration Date
            </Typography>
            <TextField
              className="bg-default-sys-light-surface-bright"
              aria-labelledby="date-input-label"
              fullWidth
              id="standard-helperText"
              label=""
              placeholder="mm/dd/yyyy"
              helperText=""
              type="date"
              hiddenLabel
            />
          </Box>
          <Box className="flex flex-row justify-end gap-4">
            <Button
              className="rounded-full"
              variant="outlined"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button className="rounded-full" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </section>
    </form>
  );
}

export default FormInputs
