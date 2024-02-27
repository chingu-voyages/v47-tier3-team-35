"use client";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import uploadImages from "@/aws/content/uploadImages";
import "./customstyles.css";
import { Food, Image } from "@prisma/client";
import { FileMediaType } from "@/aws/content/uploadImages";
import DateInput from "../../inputs/innerComponents/date/DateInput";
import SliderInput from "../../inputs/innerComponents/slider/SliderInput";
import PriceInput from "../../inputs/wrapperInputs/price/PriceInput";
import DescriptionInput from "../../inputs/wrapperInputs/description/DescriptionInput";
import TitleInput from "../../inputs/wrapperInputs/title/TitleInput";
import { CreateEditFormProps } from "../../types/types";
import { FormActionBtns, FormCloseBtn } from "../../components/FormActionBtns";
import FormHeader from "../../components/FormHeader";
import LabelsInput from "../../inputs/wrapperInputs/labels/LabelsInput";
import { ImageInput } from "../../inputs/img/ImageInput";
// COMPONENT
const FormInputs = ({ type, onClose, itemData }: CreateEditFormProps<Food>) => {
  // Threshold
  const thresholdRef = useRef<HTMLInputElement | null>(null);
  const text = thresholdRef?.current
    ? thresholdRef.current.children[1].getAttribute("style")
    : "0";
  const width = text ? text.split(/[%\s+]/) : "0"; // getting width value
  const threshold = parseInt(width[4]) / 10; // width percentage
  // submit form
  // const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   console.log("submitting");
  //   if (
  //     titleRef.current &&
  //     priceRef.current &&
  //     descriptionRef.current &&
  //     expirationDateRef.current
  //   ) {
  //     console.log("all refs exist");
  //     const errorObject = {
  //       space: space === "" ? true : false,
  //       title: titleRef.current.value === "",
  //       price:
  //         priceRef.current.value === "" ||
  //         Math.abs(
  //           Math.round(parseFloat(priceRef.current.value) * 100) -
  //             parseFloat(priceRef.current.value) * 100
  //         ) > computersAreDumb
  //           ? true
  //           : false,
  //       description: descriptionRef.current.value === "" ? true : false,
  //     };
  //     setErrors(errorObject);
  //     if (Object.values(errorObject).every((err) => err === false)) {
  //       console.log("no errors");
  //       await addEditItem(
  //         space,
  //         titleRef.current.value,
  //         image,
  //         priceRef.current.value,
  //         descriptionRef.current.value,
  //         threshold,
  //         labels,
  //         expirationDateRef.current.value,
  //         userId,
  //         itemData
  //       );
  //       window.location.reload();
  //     }
  //   }
  // };
  return (
    <form className="relative p-10 flex flex-col bg-default-sys-light-surface-container-low w-full overflow-y-auto">
      {/*Close Btn*/}
      <FormCloseBtn onClose={onClose} />
      {/* Heading */}
      <FormHeader
        header={`${type.slice(0, 1).toUpperCase()}${type.slice(1)} Item`}
      />
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
          <DateInput defaultDate={itemData?.expirationDate} inputName="date" />
        </Box>
      </section>
      <FormActionBtns onClose={onClose} />
    </form>
  );
};

export default FormInputs;
