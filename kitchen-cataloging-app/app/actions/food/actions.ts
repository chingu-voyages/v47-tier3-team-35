"use server";
import { auth } from "@clerk/nextjs";
import { searchFoods } from "./search/searchFoods";
import { paginateFoods } from "./search/paginateFoods";
import { SearchFoodProps } from "./types/types";
import { getSingleFood } from "./crud/read/getSingleFood";
import { createFoodLog } from "../foodLog/createFoodLog";
import extractSignedUrls from "../utils/extractSignedUrls";
import { deleteSingleFood } from "./crud/delete/deleteSingleFood";
import updateSingleFoodItem from "./crud/update/updateFoodItem";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { FoodItemZodTypeAllOptional } from "@/zodTypes/FoodItemSchema";
import generateErrMessage from "@/utils/generateErrMessage";

export const searchFoodItems = async (props: SearchFoodProps) => {
  const { userId } = auth();
  if (!props.text) return (await paginateFoods({ ...props, userId })) || null;
  return await searchFoods({ ...props, userId });
};
// GET FOOD -----------
export const getFood = async ({ foodId }: { foodId: string }) => {
  const { userId } = auth();
  const result = await getSingleFood({ foodId, userId });
  const extracted = result ? await extractSignedUrls([result]) : null;
  return extracted ? extracted[0] : null;
};
export const deleteFood = async ({ foodId }: { foodId: string }) => {
  const { userId } = auth();

  return await deleteSingleFood({ foodId, userId });
};
export const updateFood = async ({
  foodId,
  newData,
}: {
  foodId: string;
  newData: FoodItemZodTypeAllOptional;
}) => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user?.id)
    return generateErrMessage({
      statusCode: 200,
      message: "Unauthorized",
    });
  return await updateSingleFoodItem(user.id, foodId, newData);
};

export const createFoodLogAction = async (
  foodId: string,
  amount: number,
  price: number
) => {
  const { userId } = auth();
  return await createFoodLog({ foodId, userId, amount, price });
};
