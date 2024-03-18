import prisma from "@/prisma/client";
import {
  GroceryItemZodSchema,
  GroceryItemZodTypeAllOptional,
} from "@/zodTypes/GroceryItemSchema";
import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import { determineSpaceProps } from "@/actions/space/search/determineRoomProps";
import { GroceryItemCreateResult } from "../../types/types";
export default async function addSingleGroceryItem({
  userId,
  newDoc,
}: {
  newDoc: GroceryItemZodTypeAllOptional;
  userId: string;
}): Promise<ErrorMessage | GroceryItemCreateResult> {
  //validate schema
  const validationResult = GroceryItemZodSchema.safeParse(newDoc);
  if (!validationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${validationResult.error.toString()}`,
    });

  //fetch room title
  const roomProps = await determineSpaceProps({
    spaceId: validationResult.data.roomId,
    userId,
  });
  if (!roomProps.roomId || !roomProps.roomTitle)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid roomId: ${validationResult.data.roomId}`,
    });
  const result = await prisma.groceryItem.create({
    data: {
      ...validationResult.data,
      roomTitle: roomProps.roomTitle,
      roomId: roomProps.roomId,
      userId,
    },
  });
  return {
    type: "success",
    statusCode: 200,
    result,
  };
}
