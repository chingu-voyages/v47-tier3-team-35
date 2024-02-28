import { Box, Slider } from "@mui/material";
import React from "react";
import Label from "../inputLabel/Label";
export default function SliderInput({
  label,
  value,
  name,
  onChange,
}: {
  name: string;
  label: string;
  value?: number;
  onChange?: (e: number) => void;
}) {
  return (
    <Box className="flex flex-col w-full">
      <Label text={label} />
      <Slider
        onChange={(e, value) => {
          if (onChange && typeof value === "number") onChange(value);
        }}
        aria-labelledby="slider-input-label"
        aria-label="Always visible"
        name={name}
        value={typeof value === "number" ? value : 0}
        step={1}
        min={0}
        max={10}
        marks
        valueLabelDisplay="on"
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
  );
}
