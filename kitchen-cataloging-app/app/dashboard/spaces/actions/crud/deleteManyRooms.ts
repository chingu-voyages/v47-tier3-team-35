import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import prisma from "@/prisma/client";
import generateErrMessage from "@/utils/generateErrMessage";
import { StringArraySchema } from "@/zodTypes/StringArrSchema";
const deleteManyRooms = async ({
  userId,
  ids,
}: {
  ids: string[];
  userId?: string | null;
}) => {
  if (!userId)
    return generateErrMessage({
      statusCode: 403,
      message: "Unauthorized Access. Please login",
    });
  const validationResult = StringArraySchema.safeParse(ids);
  if (!validationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid id array: ${validationResult.error.toString()}`,
    });
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Unauthorized Access. Please login",
    });
  try {
    // Make sure no food exists in this room before deleting. Use room title to access food
    const foodinRoom = await prisma.food.findMany({
      where: {
        userId: user?.id,
        roomId: {
          in: ids,
        },
      },
    });
    if (foodinRoom.length > 0)
      return generateErrMessage({
        statusCode: 400,
        message: "Cannot delete room with foods in it",
      });

    // Need to use id to delete becuase it is unique
    const deletedRoom = await prisma.room.deleteMany({
      where: {
        userId: user?.id,
        id: {
          in: ids,
        },
      },
    });
    return deletedRoom;
  } catch (error) {
    console.error("Error deleting room:", error);
    return generateErrMessage({
      statusCode: 403,
      message: "Something went wrong. Please try again",
    });
  }
};
export default deleteManyRooms;
