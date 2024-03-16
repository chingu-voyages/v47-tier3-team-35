import { Food, FoodItemVersion } from "@prisma/client";
import updateSingleFoodItem from "../../../food/crud/update/updateFoodItem";
import prisma from "@/prisma/client";
export const findFoodDocWithPriceAndQuantity = async ({
  userId,
  foodId,
}: {
  userId: string;
  foodId: string;
}) => {
  const foodDoc = await prisma.food.findFirst({
    where: {
      userId: userId,
      id: foodId,
    },
    select: {
      id: true,
      price: true,
      amount: true,
    },
  });
  return foodDoc;
};
export const calculateNewPriceAndQuantity = async ({
  userId,
  foodDoc,
  foodVerDoc,
}: {
  userId: string;
  foodDoc: Pick<Food, "amount" | "price" | "id">;
  foodVerDoc: FoodItemVersion;
}) => {
  if (typeof foodDoc.amount === "number" && typeof foodDoc.price === "number") {
    const newQuantity = foodDoc.amount + foodVerDoc.quantity;
    //quantity must be positive. If not, average price is zero
    const newAvgPrice = newQuantity
      ? (foodDoc.price * foodDoc.amount +
          foodVerDoc.price * foodVerDoc.quantity) /
        newQuantity
      : 0;
    await updateSingleFoodItem(userId, foodDoc.id, {
      amount: newQuantity,
      price: newAvgPrice,
    });
  }
};
