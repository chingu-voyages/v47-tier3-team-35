"use server";
import { PaginationProps } from "@/components/pagination/types";
import { auth } from "@clerk/nextjs";
import paginateGroceries from "./search/paginateGroceries";
import getGroceryItem from "./crud/getGroceryItem";
import { GroceryItem } from "@prisma/client";
import addSingleGroceryItem from "./crud/addSingleGroceryItem";
import updateSingleGroceryItem from "./crud/updateSingleGroceryItem";
import deleteManyGroceryItems from "./crud/deleteManyGroceryItems";
import searchGroceries from "./search/searchGroceries";
import { GroceryItemAsyncFuncDataProps } from "./types/types";
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
  formData,
  labels,
}: {
  formData: FormData;
  labels?: string[];
}) => {
  const { userId } = auth();
  //parse form data
  const newDoc = {
    title: formData.get("itemTitle")?.toString(),
    description: formData.get("itemDescription")?.toString(),
    amount: parseInt(formData.get("itemAmount")?.toString() || "0"),
    labels,
    image: {
      s3ObjKey: formData.get("itemImgS3ObjectImgUrl")?.toString(),
      url: formData.get("itemImgImgUrl")?.toString(),
    },
  };
  return await addSingleGroceryItem({ userId, newDoc });
};
export const updateGroceryItem = async ({
  id,
  formData,
  labels,
}: {
  id: string;
  formData: FormData;
  labels?: string[];
}) => {
  const { userId } = auth();
  const newData = {
    title: formData.get("itemTitle")?.toString(),
    description: formData.get("itemDescription")?.toString(),
    amount: parseInt(formData.get("itemAmount")?.toString() || "0"),
    labels,
    image: {
      s3ObjKey: formData.get("itemImgS3ObjectImgUrl")?.toString(),
      url: formData.get("itemImgImgUrl")?.toString(),
    },
  };
  return await updateSingleGroceryItem({ userId, id, newData });
};
export const deleteGroceryItems = async (ids: string[]) => {
  const { userId } = auth();
  return await deleteManyGroceryItems({ userId, ids });
};
