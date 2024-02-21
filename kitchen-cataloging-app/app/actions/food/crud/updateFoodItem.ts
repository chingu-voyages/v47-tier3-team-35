import prisma from "@/prisma/client";
import {
    FoodItemZodSchema,
    FoodItemZodType
} from "@/zodTypes/FoodItemSchema";
import generateErrMessage from "@/utils/generateErrMessage";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export default async function updateSingleFoodItem(
  userId: string,
  foodId: string,
  newDoc: Partial<FoodItemZodType>) {
  //ensure user access
  if (!userId)
    return generateErrMessage({ statusCode: 401, message: "Unauthorized" });
  if (!foodId)
    return generateErrMessage({ statusCode: 404, message: "Item not found" });
  //validate schema
  const validationResult = FoodItemZodSchema.safeParse(newDoc);
  if (!validationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${validationResult.error.toString()}`,
    });
  const user = await getUserInfoServer({ userId });
  if (!user?.id)
      return generateErrMessage({ statusCode: 401, message: "Unauthorized" });
    const roomId = user.rooms.find((room) => room.title === newDoc.roomTitle)?.id;
  const result = await prisma.food.update({
    where: {
      id: foodId,
      userId: user.id,
    },
    data: {
    ...validationResult.data,
    roomId,
      userId: user.id,
    },
  });
  return result;
}