"use server";
import { PaginationProps } from "@/components/pagination/types";
import { auth } from "@clerk/nextjs";
import { GroceryItem } from "@prisma/client";
import paginateGroceries from "./search/paginateGroceries";
export const paginateGroceryItems = async (
  props: PaginationProps
): Promise<GroceryItem[] | null> => {
  try {
    const { userId } = auth();
    return await paginateGroceries({ ...props, userId });
  } catch (err) {
    console.error("Error paginating rooms:", err);
    return null;
  }
};
export const getSingleGroceryItem = () => {};
export const createGroceryItem = () => {};
export const updateGroceryItem = () => {};
export const deleteGroceryItem = () => {};
