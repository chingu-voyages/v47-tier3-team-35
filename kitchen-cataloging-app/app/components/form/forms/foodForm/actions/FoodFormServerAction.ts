"use server";
import { auth } from "@clerk/nextjs";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import {
  FoodItemVersionZodTypeAllOptional,
  FoodItemZodTypeAllOptional,
} from "@/zodTypes/FoodItemSchema";
import { uploadFoodItemData } from "./UploadFoodItemData";
import { FoodItemSuccessResult } from "@/actions/food/types/types";
export const uploadFoodItemForm = async ({
  newFoodData,
  newFoodItemVer,
}: {
  newFoodData: FoodItemZodTypeAllOptional;
  newFoodItemVer?: FoodItemVersionZodTypeAllOptional;
}): Promise<FoodItemSuccessResult | ErrorMessage> => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Operation Forbidden",
    });
  return await uploadFoodItemData({
    newFoodData,
    newFoodItemVer,
    userId: user.id,
  });
};
