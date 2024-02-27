"use client";

import { useState } from "react";

import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import {
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// import { styled } from "@mui/system";

export default function IncrementPopup({
  children,
  handleIncrement,
  type = "increment",
}: {
  children: JSX.Element;
  handleIncrement: (num: number) => void;
  type?: "increment" | "decrement";
}) {
  const [amount, setAmount] = useState("1");
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleAmount = (str: string) => {
    if (parseInt(str) < 0) {
      setAmount("0");
    } else {
      setAmount(str);
    }
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Box
        aria-describedby={id}
        onClick={(e) => {
          handleClick(e);
          setAmount("1");
        }}
      >
        {children}
      </Box>
      <BasePopup
        placement="top"
        id={id}
        open={open}
        anchor={anchor}
        offset={8}
        className="bg-default-sys-light-surface-container-lowest p-4 rounded-md shadow-lg shadow-default-ref-neutral-neutral60"
      >
        <Stack direction="column">
          <Stack direction="row" className="justify-between items-center">
            <Typography
              variant="body2"
              className="text-default-ref-neutral-neutral40"
            >
              How many?
            </Typography>
            <IconButton
              onClick={(e) => {
                handleClick(e);
                setAmount("1");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            hiddenLabel
            type="text"
            className="mb-4"
            value={amount}
            onChange={(e) => handleAmount(e.target.value)}
            id="filled-hidden-label-small"
            variant="filled"
            placeholder="Enter a number"
            size="small"
          />
          <Button
            type="submit"
            className="rounded-full w-24 self-center"
            variant="contained"
            onClick={(e) => {
              const typeAmount =
                type === "decrement" ? parseInt(amount) * -1 : parseInt(amount);
              handleIncrement(typeAmount);
              setAmount("1");
              handleClick(e);
            }}
          >
            Sumbit
          </Button>
        </Stack>
      </BasePopup>
    </div>
  );
}
