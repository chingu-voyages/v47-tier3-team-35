import generateErrMessage from "@/utils/generateErrMessage";
import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { RoomSchema } from "@/zodTypes/RoomSchema";
const editSingleRoom = async ({
  userId,
  roomId,
  roomName,
}: {
  userId: string | undefined | null;
  roomId: string | undefined;
  roomName: string | undefined;
}) => {
  if (!userId)
    return generateErrMessage({
      statusCode: 403,
      message: "Unauthorized access",
    });
  // Validate room name (between 3-30 characters)
  const validation = RoomSchema.safeParse(roomName);
  if (!validation.success)
    return generateErrMessage({
      statusCode: 400,
      message: validation.error.issues.join().toString(),
    });
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Unauthorized Access. Please login",
    });
  // Update room name if all checks/validation passed
  try {
    const editedRoomPromise = prisma.room.update({
      where: {
        userId: user?.id,
        id: roomId as string,
      },
      data: {
        title: roomName as string,
      },
    });

    // Update all foods in this room to match new room title
    const editedFoodsPromise = prisma.food.updateMany({
      where: {
        userId: user?.id,
        roomId: roomId as string,
      },
      data: {
        roomTitle: roomName as string,
      },
    });
    const editedGroceriesPromise = prisma.groceryItem.updateMany({
      where: {
        userId: user?.id,
        roomId: roomId as string,
      },
      data: {
        roomTitle: roomName as string,
      },
    });
    const [editedRoom, foods, groceries] = await Promise.all([
      editedRoomPromise,
      editedFoodsPromise,
      editedGroceriesPromise,
    ]);
    return editedRoom;
  } catch (error) {
    console.error("Error updating room:", error);
    return generateErrMessage({
      statusCode: 500,
      message: "Something went wrong. Please try again",
    });
  }
};
export default editSingleRoom;
