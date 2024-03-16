import prisma from "@/prisma/client";
import { FoodItemZodTypeAllOptional } from "@/zodTypes/FoodItemSchema";
import { Prisma } from "@prisma/client";
import extractGeneralFoodProps from "../utils/extractGeneralFoodProps";
export const updateSingleFoodItem = async (
  userId: string,
  id: string,
  newData: FoodItemZodTypeAllOptional
) => {
  const generalProps = await extractGeneralFoodProps(userId, newData);
  const newDoc: Prisma.FoodUpdateInput = {
    ...generalProps,
    labels: newData.labels || [],
    image: newData.image || null,
  };
  const result = await prisma.food.update({
    where: {
      id: id,
      userId: userId,
    },
    data: newDoc,
  });
  return result;
};
export default updateSingleFoodItem;