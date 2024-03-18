import { ExpirationDateProvider } from "@/components/form/inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import { PriceProvider } from "@/components/form/inputs/wrapperInputs/price/PriceProvider";
import { GroceryItem } from "@prisma/client";
import React from "react";
export default function GroceryItemPurchasedFormWrappers({
  itemData,
  children,
}: {
  itemData:
    | (GroceryItem & {
        price?: number;
        expirationDate?: Date | string;
      })
    | null;
  children: React.ReactNode;
}) {
  const spaceValue =
    itemData && itemData.roomId
      ? {
          label: itemData.roomTitle,
          value: itemData.roomId,
        }
      : null;
  return (
    <PriceProvider defaultValue={itemData?.price}>
      <ExpirationDateProvider
        defaultValue={itemData?.expirationDate?.toString()}
      >
        {children}
      </ExpirationDateProvider>
    </PriceProvider>
  );
}
