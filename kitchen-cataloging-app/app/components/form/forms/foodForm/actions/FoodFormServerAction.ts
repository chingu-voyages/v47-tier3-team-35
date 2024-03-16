"use server";
import { auth } from "@clerk/nextjs";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemVersionZodType,
  FoodItemZodType,
} from "@/zodTypes/FoodItemSchema";
import { FoodItemSuccessResult } from "../../../types/types";
import { createFoodVerDoc } from "@/actions/foodVer/crud/create/createFoodVerDoc";
import { updateFoodVerDoc } from "@/actions/foodVer/crud/update/updateFoodVerDoc";
import { updateFoodDoc } from "@/actions/food/crud/update/updateFoodDoc";
import { createFoodDoc } from "@/actions/food/crud/create/createFoodDoc";
export const uploadFoodItemData = async ({
  newFoodData,
  newFoodItemVer,
}: {
  newFoodData: FoodItemZodType;
  newFoodItemVer?: FoodItemVersionZodType;
}): Promise<FoodItemSuccessResult | ErrorMessage> => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Operation Forbidden",
    });
  const foodDocResult = newFoodData.id
    ? await updateFoodDoc({
        userId: user.id,
        newFoodData,
      })
    : await createFoodDoc({
        userId: user.id,
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
        userId: user.id,
        newFoodItemVer,
      })
    : await createFoodVerDoc({
        userId: user.id,
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
