import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemVersionZodSchemaAllOptional,
  FoodItemVersionZodTypeAllOptional,
} from "@/zodTypes/FoodItemSchema";
import { FoodVerUpdateResult } from "@/components/form/types/types";
import { updateFoodVerByQuantity } from "./updateFoodVerByQuantity";
export const updateFoodVerDoc = async ({
  userId,
  newFoodItemVer,
}: {
  newFoodItemVer: FoodItemVersionZodTypeAllOptional;
  userId: string;
}): Promise<FoodVerUpdateResult | ErrorMessage> => {
  //means we are creating anew if no id is provided
  const foodVerValidationResult =
    FoodItemVersionZodSchemaAllOptional.safeParse(newFoodItemVer);
  if (!foodVerValidationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${foodVerValidationResult.error.toString()}`,
    });
  if (typeof foodVerValidationResult.data.quantity !== "number")
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: quantity must be a number`,
    });
  if (!newFoodItemVer.id)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: id must be provided`,
    });
  const foodVerDocResult = await updateFoodVerByQuantity({
    userId,
    foodVerId: newFoodItemVer.id,
    count: foodVerValidationResult.data.quantity,
  });
  if (foodVerDocResult.type === "error") return foodVerDocResult;
  const foodVerDoc = foodVerDocResult.result;
  return {
    statusCode: 200,
    type: "success",
    result: foodVerDoc,
  };
};
