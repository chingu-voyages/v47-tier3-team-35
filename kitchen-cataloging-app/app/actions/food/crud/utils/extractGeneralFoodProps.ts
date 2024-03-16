import { FoodItemZodTypeAllOptional } from "@/zodTypes/FoodItemSchema";
import prisma from "@/prisma/client";
import { Food } from "@prisma/client";
export const determineRoomProps = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  //find room name
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      userId,
    },
  });
  return {
    roomId: room?.id,
    roomTitle: room?.title,
  };
};
export const extractGeneralFoodProps = async (
  userId: string,
  newData: FoodItemZodTypeAllOptional
) => {
  let roomProps: Pick<Partial<Food>, "roomId" | "roomTitle"> = {};
  if (!newData.id && newData.roomId)
    roomProps = await determineRoomProps({ roomId: newData.roomId, userId });
  const currDate = new Date();
  const newDoc = {
    userId,
    updatedAt: currDate,
    title: newData.title,
    description: newData.description,
    threshold: newData.threshold,
    price: newData.price,
    amount: newData.amount, 
    ...roomProps,
  };
  return newDoc;
};
export default extractGeneralFoodProps;
