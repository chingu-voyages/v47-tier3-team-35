import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import prisma from "@/prisma/client";
import generateErrMessage from "@/utils/generateErrMessage";
export const addSingleRoom = async ({
  userId,
  roomName,
}: {
  userId: string | null;
  roomName: string | undefined;
}) => {
  // Make sure room name is unique for this user
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
  try {
    const result = await prisma.room.create({
      data: {
        title: roomName as string,
        userId: user.id,
      },
    });
    return result;
  } catch (error) {
    return generateErrMessage({
      statusCode: 500,
      message: "Something went wrong. Please try again",
    });
  }
};
// // Make sure room name is unique for this user
// const existingRoomName = await prisma.room.findFirst({
//   where: {
//     title: roomName as string,
//   },
// });
// if (existingRoomName) {
//   console.error("Error: Room name already exists");
//   return null;
// }
// Add new room if all checks/validation passed
