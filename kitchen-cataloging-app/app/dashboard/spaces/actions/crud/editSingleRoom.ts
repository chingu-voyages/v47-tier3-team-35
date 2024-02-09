import generateErrMessage from "@/utils/generateErrMessage";
import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
const editSingleRoom = async ({
  userId,
  roomId,
  roomName,
}: {
  userId: string | undefined;
  roomId: string | undefined;
  roomName: string | undefined;
}) => {
  if (!userId)
    return generateErrMessage({
      statusCode: 403,
      message: "Unauthorized access",
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
    const [editedRoom, _] = await Promise.all([
      editedRoomPromise,
      editedFoodsPromise,
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
