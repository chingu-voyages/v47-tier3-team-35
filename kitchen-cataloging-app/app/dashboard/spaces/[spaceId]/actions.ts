"use server";
import { Food } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { SearchFoodProps, searchFoods } from "./utils/searchFoods";
import { PaginationProps, paginateFoods } from "./utils/paginateFoods";
import { replaceImgKeyWithSignedUrls } from "@/aws/presignUrls/utils/replaceImgKeyWithSignedUrl";
export const searchFoodItems = async (props: SearchFoodProps) => {
  const { userId } = auth();
  return await searchFoods({ ...props, userId });
};
export const paginateFoodItems = async (
  props: PaginationProps
): Promise<Food[] | null> => {
  try {
    //ensure user only grabs rooms belonging to them
    const { userId } = auth();
    const items = await paginateFoods({ ...props, userId });

    return items
  } catch (error: any) {
    console.error("Error paginating rooms:", error);
    return null;
  }
};
