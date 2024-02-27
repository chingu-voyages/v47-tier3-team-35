import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export const createFoodLog = async ({
  foodId,
    userId,
    amount,
  price
}: {
  foodId: string;
        userId?: string | null;
        amount: number;
        price: number;
    }) => {
    // Get user id
  const user = await getUserInfoServer({ userId });
    if (!user?.id) return null;
    // Need to Validate
    const newLog = await prisma.log.create({
        data: {
            foodId: foodId,
            userId: user.id,
            price: price,
            amount: amount
        },
    })
  return newLog
};
