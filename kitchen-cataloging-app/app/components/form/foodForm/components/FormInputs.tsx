"use client";
import { Box } from "@mui/material";
import DescriptionInput from "../../inputs/wrapperInputs/description/DescriptionInput";
import TitleInput from "../../inputs/wrapperInputs/title/TitleInput";
import LabelsInput from "../../inputs/wrapperInputs/labels/LabelsInput";
import { ImageInput } from "../../inputs/wrapperInputs/img/ImageInput";
import SpaceInput from "../../inputs/wrapperInputs/space/SpaceInput";
import ThresholdInput from "../../inputs/wrapperInputs/threshold/ThresholdInput";
import FoodItemVerInputs from "../inputs/FoodItemVerInputs";
// COMPONENT
const FormInputs = ({ type }: { type: "edit" | "create" }) => {
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
          {type === "create" && <FoodItemVerInputs />}
          {/* labels */}
          <LabelsInput />
          {/* threshold */}
          <ThresholdInput />
        </Box>
      </section>
    </>
  );
};

export default FormInputs;
