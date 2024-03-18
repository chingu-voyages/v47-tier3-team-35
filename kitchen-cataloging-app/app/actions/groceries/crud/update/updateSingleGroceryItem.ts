import generateErrMessage, { ErrorMessage } from "@/utils/generateErrMessage";
import prisma from "@/prisma/client";
import {
  GroceryItemZodTypeAllOptional,
  GroceryItemZodSchemaAllOptional,
} from "@/zodTypes/GroceryItemSchema";
import { Prisma } from "@prisma/client";
import transformToExplictUpdateQuery from "@/utils/transformToExplicitUpdateQuery";
import { GroceryItemUpdateResult } from "../../types/types";
const updateSingleGroceryItem = async ({
  id,
  newData,
  userId,
}: {
  id: string;
  newData: GroceryItemZodTypeAllOptional;
  userId: string;
}): Promise<ErrorMessage | GroceryItemUpdateResult> => {
  if (!id)
    return generateErrMessage({
      statusCode: 400,
      message: "Missing document id",
    });
  const validationResult = GroceryItemZodSchemaAllOptional.safeParse(newData);
  if (!validationResult.success)
    return generateErrMessage({
      statusCode: 400,
      message: `Invalid object: ${validationResult.error.toString()}`,
    });
  const updateQuery = transformToExplictUpdateQuery<
    GroceryItemZodTypeAllOptional,
    Prisma.GroceryItemUpdateInput
  >(validationResult.data);
  const result = await prisma.groceryItem.update({
    where: {
      id,
      userId,
    },
    data: updateQuery,
  });
  return {
    type: "success",
    statusCode: 200,
    result,
  };
};
export default updateSingleGroceryItem;
