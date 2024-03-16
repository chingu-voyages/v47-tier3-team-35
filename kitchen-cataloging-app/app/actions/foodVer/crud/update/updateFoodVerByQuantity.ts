import prisma from "@/prisma/client";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import { UpdateFoodVerQuantityProps } from "../../types/types";
import { deleteFoodVerDocQuantity } from "../delete/deleteFoodItemVerQuantity";
import { updateFoodVerDocQuantity } from "./updateFoodVerDocQuantity";
import { FoodVerUpdateResult } from "@/components/form/types/types";
export const updateFoodVerByQuantity = async ({
  userId,
  foodVerId,
  count,
  newQuantity,
}: UpdateFoodVerQuantityProps): Promise<FoodVerUpdateResult | ErrorMessage> => {
  const foodVer = await prisma.foodItemVersion.findFirst({
    where: {
      id: foodVerId,
      userId,
    },
    select: {
      price: true,
      foodId: true,
      quantity: true,
    },
  });
  if (!foodVer?.foodId)
    return generateErrMessage({
      statusCode: 404,
      message: "Food item not found",
    });
  const foodItem = await prisma.food.findFirst({
    where: {
      id: foodVer.foodId,
      userId,
    },
    select: {
      amount: true,
      price: true,
    },
  });
  if (!foodItem)
    return generateErrMessage({
      statusCode: 404,
      message: "Food item not found",
    });
  const { quantity: currQuantity, price } = foodVer;
  const { amount, price: avgPrice } = foodItem;
  //determine proper count number
  if (typeof count === "number") count = count;
  else if (typeof newQuantity === "number") count = currQuantity - newQuantity;
  else count = 0;
  //ensure count is never more than existing amount, if negative
  const normalizedCount =
    count < 0 && Math.abs(count) > currQuantity ? -currQuantity : count;
  const parsedAvgPrice = avgPrice || 0.0;
  const parsedAmount = amount || 0;
  const newQuantityFoodVer = currQuantity + normalizedCount;
  const newAmount = parsedAmount + normalizedCount;
  const newAmountNormalized = newAmount < 0 ? 0 : newAmount;
  const newAvgPrice = calculateNewAveragePrice({
    avgPrice: parsedAvgPrice,
    totalCount: parsedAmount,
    //prevent calculations where change is greater than existing amount
    changeCount:
      normalizedCount > parsedAmount ? parsedAmount : normalizedCount,
    changePrice: price,
  });
  const generalProps = {
    userId,
    foodVerId,
    newAmount: newAmountNormalized,
    avgPrice: newAvgPrice,
  };
  if (normalizedCount < 0 && newQuantityFoodVer <= 0)
    return await deleteFoodVerDocQuantity({
      ...generalProps,
      foodId: foodVer.foodId,
    });
  //this occurs when update does not remove food ver item
  return await updateFoodVerDocQuantity({
    ...generalProps,
    count: normalizedCount,
  });
};
