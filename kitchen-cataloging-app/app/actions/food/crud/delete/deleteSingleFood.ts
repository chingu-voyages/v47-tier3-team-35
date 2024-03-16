import prisma from "@/prisma/client";
import generateErrMessage from "@/utils/generateErrMessage";
export const deleteSingleFood = async ({
  userId,
  foodId,
}: {
  userId?: string | null;
  foodId: string;
}) => {
  if (!userId)
    return generateErrMessage({
      statusCode: 400,
      message: "Unauthorized",
    });
  const deleteFood = await prisma.food.delete({
    where: {
      id: foodId,
      userId,
    },
  });
  return {
    type: "success",
    statusCode: 200,
    result: deleteFood,
  };
};
