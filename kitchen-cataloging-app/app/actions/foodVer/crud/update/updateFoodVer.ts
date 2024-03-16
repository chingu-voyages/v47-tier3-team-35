import prisma from "@/prisma/client";
import { FoodItemVersionZodType, FoodItemVersionZodTypeAllOptional } from "@/zodTypes/FoodItemSchema";
import { Prisma } from "@prisma/client";
import extractGeneralFoodVerProps from "../utils/extractGeneralFoodItemVer";
export const updateFoodItemVer = async (
  userId: string,
  id: string,
  newData: FoodItemVersionZodTypeAllOptional
) => {
  const generalProps = await extractGeneralFoodVerProps(userId, newData);
  const newDoc: Prisma.FoodItemVersionUpdateInput = {
    ...generalProps,
  };
  const result = await prisma.foodItemVersion.update({
    where: {
      id: id,
      userId: userId,
    },
    data: newDoc,
  });
  return result;
};
export default updateFoodItemVer;
