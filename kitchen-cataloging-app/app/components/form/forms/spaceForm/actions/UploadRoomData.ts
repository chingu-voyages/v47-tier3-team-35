"use server";
import { addSingleRoom } from "@/actions/space/crud/addSingleRoom";
import editSingleRoom from "@/actions/space/crud/editSingleRoom";
import { SpaceSuccessResult } from "@/actions/space/types/types";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage, {
  ErrorMessage,
  isErrorMessage,
} from "@/utils/generateErrMessage";
import { RoomSchema } from "@/zodTypes/RoomSchema";
import { auth } from "@clerk/nextjs";
import { Room } from "@prisma/client";
export const uploadRoomData = async ({
  roomData,
}: {
  roomData: Partial<Room>;
}): Promise<ErrorMessage | SpaceSuccessResult> => {
  const validation = RoomSchema.safeParse(roomData.title);
  // Validate room name (between 3-30 characters)
  if (!validation.success) {
    console.error(validation.error.issues);
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid obj: ${validation.error.flatten()}`,
    });
  }
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  if (!user)
    return generateErrMessage({
      statusCode: 403,
      message: "Unauthorized Access. Please login",
    });
  let result: Room | ErrorMessage;
  if (roomData.id)
    result = await editSingleRoom({
      userId: user.id,
      roomId: roomData.id,
      roomName: roomData.title as string,
    });
  else
    result = await addSingleRoom({
      userId: user.id,
      roomName: roomData.title,
    });
  if (isErrorMessage(result)) return result;
  else
    return {
      type: "success",
      statusCode: 200,
      result,
    };
};
