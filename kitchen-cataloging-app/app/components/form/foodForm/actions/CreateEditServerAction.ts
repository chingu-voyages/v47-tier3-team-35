"use server";
import addSingleFoodItem from "@/actions/food/crud/addFoodItem";
import updateSingleFoodItem from "@/actions/food/crud/updateFoodItem";
import { auth } from "@clerk/nextjs";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemVersionZodSchema,
  FoodItemVersionZodType,
  FoodItemZodSchema,
  FoodItemZodType,
} from "@/zodTypes/FoodItemSchema";
import updateFoodItemVer from "@/actions/foodVer/updateFoodVer";
import addSingleFoodVerItem from "@/actions/foodVer/addFoodVer";
import { FoodItemSuccessResult } from "../../types/types";
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
  //runtime check for food item
  const foodValidationResult = FoodItemZodSchema.safeParse(newFoodData);
  if (!foodValidationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${foodValidationResult.error.toString()}`,
    });
  const foodDoc = foodValidationResult.data.id
    ? await updateSingleFoodItem(
        user.id,
        foodValidationResult.data.id,
        foodValidationResult.data
      )
    : await addSingleFoodItem(user.id, foodValidationResult.data);
  //runtime check for food item version
  if (!newFoodItemVer)
    return {
      type: "success",
      statusCode: 200,
      result: { foodDoc, foodVerDoc: null },
    };
  //means we are creating anew if no id is provided
  const foodVerValidationResult =
    FoodItemVersionZodSchema.safeParse(newFoodItemVer);
  if (!foodVerValidationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${foodVerValidationResult.error.toString()}`,
    });
  const foodVerDoc = foodVerValidationResult.data.id
    ? await updateFoodItemVer(user.id, foodVerValidationResult.data.id, {
        ...foodVerValidationResult.data,
        foodId: foodDoc.id,
      })
    : await addSingleFoodVerItem(user.id, {
        ...foodVerValidationResult.data,
        foodId: foodDoc.id,
      });
  return {
    type: "success",
    statusCode: 200,
    result: { foodDoc, foodVerDoc },
  };
};
