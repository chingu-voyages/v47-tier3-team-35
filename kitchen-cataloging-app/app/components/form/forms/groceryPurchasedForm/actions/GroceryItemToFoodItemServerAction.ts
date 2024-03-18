"use server";
import generateErrMessage from "@/utils/generateErrMessage";
import { auth } from "@clerk/nextjs";
import { uploadFoodItemData } from "../../foodForm/actions/UploadFoodItemData";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import getGroceryItem from "@/actions/groceries/crud/read/getGroceryItem";
const transformGroceryToFoodItem = async ({
  expirationDate,
  totalPrice,
  quantity,
  groceryItemId,
}: {
  quantity?: number;
  expirationDate?: Date;
  totalPrice: number;
  groceryItemId: string;
}) => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Operation Forbidden",
    });
  if (!groceryItemId || typeof groceryItemId !== "string")
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid groceryItemId: ${groceryItemId}`,
    });
  const groceryItemData = await getGroceryItem({
    userId: user.id,
    id: groceryItemId,
  });
  if (!groceryItemData)
    return generateErrMessage({
      statusCode: 404,
      message: `Grocery item with id ${groceryItemId} not found`,
    });
  if (typeof totalPrice !== "number")
    return generateErrMessage({
      statusCode: 400,
      message: `totalPrice must be a number`,
    });
  const integerQuantity = Math.round(
    //use user defined quantity over stored db value if passed
    typeof quantity === "number" ? quantity : groceryItemData.amount
  );
  const normalizedQuantity = integerQuantity <= 0 ? 1 : integerQuantity;
  const normalizedTotalPrice = totalPrice <= 0 ? 0.0 : totalPrice;
  const normalizedPricePerItem = normalizedTotalPrice / normalizedQuantity;
  const normalizedExpirationDate = expirationDate || new Date();
  return await uploadFoodItemData({
    userId: user.id,
    newFoodData: {
      ...groceryItemData,
      description: groceryItemData.description || "",
      image: groceryItemData.image || undefined,
      roomId: groceryItemData.roomId || undefined,
      labels: groceryItemData.labels || [],
      price: normalizedPricePerItem,
      title: groceryItemData.title || undefined,
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
