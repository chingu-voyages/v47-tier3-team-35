import { useState } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Close from "@mui/icons-material/Close";

import { itemLabels } from '@/data/labels';
import { validateHeaderValue } from 'http';

interface CreateSelect {
  labels: string[];
  handleLabels: (val: string[]) => void;
}

const CreateSelect = ({ labels, handleLabels }: CreateSelect) => {
  // Labels
  
  const [addingLabel, setAddingLabel] = useState("closed");
  const [newLabel, setNewLabel] = useState("");

  const handleNewLabel = (val: string) => {
    if (val !== "" && itemLabels.indexOf(val) === -1) {
      setNewLabel(val);
      setAddingLabel("creating");
    } else {
      setNewLabel(val);
      setAddingLabel("closed");
    }
  };

  const handleDeleteLabel = (val: string) => {
    handleLabels(labels.filter((label) => label !== val));
  };

  const handleAddLabel = (val?: string) => {
    console.log(val)
    if (newLabel !== "" && labels.indexOf(newLabel) === -1) {
      setNewLabel("");
      setAddingLabel("closed");
      handleLabels([...labels, newLabel]);
    }
    else if (val) {
      setNewLabel("");
      handleLabels([...labels, val]);
    }
    else {
        setNewLabel("");
        setAddingLabel("closed");
      }
  };

  return (
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
      </Box>
      {/* Input to handle adding labels */}
      <Box className="relative z-10 w-full h-fit bg-default-sys-light-surface-bright ps-2 pe-10 rounded-lg border border-default-sys-light-outline-variant">
        {/* Labels */}
        <Box className="z-20 top-4 left-2 labels-list flex-grow flex flex-row flex-wrap items-center gap-1 mb-1">
          {labels.map((labelText, i) => (
            <Box
              key={i}
              className="bg-default-sys-light-surface-container-high px-2 me-2 py-1.5 flex flex-row items-center h-8 my-3"
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
          <TextField
            className="bg-default-sys-light-surface-bright flex-grow"
            aria-labelledby="labels-input-label"
            id=""
            label=""
            placeholder="Type or select a label"
            value={newLabel}
            helperText=""
            hiddenLabel
            onChange={(e) => handleNewLabel(e.target.value)}
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
        {addingLabel === "creating" && (
          <CheckCircleIcon
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-default-sys-light-primary`}
            onClick={() => handleAddLabel()}
          />
        )}
        {addingLabel === "closed" && (
          <ArrowDropDownIcon
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-default-sys-light-on-surface`}
            onClick={() => setAddingLabel("open")}
          />
        )}
        {addingLabel === "open" && (
          <ArrowDropUpIcon
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-default-sys-light-on-surface`}
            onClick={() => setAddingLabel("closed")}
          />
        )}
        {addingLabel === "open" && (
          <ul className="absolute -bottom-0.5 left-0 translate-y-full w-full bg-white rounded-b-lg max-h-32 overflow-y-scroll">
            {itemLabels
              .filter((item) => labels.indexOf(item) === -1)
              .map((itemLabel, i) => (
                <li
                  className="label-item relative z-10 select bg-default-sys-light-surface-container-lowest w-full h-10 text-[1rem] text-default-sys-light-on-primary-fixed px-3 py-2 cursor-pointer"
                  key={i}
                  onClick={() => {
                    if (itemLabel !== "" && labels.indexOf(itemLabel) === -1) {
                      handleAddLabel(itemLabel);
                      setAddingLabel("closed");
                    }
                  }}
                >
                  {itemLabel}
                </li>
              ))}
          </ul>
        )}
      </Box>
    </Box>
  );
}

export default CreateSelect
