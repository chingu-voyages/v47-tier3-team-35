import prisma from "@/prisma/client";
import { FoodItemVersionZodType } from "@/zodTypes/FoodItemSchema";
import extractGeneralFoodItemVerProps from "../utils/extractGeneralFoodItemVer";
import { Prisma } from "@prisma/client";
export const addSingleFoodVerItem = async (
  userId: string,
  newData: FoodItemVersionZodType
) => {
  const generalProps = await extractGeneralFoodItemVerProps(userId, newData);
  const newDoc: Prisma.FoodItemVersionCreateInput = {
    ...generalProps,
    quantity: generalProps.quantity || 0,
    expirationDate: generalProps.expirationDate || new Date().toString(),
    price: generalProps.price || 0,
  };
  //create food item ver doc
  return await prisma.foodItemVersion.create({
    data: newDoc,
  });
};
export default addSingleFoodVerItem;
