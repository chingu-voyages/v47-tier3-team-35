"use client";
import React, { useEffect } from "react";
import { useState} from "react";

import {
  Box,
  Typography,
  TextField,
  Slider,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import CustomSelect from "./CustomSelect";
import Close from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ChangeEvent } from "react";

import { FoodType } from "@/prisma/mock/mockData";

import "./customstyles.css";
import DragDrop from "../../DragDrop";

interface FormInputs {
  type: "create" | "edit";
  spaces: string[];
  onClose: () => void;
  itemData?: FoodType;
}

// COMPONENT
const FormInputs = ({
  type,
  spaces,
  onClose,
  itemData,
}: FormInputs) => {

  console.log(itemData?.expirationDate)

  // Space
  const [space, setSpace] = useState(
    itemData?.roomTitle ? itemData?.roomTitle : ""
  );
  const handleSpace = (val: string) => {
    setSpace(val);
  };

  const [newTitle, setNewTitle] = useState('')

  // Image 
  const [image, setImage] = useState(itemData?.image?.url);
  const handleGeneratedImage = () => {
    if (newTitle) {
      setImage(`https://source.unsplash.com/random/?${newTitle}`);
    }
  }

  // Labels
  const [labels, setLabels] = useState(itemData?.labels ? itemData.labels : []);
  const [addingLabel, setAddingLabel] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const handleNewLabel = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== "") {
      setNewLabel(e.target.value);
      setAddingLabel(true);
    } else {
      setNewLabel(e.target.value);
      setAddingLabel(false);
    }
  };

  const handleDeleteLabel = (val: string) => {
    setLabels(labels.filter((label) => label !== val));
  };

  const handleAddLabel = () => {
    if (newLabel !== "") {
      setLabels([...labels, newLabel]);
      setNewLabel('')
      setAddingLabel(false);
    }
  };

  // Threshold

  const marks = new Array(10).fill(0).map((val, i) => ({
    value: i + 1,
  }));

  // Expiration date
  const [expDateDisplay, setExpDateDisplay] = useState('')
  useEffect(() => {
    function convertToRFC3339(inputDateStr: string): string {
      const date = new Date(inputDateStr);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const RFC3339Date = `${year}-${month}-${day}`;
      console.log(RFC3339Date);
      return RFC3339Date;
    }
    if (itemData?.expirationDate) {
      console.log("true");
      const expDate = convertToRFC3339(itemData.expirationDate.toDateString());
      console.log(expDate);
      setExpDateDisplay(expDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
            onChange={(e) => setNewTitle(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />

          {/* Image  */}

          <Box className="flex-grow relative">
            <DragDrop name={"image"} image={image ? image : ""} />
            <Box className="absolute top-[12px] right-[12px] flex flex-row gap-3 z-50 pointer-events-none">
              <IconButton className="p-2 rounded-full bg-default-sys-light-on-primary border border-default-sys-light-primary">
                <FileUploadOutlinedIcon className="text-default-sys-light-primary" />
              </IconButton>
              <IconButton
                className="p-2 rounded-full bg-default-sys-light-primary pointer-events-auto cursor-pointer"
                onClick={() => handleGeneratedImage()}
              >
                <AutoAwesomeIcon className="text-default-sys-light-on-primary" />
              </IconButton>
            </Box>
            <Box
              className={`flex-grow relative w-full h-full border-dashed border-default-sys-light-primary border-2 rounded-lg flex justify-center items-center p-10`}
            >
              <Box className=" px-4 py-2 flex items-center gap-4 z-0">
                <AddPhotoAlternateIcon className="h-10 w-10" />
                <Box className="text-sm">
                  Drag an image,{" "}
                  <FileUploadOutlinedIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />{" "}
                  upload, or{" "}
                  <AutoAwesomeIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />{" "}
                  generate an image.
                </Box>
              </Box>
            </Box>
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
              inputProps: {
                step: 0.01, 
              },
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
              defaultValue={itemData?.threshold ? itemData.threshold : 5}
              // getAriaValueText={valuetext}
              step={1}
              min={0}
              max={10}
              marks
              valueLabelDisplay="on"
              name="threshold"
              sx={{
                "& .MuiSlider-valueLabel": {
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "primary.main",
                  borderRadius: "100%",
                  maxWidth: "34px",
                  aspectRatio: "1/1",
                },
                "& .MuiSlider-valueLabel::before": {
                  bottom: "1px",
                },
              }}
            />
          </Box>

          {/* labels */}
          <Box>
            <Box className="flex flex-row px-4 gap-4 w-full items-end overflow-x-scroll">
              <Typography
                className="w-fit"
                variant="button"
                sx={{ textTransform: "unset", fontWeight: "unset" }}
                id="labels-input-label"
                gutterBottom
              >
                Labels
              </Typography>
              <Box className="flex-grow flex flex-row flex-wrap gap-1 mb-1">
                {labels.map((labelText, i) => (
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
                ))}
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
                value={newLabel}
                helperText=""
                hiddenLabel
                onChange={(e) => handleNewLabel(e)}
              />
              <CheckCircleIcon
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                  addingLabel
                    ? "text-default-sys-light-primary"
                    : "text-default-sys-light-surface-container-high"
                }`}
                onClick={() => handleAddLabel()}
              />
            </Box>
            {/* Input to store label data */}
            <input
              className="hidden"
              value={labels}
              name="labels"
              readOnly
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
              // placeholder="mm/dd/yyyy"
              defaultValue={expDateDisplay}
              helperText=""
              type="date"
              hiddenLabel
              name="date"
            />
          </Box>
          <Box className="flex flex-row justify-end gap-4">
            <Button
              type="button"
              className="rounded-full"
              variant="outlined"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default FormInputs;
