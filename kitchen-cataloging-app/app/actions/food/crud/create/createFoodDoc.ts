import addSingleFoodItem from "@/actions/food/crud/create/addFoodItem";
import { FoodVerCreateResult } from "@/actions/foodVer/types/types";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemZodSchema,
  FoodItemZodType,
  FoodItemZodTypeAllOptional,
} from "@/zodTypes/FoodItemSchema";
import { FoodCreateResult } from "../../types/types";
export const createFoodDoc = async ({
  userId,
  newFoodData,
}: {
  userId: string;
  newFoodData: FoodItemZodType | FoodItemZodTypeAllOptional;
}): Promise<FoodCreateResult | ErrorMessage> => {
  //runtime check for food item
  const foodCreationValidationResult = FoodItemZodSchema.safeParse(newFoodData);
  if (!foodCreationValidationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${foodCreationValidationResult.error.toString()}`,
    });
  const foodDoc = await addSingleFoodItem(
    userId,
    foodCreationValidationResult.data
  );
  return {
    type: "success",
    statusCode: 200,
    result: foodDoc,
  };
};
