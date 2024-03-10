import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

// Gets all logs for a single food item
// This query only returns logs
// getSingleFood populates logs, so use that Query if all food data is needed including the logs for that food

export const getFoodLogs = async ({
    foodId,
    userId,
}: {
  foodId: string;
        userId?: string | null;
    }) => {
    // Get user id
  const user = await getUserInfoServer({ userId });
    if (!user?.id) return null;
    // Need to Validate
    const newLog = await prisma.log.findMany({
        where: {
            foodId: foodId,
            userId: user.id,
        },
        orderBy: {
            id: "desc",
        },
    })
  return newLog
};

