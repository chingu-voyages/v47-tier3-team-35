"use server";
import addSingleGroceryItem from "@/actions/groceries/crud/create/addSingleGroceryItem";
import updateSingleGroceryItem from "@/actions/groceries/crud/update/updateSingleGroceryItem";
import {
  GroceryItemCreateResult,
  GroceryItemUpdateResult,
} from "@/actions/groceries/types/types";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import { GroceryItemZodTypeAllOptional } from "@/zodTypes/GroceryItemSchema";
import { auth } from "@clerk/nextjs";
export const uploadGroceryItemForm = async ({
  newGroceryItemData,
}: {
  newGroceryItemData: GroceryItemZodTypeAllOptional;
}): Promise<
  GroceryItemCreateResult | GroceryItemUpdateResult | ErrorMessage
> => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Operation Forbidden",
    });
  const groceryItemDocResult = newGroceryItemData.id
    ? await updateSingleGroceryItem({
        id: newGroceryItemData.id,
        userId: user.id,
        newData: newGroceryItemData,
      })
    : await addSingleGroceryItem({
        userId: user.id,
        newDoc: newGroceryItemData,
      });
  if (groceryItemDocResult.type === "error") return groceryItemDocResult;
  const groceryItemDoc = groceryItemDocResult.result;
  return {
    type: "success",
    statusCode: 200,
    result: groceryItemDoc,
  };
};
