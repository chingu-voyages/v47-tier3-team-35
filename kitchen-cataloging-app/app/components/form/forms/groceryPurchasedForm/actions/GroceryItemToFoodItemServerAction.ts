"use server";
import generateErrMessage from "@/utils/generateErrMessage";
import { auth } from "@clerk/nextjs";
import {
  GroceryItemZodSchema,
  GroceryItemZodType,
} from "@/zodTypes/GroceryItemSchema";
import { uploadFoodItemData } from "../../foodForm/actions/UploadFoodItemData";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
const transformGroceryToFoodItem = async ({
  expirationDate,
  totalPrice,
  groceryItemData,
}: {
  expirationDate?: Date;
  totalPrice: number;
  groceryItemData: GroceryItemZodType;
}) => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Operation Forbidden",
    });
  const groceryItemDataValidation =
    GroceryItemZodSchema.safeParse(groceryItemData);
  if (!groceryItemDataValidation.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${groceryItemDataValidation.error.toString()}`,
    });
  if (typeof totalPrice !== "number")
    return generateErrMessage({
      statusCode: 400,
      message: `totalPrice must be a number`,
    });
  const integerQuantity = Math.round(groceryItemData.amount);
  const normalizedQuantity = integerQuantity <= 0 ? 1 : integerQuantity;
  const normalizedTotalPrice = totalPrice <= 0 ? 0.0 : totalPrice;
  const normalizedPricePerItem = normalizedTotalPrice / normalizedQuantity;
  const normalizedExpirationDate = expirationDate || new Date();
  return await uploadFoodItemData({
    userId: user.id,
    newFoodData: {
      ...groceryItemData,
      amount: normalizedQuantity,
    },
    newFoodItemVer: {
      expirationDate: normalizedExpirationDate,
      price: normalizedPricePerItem,
      quantity: normalizedQuantity,
    },
  });
};
export default transformGroceryToFoodItem;
