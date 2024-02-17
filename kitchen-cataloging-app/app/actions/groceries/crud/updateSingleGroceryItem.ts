import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import generateErrMessage from "@/utils/generateErrMessage";
import prisma from "@/prisma/client";
import {
  GroceryItemZodTypeAllOptional,
  GroceryItemZodSchemaAllOptional,
} from "@/zodTypes/GroceryItemSchema";
import { Prisma } from "@prisma/client";
import transformToExplictUpdateQuery from "@/utils/transformToExplicitUpdateQuery";
const updateSingleGroceryItem = async ({
  id,
  newData,
  userId,
}: {
  id: string;
  newData: GroceryItemZodTypeAllOptional;
  userId?: string | null;
}) => {
  if (!id)
    return generateErrMessage({
      statusCode: 400,
      message: "Missing document id",
    });
  if (!userId)
    return generateErrMessage({
      statusCode: 401,
      message: "Unauthorized",
    });
  const validationResult = GroceryItemZodSchemaAllOptional.safeParse(newData);
  if (!validationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${validationResult.error.toString()}`,
    });
  const user = await getUserInfoServer({ userId });
  if (!user?.id)
    return generateErrMessage({ statusCode: 401, message: "Unauthorized" });
  const updateQuery = transformToExplictUpdateQuery<
    GroceryItemZodTypeAllOptional,
    Prisma.GroceryItemUpdateInput
  >(validationResult.data);
  const result = await prisma.groceryItem.update({
    where: {
      id,
      userId: user.id,
    },
    data: updateQuery,
  });
  return result;
};
export default updateSingleGroceryItem;
