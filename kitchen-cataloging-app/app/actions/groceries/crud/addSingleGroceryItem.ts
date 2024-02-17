import prisma from "@/prisma/client";
import {
  GroceryItemZodType,
  GroceryItemZodSchema,
} from "@/zodTypes/GroceryItemSchema";
import generateErrMessage from "@/utils/generateErrMessage";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export default async function addSingleGroceryItem({
  userId,
  newDoc,
}: {
  newDoc: Partial<GroceryItemZodType>;
  userId?: string | null;
}) {
  //ensure user access
  if (!userId)
    return generateErrMessage({ statusCode: 401, message: "Unauthorized" });
  //validate schema
  const validationResult = GroceryItemZodSchema.safeParse(newDoc);
  if (!validationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${validationResult.error.toString()}`,
    });
  const user = await getUserInfoServer({ userId });
  if (!user?.id)
    return generateErrMessage({ statusCode: 401, message: "Unauthorized" });
  const result = await prisma.groceryItem.create({
    data: {
      ...validationResult.data,
      userId: user.id,
    },
  });
  return result;
}
