import { ExpirationDateProvider } from "@/components/form/inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import { PriceProvider } from "@/components/form/inputs/wrapperInputs/price/PriceProvider";
import { QuantityProvider } from "@/components/form/inputs/wrapperInputs/quantity/QuantityProvider";
import { GroceryItem } from "@prisma/client";
import React from "react";
export default function GroceryItemPurchasedFormWrappers({
  itemData,
  children,
}: {
  itemData:
    | (Partial<GroceryItem> & {
        price?: number;
        expirationDate?: Date | string;
      })
    | null;
  children: React.ReactNode;
}) {
  return (
    <QuantityProvider defaultValue={itemData?.amount}>
      <PriceProvider defaultValue={itemData?.price}>
        <ExpirationDateProvider
          defaultValue={itemData?.expirationDate?.toString()}
        >
          {children}
        </ExpirationDateProvider>
      </PriceProvider>
    </QuantityProvider>
  );
}
