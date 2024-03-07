import { Box } from "@mui/material";
import React from "react";
import PriceInput from "../../inputs/wrapperInputs/price/PriceInput";
import QuantityInput from "../../inputs/wrapperInputs/quantity/QuantityInput";
import ExpirationDateInput from "../../inputs/wrapperInputs/expirationDate/ExpirationDateInput";
export default function FoodItemVerInputs() {
  return (
    <Box className="w-full p-0 flex flex-col md:flex-row justify-between gap-6 md:gap-4">
      {/* price */}
      <PriceInput />
      {/*quantity to add*/}
      <QuantityInput />
      {/* expiration date */}
      <ExpirationDateInput />
    </Box>
  );
}
