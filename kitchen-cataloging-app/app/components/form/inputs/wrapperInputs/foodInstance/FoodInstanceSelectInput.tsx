import { Box, Radio } from "@mui/material";
import React from "react";
import { useFoodInstanceInput } from "./FoodInstanceProvider";
import { FoodInstanceValueProps } from "../../innerComponents/select/types";
const FoodInstanceRadioInput = ({
  checked,
  onChange,
  foodInstanceData,
  foodTitle,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  foodInstanceData: FoodInstanceValueProps;
  foodTitle?: string;
}) => {
  const locale = navigator.language || "en-US";
  const { expirationDate, quantity, price } = foodInstanceData?.label || {};
  const dateString = expirationDate?.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  //   const totalPrice = (quantity || 0) * (price || 0);
  return (
    <Box className="flex flex-row w-full items-center pr-2">
      <Radio
        checked={checked}
        onChange={onChange}
        value={foodInstanceData.value}
        name="food-instance-radio-buttons"
        inputProps={{
          "aria-label": `${
            foodTitle || "food-instance"
          }-expiring-on-${dateString}-with-a-quantity-of-${quantity}-and-price-of-${price} `,
        }}
          />
          
    </Box>
  );
};
export default function FoodInstanceSelectInput({}) {
  const inputProps = useFoodInstanceInput();
  if (!inputProps) return <></>;
  const { foodInstance, onChange } = inputProps;
  return <div></div>;
}
