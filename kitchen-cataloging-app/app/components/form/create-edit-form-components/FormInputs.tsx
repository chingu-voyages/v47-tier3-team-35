'use client'
import React, { useEffect } from "react";
import { MouseEvent, useState, useRef } from "react";

import { Box, Typography, InputLabel, FormControl, Select, TextField, MenuItem, Slider, InputAdornment, Button, IconButton, Input } from "@mui/material";
import CustomSelect from "./CustomSelect";
import Close from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ChangeEvent } from "react";

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

  const [hoverImage, setHoverImage] = useState(
    "bg-default-sys-light-surface-container-high"
  );

  // Labels
  const [addingLabel, setAddingLabel] = useState(false)

  const handleAddLabel = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== '') {
      setAddingLabel(true)
    }
    else {
      setAddingLabel(false)
    }
  };
  const handleDeleteLabel = (val: string) => {
    console.log(`delete ${val}`)
  }

  const marks = new Array(10).fill(0).map((val, i) => (
      {
          value: i + 1,
      }
  ))

  return (
    <>
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
        {/* Title */}
        <Box className="h-full w-full flex flex-col gap-8 md:gap-0">
          <TextField
            className="h-14 mb-12"
            id="outlined-start-adornment"
            label="Name"
            defaultValue={itemData?.title}
            helperText=""
            variant="standard"
            placeholder="Item Name"
            name="title"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />

          {/* Image  */}

          <Box className="flex-grow relative">
            <Box className="absolute top-[12px] right-[12px] flex flex-row gap-5 z-50">
              <IconButton className="p-2 rounded-full bg-default-sys-light-primary">
                <AutoAwesomeIcon className="text-default-sys-light-on-primary" />
              </IconButton>
            </Box>
            <DragDrop handleImage={handleImage} name={"image"}>
              <Box
                className={`${hoverImage} flex-grow relative w-full h-full border-dashed border-default-sys-light-primary border-2 rounded-lg flex justify-center items-center p-10`}
                onDragEnter={(e) => {
                  e.stopPropagation();
                  console.log("hello!");
                  setHoverImage("bg-default-sys-light-outline-variant");
                }}
                onDragLeave={() =>
                  setHoverImage("bg-default-sys-light-surface-container-high")
                }
              >
                <Box className="absolute top-[10px] right-[20px] -translate-x-full flex flex-row gap-5">
                  <IconButton className="p-2 rounded-full bg-default-sys-light-on-primary border border-default-sys-light-primary">
                    <FileUploadOutlinedIcon className="text-default-sys-light-primary" />
                  </IconButton>
                </Box>
                <Box className=" px-4 py-2 flex items-center gap-4">
                  <AddPhotoAlternateIcon className="h-10 w-10" />
                  <Box className="text-sm">
                    Drag an image or click{" "}
                    <FileUploadOutlinedIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />
                    to upload, or click{" "}
                    <AutoAwesomeIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />{" "}
                    to generate an image.
                  </Box>
                </Box>
              </Box>
            </DragDrop>
          </Box>
          <Box className="hidden h-14 md:block"></Box>
        </Box>

        {/* Right Section (desktop) */}
        {/* description */}
        <Box className="h-full w-full flex flex-col justify-between gap-8 md:gap-5">
          <TextField
            className="h-14"
            id="outlined-start-adornment"
            label="Description"
            placeholder="Item Description"
            defaultValue={itemData?.description}
            helperText=""
            variant="standard"
            name="description"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          {/* price */}
          <TextField
            className="h-14"
            id="outlined-start-adornment"
            label="Price"
            placeholder="Item Price"
            defaultValue={itemData?.price}
            helperText=""
            variant="standard"
            name="price"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          {/* threshold */}
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
              name="threshold"
            />
          </Box>

          {/* labels */}
          <Box>
            <Box className="flex flex-row px-4 gap-4 w-full items-end overflow-x-scroll">
              <Typography
                className='w-fit'
                variant="button"
                sx={{ textTransform: "unset", fontWeight: "unset" }}
                id="labels-input-label"
                gutterBottom
              >
                Labels
              </Typography>
              <Box className="flex-grow flex flex-row flex-wrap gap-1 mb-1">
                {["oo", "sss", "dsfdsf"].map(
                  (labelText, i) => (
                    <Box
                      key={i}
                      className="bg-default-sys-light-surface-container-high rounded-full px-2 me-2 py-1.5 flex flex-row items-center"
                    >
                      <IconButton
                        className="p-0"
                        onClick={() => {
                          handleDeleteLabel(labelText);
                        }}
                      >
                        <Close className="text-default-sys-light-on-surface text-xs" />
                      </IconButton>
                      <Typography
                        className="leading-none"
                        variant="button"
                        sx={{ textTransform: "unset", fontWeight: "unset" }}
                      >
                        {labelText}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Box>
            {/* Input to handle adding labels */}
            <Box className="relative w-full h-fit">
              <TextField
                className="bg-default-sys-light-surface-bright"
                aria-labelledby="labels-input-label"
                fullWidth
                id="standard-helperText"
                label=""
                placeholder="Add Label"
                // defaultValue={itemData?.labels}
                helperText=""
                hiddenLabel
                name="labels"
                onChange={(e) => handleAddLabel(e)}
              />
              <CheckCircleIcon
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                  addingLabel
                    ? "text-default-sys-light-primary"
                    : "text-default-sys-light-surface-container-high"
                }`}
              />
            </Box>
            {/* Input to store label data */}
            <input
              className="hidden"
              value={itemData?.labels}
              name="labels"
            ></input>
          </Box>

          {/* date */}
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
              name="date"
            />
          </Box>
          <Box className="flex flex-row justify-end gap-4">
            <Button
              type='button'
              className="rounded-full"
              variant="outlined"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button type='submit' className="rounded-full" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </section>
    </>
  );
}

export default FormInputs
