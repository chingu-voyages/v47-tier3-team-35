import { determineSpaceProps } from "@/actions/space/search/determineRoomProps";
import { FoodItemZodTypeAllOptional } from "@/zodTypes/FoodItemSchema";
import { Food } from "@prisma/client";

export const extractGeneralFoodProps = async (
  userId: string,
  newData: FoodItemZodTypeAllOptional
) => {
  let roomProps: Pick<Partial<Food>, "roomId" | "roomTitle"> = {};
  if (!newData.id && newData.roomId)
    roomProps = await determineSpaceProps({ spaceId: newData.roomId, userId });
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
