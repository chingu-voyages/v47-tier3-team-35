import { Box, Slider } from "@mui/material";
import React from "react";
import Label from "../label/Label";

export default function SliderInput({
  label,
  value,
  name,
}: {
  name: string;
  label: string;
  value?: number;
}) {
  return (
    <Box className="flex flex-col w-full">
      <Label text={label} />
      <Slider
        aria-labelledby="threshold-input-label"
        aria-label="Always visible"
        name={name}
        defaultValue={value || 5}
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
