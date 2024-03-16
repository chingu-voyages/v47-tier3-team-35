import prisma from "@/prisma/client";
import {
  UpdateFoodAmountProps,
  UpdateFoodVerQuantityProps,
} from "../../types/types";
import { FoodVerUpdateResult } from "@/components/form/types/types";
import { ErrorMessage } from "@/utils/generateErrMessage";

export const deleteFoodVerDocQuantity = async ({
  userId,
  foodVerId,
  newAmount,
  avgPrice,
  foodId,
}: Omit<UpdateFoodVerQuantityProps, "count"> &
  UpdateFoodAmountProps & {
    foodId: string;
  }): Promise<FoodVerUpdateResult | ErrorMessage> => {
  const deleteResultPromise = prisma.foodItemVersion.delete({
    where: {
      id: foodVerId,
      userId,
    },
  });
  const foodResultPromise = prisma.food.update({
    where: {
      id: foodId,
      userId,
    },
    data: {
      amount: newAmount,
      price: avgPrice,
    },
  });
  const [deleteResult, foodResult] = await Promise.all([
    deleteResultPromise,
    foodResultPromise,
  ]);
  return {
    type: "success",
    statusCode: 200,
    result: deleteResult,
  };
};
