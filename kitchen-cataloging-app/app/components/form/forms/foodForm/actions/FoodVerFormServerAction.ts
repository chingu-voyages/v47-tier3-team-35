"use server";
import { auth } from "@clerk/nextjs";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemVersionZodSchema,
  FoodItemVersionZodType,
} from "@/zodTypes/FoodItemSchema";
import updateFoodItemVer from "@/actions/foodVer/crud/update/updateFoodVer";
import addSingleFoodVerItem from "@/actions/foodVer/crud/create/addFoodVer";
import {
  calculateNewPriceAndQuantity,
  findFoodDocWithPriceAndQuantity,
} from "@/actions/foodVer/crud/utils/calculateNewPriceAndQuantity";
import { FoodItemVerSuccessResult } from "@/actions/foodVer/types/types";
export const uploadFoodItemVerData = async ({
  newFoodItemVer,
}: {
  newFoodItemVer: FoodItemVersionZodType;
}): Promise<FoodItemVerSuccessResult | ErrorMessage> => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Operation Forbidden",
    });
  //means we are creating anew if no id is provided
  const foodVerValidationResult =
    FoodItemVersionZodSchema.safeParse(newFoodItemVer);
  if (!foodVerValidationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${foodVerValidationResult.error.toString()}`,
    });
  //check that food item exists
  if (!foodVerValidationResult.data.foodId)
    return generateErrMessage({
      statusCode: 400,
      message: `Food item is required`,
    });
  const foodDoc = await findFoodDocWithPriceAndQuantity({
    userId: user.id,
    foodId: foodVerValidationResult.data.foodId,
  });
  if (!foodDoc)
    return generateErrMessage({
      statusCode: 404,
      message: `Food item not found`,
    });
  //update or create food item
  const foodVerDoc = foodVerValidationResult.data.id
    ? await updateFoodItemVer(user.id, foodVerValidationResult.data.id, {
        ...foodVerValidationResult.data,
        foodId: foodDoc.id,
      })
    : await addSingleFoodVerItem(user.id, {
        ...foodVerValidationResult.data,
        foodId: foodDoc.id,
      });
  // we calculate new avg price and quantity in food
  const isNewFoodItemVer = !foodVerValidationResult.data.id;
  const isNewFoodItemVerOperationSuccess = foodVerDoc;
  if (isNewFoodItemVer && isNewFoodItemVerOperationSuccess)
    await calculateNewPriceAndQuantity({
      userId: user.id,
      foodDoc,
      foodVerDoc,
    });
  return {
    type: "success",
    statusCode: 200,
    result: foodVerDoc,
  };
};
