import { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemVersionZodTypeAllOptional,
  FoodItemZodTypeAllOptional,
} from "@/zodTypes/FoodItemSchema";
import { createFoodVerDoc } from "@/actions/foodVer/crud/create/createFoodVerDoc";
import { updateFoodVerDoc } from "@/actions/foodVer/crud/update/updateFoodVerDoc";
import { updateFoodDoc } from "@/actions/food/crud/update/updateFoodDoc";
import { createFoodDoc } from "@/actions/food/crud/create/createFoodDoc";
import { FoodItemSuccessResult } from "@/actions/food/types/types";
export const uploadFoodItemData = async ({
  userId,
  newFoodData,
  newFoodItemVer,
}: {
  userId: string;
  newFoodData: FoodItemZodTypeAllOptional;
  newFoodItemVer?: FoodItemVersionZodTypeAllOptional;
}): Promise<FoodItemSuccessResult | ErrorMessage> => {
  const foodDocResult = newFoodData.id
    ? await updateFoodDoc({
        userId,
        newFoodData,
      })
    : await createFoodDoc({
        userId,
        newFoodData,
      });
  if (foodDocResult.type === "error") return foodDocResult;
  const foodDoc = foodDocResult.result;
  //runtime check for food item version
  if (!newFoodItemVer)
    return {
      type: "success",
      statusCode: 200,
      result: { foodDoc, foodVerDoc: null },
    };
  //means we are creating anew if no id is provided
  const foodVerDocResult = newFoodItemVer.id
    ? await updateFoodVerDoc({
        userId: userId,
        newFoodItemVer,
      })
    : await createFoodVerDoc({
        userId: userId,
        newFoodItemVer,
        foodId: foodDoc.id,
      });
  if (foodVerDocResult.type === "error") return foodVerDocResult;
  const foodVerDoc = foodVerDocResult.result;
  return {
    type: "success",
    statusCode: 200,
    result: { foodDoc, foodVerDoc },
  };
};
