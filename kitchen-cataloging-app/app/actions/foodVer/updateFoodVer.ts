import prisma from "@/prisma/client";
import { FoodItemVersionZodType } from "@/zodTypes/FoodItemSchema";
import { Prisma } from "@prisma/client";
import extractGeneralFoodVerProps from "./extractGeneralFoodItemVer";
export const updateFoodItemVer = async (
  userId: string,
  id: string,
  newData: FoodItemVersionZodType
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
