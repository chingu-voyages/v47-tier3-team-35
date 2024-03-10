import prisma from "@/prisma/client";
import { FoodItemVersionZodType } from "@/zodTypes/FoodItemSchema";
import extractGeneralFoodItemVerProps from "./extractGeneralFoodItemVer";
import { Prisma } from "@prisma/client";
export const addSingleFoodVerItem = async (
  userId: string,
  newData: FoodItemVersionZodType
) => {
  const generalProps = await extractGeneralFoodItemVerProps(userId, newData);
  const newDoc: Prisma.FoodItemVersionCreateInput = {
    ...generalProps,
  };
  //create food item ver doc
  return await prisma.foodItemVersion.create({
    data: newDoc,
  });
};
export default addSingleFoodVerItem;
