import prisma from "@/prisma/client";
import { FoodItemZodType } from "@/zodTypes/FoodItemSchema";
import extractGeneralFoodProps from "./extractGeneralFoodProps";
import { Prisma } from "@prisma/client";
export const addSingleFoodItem = async (
  userId: string,
  newData: FoodItemZodType
) => {
  const generalProps = await extractGeneralFoodProps(userId, newData);
  const newDoc: Prisma.FoodCreateInput = {
    ...generalProps,
    labels: newData.labels || [],
    image: newData.image || null,
    roomTitle: generalProps.roomTitle || "",
  };
  //create food doc
  return await prisma.food.create({
    data: newDoc,
  });
};
export default addSingleFoodItem;
