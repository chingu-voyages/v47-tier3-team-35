"use client";
import { useRef } from "react";
import { Box } from "@mui/material";
import SliderInput from "../../inputs/innerComponents/slider/SliderInput";
import PriceInput from "../../inputs/wrapperInputs/price/PriceInput";
import DescriptionInput from "../../inputs/wrapperInputs/description/DescriptionInput";
import TitleInput from "../../inputs/wrapperInputs/title/TitleInput";
import LabelsInput from "../../inputs/wrapperInputs/labels/LabelsInput";
import { ImageInput } from "../../inputs/img/ImageInput";
import ExpirationDateInput from "../../inputs/wrapperInputs/expirationDate/ExpirationDateInput";
import SpaceInput from "../../inputs/wrapperInputs/space/SpaceInput";
// COMPONENT
const FormInputs = () => {
  // Threshold
  const thresholdRef = useRef<HTMLInputElement | null>(null);
  const text = thresholdRef?.current
    ? thresholdRef.current.children[1].getAttribute("style")
    : "0";
  const width = text ? text.split(/[%\s+]/) : "0"; // getting width value
  const threshold = parseInt(width[4]) / 10; // width percentage
  return (
    <>
      <Box className="flew flex-col w-full mb-4">
        <SpaceInput />
      </Box>
      {/* Main */}
      <section className="flex flex-col md:flex-row w-full">
        {/* Left Section (desktop) */}
        {/* Title */}
        <Box className="w-full md:w-3/6 p-0 md:pr-4 lg:pr-8 container-left-desktop flex flex-col gap-8 md:gap-0">
          <TitleInput />
          {/* Image  */}
          <ImageInput />
        </Box>
        {/* Right Section (desktop) */}
        {/* description */}
        <Box className="w-full md:w-3/6 p-0 md:pl-4 lg:pl-8 flex flex-col justify-between gap-8 md:gap-5">
          <DescriptionInput />
          {/* price */}
          <PriceInput />
          {/* threshold */}
          <SliderInput value={threshold} label="Threshold" name="threshold" />
          {/* labels */}
          <LabelsInput />
          {/* expiration date */}
          <ExpirationDateInput />
        </Box>
      </section>
    </>
  );
};

export default FormInputs;
