'use client'
import React, { useEffect } from "react";
import { MouseEvent, useState, useRef } from "react";

import { Box, Typography, InputLabel, FormControl, Select, TextField, MenuItem, Slider, InputAdornment, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { FocusEvent } from "react";

import { FoodType } from "@/prisma/mock/mockData";

import './customstyles.css';

interface FormInputs {
  type: "create" | "edit";
    spaces: string[];
    handleForm: (formData: FormData) => void;
    onClose: () => void;
  itemData?: FoodType;
}

const FormInputs = ({ type, spaces, handleForm, onClose, itemData }: FormInputs) => {
    
    const [space, setSpace] = useState(itemData?.roomTitle ? itemData?.roomTitle : '')
    const [animateLabelClass, setAnimateLabelClass] = useState(space ? 'open' : 'closed')
    const [openSelect, setOpenSelect] = useState(false)

    // const animateLabelClass = (space === '' && !openSelect) ? 'deanimate-label' : openSelect ? 'animate-label' : '';

    useEffect(() => {
        if (space === '' && !openSelect && animateLabelClass === 'open') {
            console.log('1')
            setAnimateLabelClass('deanimate-label');
        }
        else if (space === '' && !openSelect && animateLabelClass !== 'closed') {
            console.log('2');
            setAnimateLabelClass("deanimate-label");
        } else if (openSelect && animateLabelClass !== 'open') {
            console.log("3");
            setAnimateLabelClass("animate-label");
        }
    }, [openSelect])

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
          <div
            className={`${
              openSelect ? "select-arrow-down" : "select-arrow-up"
            } relative z-10`}
          >
            <div
              className="relative select bg-default-sys-light-surface-container-lowest w-52 h-12 rounded-lg ps-4"
              id="space-select"
              onClick={() => setOpenSelect(!openSelect)}
            ></div>
            <select className="hidden" value={space} name="space" onChange={() => console.log('shut up react')}></select>
            <p className="space-selected absolute whitespace-nowrap pe-3 text-center font-semibold text-[1.125rem] text-default-sys-light-on-primary-fixed pointer-events-none">
              {space}
            </p>
            <label
              className={`${animateLabelClass} absolute whitespace-nowrap pe-3 text-center font-semibold text-[1.125rem] text-default-sys-light-on-primary-fixed pointer-events-none`}
              htmlFor="space-select"
              id="space-label"
            >
              Choose Space
            </label>
            {openSelect && (
              <ul className="absolute -bottom-0.5 left-0 translate-y-full w-full bg-white">
                {spaces.map((spaceOption, i) => (
                    <li key={i} onClick={() => {
                        setSpace(spaceOption)
                        setOpenSelect(false)
                    }}>
                    {spaceOption}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Box>
      </section>

      {/* Main */}
      <section className="modal-main h-full flex flex-col gap-8 md:gap-16 md:flex-row">
        {/* Left Section (desktop) */}
        <Box className="h-full w-full flex flex-col gap-8 md:gap-0">
          <TextField
            className="h-14 mb-12"
            id="standard-helperText"
            label="Name"
            defaultValue="Item Name"
            helperText=""
            variant="standard"
          />
          <Box className="flex-grow border">Image placeholder</Box>
          <Box className="hidden h-14 md:block"></Box>
        </Box>

        {/* Right Section (desktop) */}
        <Box className="h-full w-full flex flex-col justify-between gap-8 md:gap-5">
          <TextField
            className="h-14"
            id="standard-helperText"
            label="Description"
            defaultValue="Item Description"
            helperText=""
            variant="standard"
          />
          <TextField
            className="h-14"
            id="outlined-start-adornment"
            label="Price"
            defaultValue="Item Price"
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
            <Typography
              variant="button"
              sx={{ textTransform: "unset", fontWeight: "unset" }}
              id="labels-input-label"
              gutterBottom
            >
              Labels
            </Typography>
            <TextField
              aria-labelledby="labels-input-label"
              fullWidth
              id="standard-helperText"
              label=""
              defaultValue="Add Label"
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
              aria-labelledby="date-input-label"
              fullWidth
              id="standard-helperText"
              label=""
              defaultValue="mm/dd/yyyy"
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
