import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import prisma from "@/prisma/client";
import generateErrMessage from "@/utils/generateErrMessage";
import { RoomSchema } from "@/zodTypes/RoomSchema";
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
  const validation = RoomSchema.safeParse(roomName);
  // Validate room name (between 3-30 characters)
  if (!validation.success) {
    console.error(validation.error.issues);
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid obj: ${validation.error.flatten()}`
    });
  }
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
