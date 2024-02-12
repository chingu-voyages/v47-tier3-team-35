"use server";
import { auth } from "@clerk/nextjs";
import { searchFoods } from "./search/searchFoods";
import { paginateFoods } from "./search/paginateFoods";
import { SearchFoodProps } from "./types/types";
export const searchFoodItems = async (props: SearchFoodProps) => {
  const { userId } = auth();
  if (!props.text) return (await paginateFoods({ ...props, userId })) || null;

  return await searchFoods({ ...props, userId });
};
