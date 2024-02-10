import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import prisma from "@/prisma/client";
import generateErrMessage from "@/utils/generateErrMessage";
import { StringArraySchema } from "@/zodTypes/StringArrSchema";
const deleteManyGroceryItems = async ({
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
    console.error("Error deleting grocery items:", error);
    return generateErrMessage({
      statusCode: 403,
      message: "Something went wrong. Please try again",
    });
  }
};
export default deleteManyGroceryItems;
