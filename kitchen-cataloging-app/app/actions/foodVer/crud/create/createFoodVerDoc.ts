import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemVersionZodSchema,
  FoodItemVersionZodType,
  FoodItemVersionZodTypeAllOptional,
} from "@/zodTypes/FoodItemSchema";
import addSingleFoodVerItem from "./addFoodVer";
import updateSingleFoodItem from "@/actions/food/crud/update/updateFoodItem";
import { FoodVerCreateResult } from "../../types/types";
export const createFoodVerDoc = async ({
  userId,
  foodId,
  newFoodItemVer,
}: {
  newFoodItemVer: FoodItemVersionZodType | FoodItemVersionZodTypeAllOptional;
  foodId: string;
  userId: string;
}): Promise<FoodVerCreateResult | ErrorMessage> => {
  //means we are creating anew if no id is provided
  const foodVerValidationResult =
    FoodItemVersionZodSchema.safeParse(newFoodItemVer);
  if (!foodVerValidationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${foodVerValidationResult.error.toString()}`,
    });
  const foodVerDoc = await addSingleFoodVerItem(userId, {
    ...foodVerValidationResult.data,
    foodId,
  });
  //this means a completely new food item with a certain quantity has been added
  await updateSingleFoodItem(userId, foodId, {
    amount: foodVerDoc.quantity,
    price: foodVerDoc.price,
  });
  return {
    statusCode: 200,
    type: "success",
    result: foodVerDoc,
  };
};
