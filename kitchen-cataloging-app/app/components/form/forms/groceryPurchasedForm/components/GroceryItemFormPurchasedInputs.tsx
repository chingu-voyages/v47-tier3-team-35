import ExpirationDateInput from "@/components/form/inputs/wrapperInputs/expirationDate/ExpirationDateInput";
import PriceInput from "@/components/form/inputs/wrapperInputs/price/PriceInput";
import QuantityInput from "@/components/form/inputs/wrapperInputs/quantity/QuantityInput";
import { Box } from "@mui/material";
import React from "react";

export default function GroceryItemFormPurchasedInputs() {
  return (
    <section className="flex flex-col md:flex-row w-full">
      <Box className="w-full p-0 flex flex-col md:flex-row justify-between gap-6 md:gap-4">
        {/*quantity to add*/}
        <QuantityInput />
        {/* price */}
        <PriceInput label="Total Price" placeholder="10.00" />
        {/* expiration date */}
        <ExpirationDateInput />
      </Box>
    </section>
  );
}
