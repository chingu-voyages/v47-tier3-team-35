"use server";
import { PaginationProps } from "@/components/pagination/types";
import { auth } from "@clerk/nextjs";
import paginateGroceries from "./search/paginateGroceries";
import getGroceryItem from "./crud/read/getGroceryItem";
import { GroceryItem } from "@prisma/client";
import addSingleGroceryItem from "./crud/create/addSingleGroceryItem";
import updateSingleGroceryItem from "./crud/update/updateSingleGroceryItem";
import deleteManyGroceryItems from "./crud/delete/deleteManyGroceryItems";
import searchGroceries from "./search/searchGroceries";
import { GroceryItemAsyncFuncDataProps } from "./types/types";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage from "@/utils/generateErrMessage";
import {
  GroceryItemZodType,
  GroceryItemZodTypeAllOptional,
} from "@/zodTypes/GroceryItemSchema";
export const searchGroceryItems = async (
  props: GroceryItemAsyncFuncDataProps
) => {
  const { userId } = auth();
  const { text, take } = props;
  if (!text) return (await paginateGroceries({ take, userId })) || null;
  return await searchGroceries({
    userId,
    ...props,
  });
};
export const paginateGroceryItems = async (
  props: PaginationProps
): Promise<GroceryItem[] | null> => {
  try {
    const { userId } = auth();
    return (await paginateGroceries({ ...props, userId })) || null;
  } catch (err) {
    console.error("Error paginating rooms:", err);
    return null;
  }
};
export const getSingleGroceryItem = async ({ id }: { id: string }) => {
  const { userId } = auth();
  return await getGroceryItem({ userId, id });
};
export const addGroceryItem = async ({
  groceryItemData,
}: {
  groceryItemData: GroceryItemZodType;
}) => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user?.id)
    return generateErrMessage({ statusCode: 401, message: "Unauthorized" });
  return await addSingleGroceryItem({
    userId: user.id,
    newDoc: groceryItemData,
  });
};
export const updateGroceryItem = async ({
  id,
  groceryItemData,
}: {
  id: string;
  groceryItemData: GroceryItemZodTypeAllOptional;
}) => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user?.id)
    return generateErrMessage({ statusCode: 401, message: "Unauthorized" });
  return await updateSingleGroceryItem({
    userId: user.id,
    id,
    newData: groceryItemData,
  });
};
export const deleteGroceryItems = async (ids: string[]) => {
  const { userId } = auth();
  return await deleteManyGroceryItems({ userId, ids });
};
