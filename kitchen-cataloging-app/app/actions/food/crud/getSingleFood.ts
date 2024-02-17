import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export const getSingleFood = async ({
  foodId,
  userId,
}: {
  foodId: string;
  userId?: string | null;
}) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const food = await prisma.food.findFirst({
    where: {
      userId: user.id,
      id: foodId,
    },
    include: {
      logs: true,
    },
  });
  const spaces = await prisma.room.findMany({
    select: {
      title: true,
    }
  })
  return {
    foodData: food,
    spaces: spaces,
  };
};
