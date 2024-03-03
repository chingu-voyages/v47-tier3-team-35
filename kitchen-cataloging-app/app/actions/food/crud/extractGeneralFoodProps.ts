import { FoodItemZodType } from "@/zodTypes/FoodItemSchema";
import prisma from "@/prisma/client";
export const extractGeneralFoodProps = async (
  userId: string,
  newData: FoodItemZodType
) => {
  const currDate = new Date();
  //find room name
  const room = await prisma.room.findFirst({
    where: {
      id: newData.roomId,
      userId,
    },
  });
  const newDoc = {
    userId,
    roomdId: newData.roomId,
    updatedAt: currDate,
    title: newData.title,
    createdAt: newData.createdAt ? new Date(newData.createdAt) : currDate,
    description: newData.description || "",
    threshold: parseInt(newData.threshold.toString()),
    roomId: room?.id,
    roomTitle: room?.title,
  };
  return newDoc;
};
export default extractGeneralFoodProps;
