"use server";
import { auth } from "@clerk/nextjs";
import { searchFoods } from "./search/searchFoods";
import { paginateFoods } from "./search/paginateFoods";
import { SearchFoodProps } from "./types/types";
import { getSingleFood } from "./crud/getSingleFood";
import { incrementFood } from "./crud/incrementFood";
import { createFoodLog } from "../foodLog/createFoodLog";
import extractSignedUrls from "../utils/extractSignedUrls";

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
export const getIncrementFood = async (foodId: string, newValue: number) => {
  const { userId } = auth();
  return await incrementFood({ foodId, newValue, userId });
};
export const createFoodLogAction = async (
  foodId: string,
  amount: number,
  price: number
) => {
  const { userId } = auth();
  return await createFoodLog({ foodId, userId, amount, price });
};
