import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import {
  UpdateFoodAmountProps,
  UpdateFoodVerQuantityProps,
} from "../../types/types";
import { FoodVerUpdateResult } from "@/components/form/types/types";
export const updateFoodVerDocQuantity = async ({
  userId,
  foodVerId,
  count,
  newAmount,
  avgPrice,
}: Omit<UpdateFoodVerQuantityProps, "count"> &
  UpdateFoodAmountProps & { count: number }): Promise<FoodVerUpdateResult> => {
  const value = Math.abs(count);
  const action: Prisma.FoodItemVersionUpdateInput["quantity"] = {
    [count < 0 ? "decrement" : "increment"]: value,
  };
  const updateResult = await prisma.foodItemVersion.update({
    where: {
      id: foodVerId,
      userId,
    },
    data: {
      quantity: action,
      food: {
        update: {
          amount: newAmount,
          price: avgPrice,
        },
      },
    },
  });
  return {
    type: "success",
    statusCode: 200,
    result: updateResult,
  };
};
