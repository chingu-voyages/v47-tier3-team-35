import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export const incrementFood = async ({
    foodId,
    newValue,
    userId,
}: {
        foodId: string;
        newValue: number;
        userId?: string | null;
}) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const updatedFood = await prisma.food.update({
    where: {
      userId: user.id,
      id: foodId,
      },
      data: {
          amount: newValue,
      }
  });
  return {
    foodData: updatedFood,
  };
};
