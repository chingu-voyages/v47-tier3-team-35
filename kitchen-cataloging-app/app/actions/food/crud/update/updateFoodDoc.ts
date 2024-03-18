import updateSingleFoodItem from "@/actions/food/crud/update/updateFoodItem";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemZodSchemaAllOptional,
  FoodItemZodTypeAllOptional,
} from "@/zodTypes/FoodItemSchema";
import { FoodUpdateResult } from "../../types/types";
export const updateFoodDoc = async ({
  userId,
  newFoodData,
}: {
  userId: string;
  newFoodData: FoodItemZodTypeAllOptional;
}): Promise<FoodUpdateResult | ErrorMessage> => {
  const foodUpdateValidationResult =
    FoodItemZodSchemaAllOptional.safeParse(newFoodData);
  if (!foodUpdateValidationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${foodUpdateValidationResult.error.toString()}`,
    });
  if (!foodUpdateValidationResult.data.id)
    return generateErrMessage({
      statusCode: 400,
      message: "Food item id is required",
    });
  const foodDoc = await updateSingleFoodItem(
    userId,
    foodUpdateValidationResult.data.id,
    foodUpdateValidationResult.data
  );
  return {
    type: "success",
    statusCode: 200,
    result: foodDoc,
  };
};
