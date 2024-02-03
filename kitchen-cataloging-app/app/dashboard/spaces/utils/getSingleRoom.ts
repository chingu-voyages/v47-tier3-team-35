import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export const getRoom = async ({
  id,
  userId,
}: {
  id: string;
  userId?: string | null;
}) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const doc = await prisma.room.findFirst({
    where: {
      userId: user.id,
      id: id,
    },
    include: {
      foods: true,
    },
  });
  return doc;
};
