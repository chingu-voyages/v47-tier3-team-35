import prisma from "@/prisma/client";
import { FoodItemZodType } from "@/zodTypes/FoodItemSchema";
import { Prisma } from "@prisma/client";
import extractGeneralFoodProps from "./extractGeneralFoodProps";

export const updateSingleFoodItem = async (
  userId: string,
  id: string,
  newData: FoodItemZodType
) => {
  const generalProps = await extractGeneralFoodProps(userId, newData);
  const newDoc: Prisma.FoodUpdateInput = {
    ...generalProps,
    labels: newData.labels || [],
    image: newData.image || null,
  };
  prisma.food.update({
    where: {
      id: id,
      userId: userId,
    },
    data: newDoc,
  });
};
export default updateSingleFoodItem