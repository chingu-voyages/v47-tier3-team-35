import React from "react";
import DescriptionInput from "@/components/form/inputs/wrapperInputs/description/DescriptionInput";
import { ImageInput } from "@/components/form/inputs/wrapperInputs/img/ImageInput";
import LabelsInput from "@/components/form/inputs/wrapperInputs/labels/LabelsInput";
import QuantityInput from "@/components/form/inputs/wrapperInputs/quantity/QuantityInput";
import SpaceInput from "@/components/form/inputs/wrapperInputs/space/SpaceInput";
import TitleInput from "@/components/form/inputs/wrapperInputs/title/TitleInput";
import { Box } from "@mui/material";
export default function GroceryItemFormInputs() {
  return (
    <>
      <Box className="flew flex-col w-full mb-6">
        <SpaceInput />
      </Box>
      {/* Main */}
      <section className="flex flex-col md:flex-row w-full">
        {/* Left Section (desktop) */}
        {/* Title */}
        <Box className="w-full md:w-3/6 p-0 md:pr-4 lg:pr-8 container-left-desktop flex flex-col gap-6 md:gap-6 mb-6 md:mb-0">
          <TitleInput />
          {/* Image  */}
          <ImageInput />
        </Box>
        {/* Right Section (desktop) */}
        {/* description */}
        <Box className="w-full md:w-3/6 p-0 md:pl-4 lg:pl-8 flex flex-col justify-between gap-6 md:gap-4">
          <DescriptionInput />
          <Box className="w-full p-0 flex flex-col md:flex-row justify-between gap-6 md:gap-4">
            {/*quantity to add*/}
            <QuantityInput />
          </Box>
          {/* labels */}
          <LabelsInput />
        </Box>
      </section>
    </>
  );
}
