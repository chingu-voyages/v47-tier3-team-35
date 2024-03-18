import React from "react";
import FormSubmitWrapper from "@/components/form/components/FormSubmitWrapper";
import { FormProps } from "../../../types/types";
import { GroceryItem } from "@prisma/client";
import transformGroceryToFoodItem from "../actions/GroceryItemToFoodItemServerAction";
import { useExpirationDateInput } from "@/components/form/inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import { usePriceInput } from "@/components/form/inputs/wrapperInputs/price/PriceProvider";
import { FoodItemSuccessResult } from "@/actions/food/types/types";
export default function GroceryItemPurchasedFormWrapper({
  groceryItemId,
  children,
  onClose,
}: Pick<
  FormProps<GroceryItem, FoodItemSuccessResult | FoodItemSuccessResult>,
  "children" | "onClose"
> & { groceryItemId?: string }) {
  const priceProps = usePriceInput();
  const expirationDateProps = useExpirationDateInput();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!groceryItemId) return;
    //required grocery item props
    if (!priceProps?.price) return priceProps?.setError(true);
    if (!expirationDateProps?.expirationDate)
      return expirationDateProps?.setError(true);
    //upload image if it exists
    const result = await transformGroceryToFoodItem({
      totalPrice: priceProps.price,
      expirationDate: new Date(expirationDateProps.expirationDate),
      groceryItemId,
    });
    //this indicates an error
    if (result.type === "error") return;
    //this indicates a success callback;
    if (onClose) onClose(result);
  };
  return (
    <FormSubmitWrapper onSubmit={onSubmit}> {children} </FormSubmitWrapper>
  );
}
