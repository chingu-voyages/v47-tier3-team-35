import prisma from "@/prisma/client";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";

export const getAllRoomNames = async ({
  userId,
}: {
  userId?: string | null;
}) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const spaces = await prisma.room.findMany({
    where: {
      userId: user.id,
    },
    select: {
      title: true,
    }
  })
  return spaces
};
