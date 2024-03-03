"use server";
import addSingleFoodItem from "@/actions/food/crud/addFoodItem";
import updateSingleFoodItem from "@/actions/food/crud/updateFoodItem";
import { auth } from "@clerk/nextjs";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage from "@/utils/generateErrMessage";
import { FoodItemZodSchema, FoodItemZodType } from "@/zodTypes/FoodItemSchema";
export const uploadFoodItemData = async (newData: FoodItemZodType) => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Operation Forbidden",
    });
  //runtime check
  const validationResult = FoodItemZodSchema.safeParse(newData);
  if (!validationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${validationResult.error.toString()}`,
    });
  return validationResult.data.id
    ? await updateSingleFoodItem(
        user.id,
        validationResult.data.id,
        validationResult.data
      )
    : await addSingleFoodItem(user.id, validationResult.data);
};
