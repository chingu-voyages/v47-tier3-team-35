import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { Food } from "@prisma/client";

export const getSingleFood = async ({
  foodId,
  userId,
}: {
  foodId: string;
  userId?: string | null;
}) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const foodPromise = prisma.food.findFirst({
    where: {
      userId: user.id,
      id: foodId,
    },
    include: {
      logs: true,
    },
  });
  const mostRecentFoodVerPromise = prisma.foodItemVersion.findFirst({
    where: {
      userId: user.id,
      foodId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const [food, mostRecentFoodVer] = await Promise.all([
    foodPromise,
    mostRecentFoodVerPromise,
  ]);
  const castFood = food as Food;
  return { ...castFood, recentFoodItemVer: mostRecentFoodVer, id: castFood.id };
};
